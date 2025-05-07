
package com.weddingvendor.service;

import com.weddingvendor.model.User;
import com.weddingvendor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserService {
    
    private static final Logger logger = Logger.getLogger(UserService.class.getName());
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByEmail(String email) {
        logger.info("Looking up user by email: " + email);
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> getUserByEmailAndRole(String email, String role) {
        logger.info("Looking up user by email: " + email + " and role: " + role);
        return userRepository.findByEmailAndRole(email, role);
    }
    
    public User createUser(User user) {
        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Set creation timestamp
        if (user.getCreatedAt() == null) {
            user.setCreatedAt(LocalDateTime.now());
        }
        
        logger.info("Creating new user: " + user.getEmail() + " with role: " + user.getRole());
        return userRepository.save(user);
    }
    
    public User updateUser(String id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(userDetails.getName());
            
            // Only update password if provided
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }
            
            // Don't allow role changes through this method
            
            logger.info("Updating user: " + existingUser.getEmail());
            return userRepository.save(existingUser);
        }
        
        return null;
    }
    
    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            logger.info("Deleted user with id: " + id);
            return true;
        }
        return false;
    }
    
    public boolean authenticateUser(String email, String password) {
        logger.info("Authenticating user: " + email);
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            boolean matches = passwordEncoder.matches(password, user.getPassword());
            logger.info("Authentication " + (matches ? "successful" : "failed") + " for user: " + email);
            return matches;
        }
        
        logger.warning("User not found with email: " + email);
        return false;
    }
    
    public boolean emailExists(String email) {
        boolean exists = userRepository.existsByEmail(email);
        logger.info("Email exists check for " + email + ": " + exists);
        return exists;
    }
    
    // Add dummy users for testing purposes
    public void createDefaultUsers() {
        if (!emailExists("client@example.com")) {
            User clientUser = new User();
            clientUser.setEmail("client@example.com");
            clientUser.setPassword("password");
            clientUser.setName("Demo Client");
            clientUser.setRole("user");
            createUser(clientUser);
            logger.info("Created default client user: client@example.com / password");
        }
        
        if (!emailExists("vendor@example.com")) {
            User vendorUser = new User();
            vendorUser.setEmail("vendor@example.com");
            vendorUser.setPassword("password");
            vendorUser.setName("Demo Vendor");
            vendorUser.setRole("vendor");
            createUser(vendorUser);
            logger.info("Created default vendor user: vendor@example.com / password");
        }
        
        if (!emailExists("admin@example.com")) {
            User adminUser = new User();
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword("admin123");
            adminUser.setName("System Admin");
            adminUser.setRole("admin");
            createUser(adminUser);
            logger.info("Created default admin user: admin@example.com / admin123");
        }
    }
}
