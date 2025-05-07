
package com.weddingvendor.controller;

import com.weddingvendor.model.User;
import com.weddingvendor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class AuthController {
    
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        logger.info("Register request received for email: " + user.getEmail());
        
        // Check if email already exists
        if (userService.emailExists(user.getEmail())) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Email already registered");
            return ResponseEntity.badRequest().body(response);
        }
        
        User createdUser = userService.createUser(user);
        
        // Don't return password in the response
        createdUser.setPassword(null);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", createdUser);
        response.put("message", "User registered successfully");
        
        logger.info("User registered successfully: " + user.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        String role = loginRequest.get("role");
        
        logger.info("Login attempt for: " + email + " with role: " + role);
        
        if (email == null || password == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Email and password are required");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (userService.authenticateUser(email, password)) {
            Optional<User> userOpt;
            
            // If role is specified, use it to find the user
            if (role != null && !role.isEmpty()) {
                userOpt = userService.getUserByEmailAndRole(email, role);
                if (userOpt.isEmpty()) {
                    logger.warning("Invalid credentials for role: " + role);
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", false);
                    response.put("message", "Invalid credentials for this user type");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
                }
            } else {
                userOpt = userService.getUserByEmail(email);
            }
            
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                
                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                
                // Don't return password in the response
                user.setPassword(null);
                response.put("data", user);
                
                // In a real application, you would generate a JWT token here
                response.put("token", "spring-boot-token-" + System.currentTimeMillis());
                
                logger.info("Login successful for: " + email);
                return ResponseEntity.ok(response);
            }
        }
        
        logger.warning("Invalid credentials for: " + email);
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    
    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus() {
        // In a real application, this would validate a JWT token
        // For demo purposes, we'll just return an unauthenticated response
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("authenticated", false);
        response.put("message", "No valid session");
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        // In a real application, this would invalidate the JWT token
        // For demo purposes, we'll just return a success response
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logged out successfully");
        
        return ResponseEntity.ok(response);
    }
}
