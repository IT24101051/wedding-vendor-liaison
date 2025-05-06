
package com.weddingvendor.config;

import com.weddingvendor.model.Service;
import com.weddingvendor.model.User;
import com.weddingvendor.model.Vendor;
import com.weddingvendor.repository.ServiceRepository;
import com.weddingvendor.repository.UserRepository;
import com.weddingvendor.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private VendorRepository vendorRepository;
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize users
        if (userRepository.count() == 0) {
            // Create a client user
            User clientUser = new User();
            clientUser.setEmail("client@example.com");
            clientUser.setPassword(passwordEncoder.encode("password"));
            clientUser.setName("Demo Client");
            clientUser.setRole("user");
            userRepository.save(clientUser);
            
            // Create a vendor user
            User vendorUser = new User();
            vendorUser.setEmail("vendor@example.com");
            vendorUser.setPassword(passwordEncoder.encode("password"));
            vendorUser.setName("Demo Vendor");
            vendorUser.setRole("vendor");
            userRepository.save(vendorUser);
            
            // Create an admin user
            User adminUser = new User();
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(passwordEncoder.encode("password"));
            adminUser.setName("System Administrator");
            adminUser.setRole("admin");
            userRepository.save(adminUser);
        }
        
        // Initialize vendors
        if (vendorRepository.count() == 0) {
            // Photography vendor
            Vendor photographer = new Vendor();
            photographer.setName("Elegant Moments Photography");
            photographer.setDescription("Capturing your special day with artistic and timeless photography.");
            photographer.setCategory("Photography");
            photographer.setLocation("New York");
            photographer.setRating(4.8);
            photographer.setImageUrl("https://example.com/images/photographer1.jpg");
            photographer.setContactEmail("photo@example.com");
            photographer.setContactPhone("123-456-7890");
            vendorRepository.save(photographer);
            
            // Add services for photography vendor
            Service photoService1 = new Service();
            photoService1.setName("Premium Wedding Photography");
            photoService1.setDescription("Full-day coverage with 2 photographers, 500+ edited photos.");
            photoService1.setPrice(2500.0);
            photoService1.setVendor(photographer);
            serviceRepository.save(photoService1);
            
            Service photoService2 = new Service();
            photoService2.setName("Engagement Photoshoot");
            photoService2.setDescription("2-hour engagement photoshoot at location of your choice.");
            photoService2.setPrice(500.0);
            photoService2.setVendor(photographer);
            serviceRepository.save(photoService2);
            
            // Catering vendor
            Vendor caterer = new Vendor();
            caterer.setName("Delicious Catering Co.");
            caterer.setDescription("Exquisite cuisine for your wedding, customized to your preferences.");
            caterer.setCategory("Catering");
            caterer.setLocation("Los Angeles");
            caterer.setRating(4.6);
            caterer.setImageUrl("https://example.com/images/caterer1.jpg");
            caterer.setContactEmail("food@example.com");
            caterer.setContactPhone("987-654-3210");
            vendorRepository.save(caterer);
            
            // Add services for catering vendor
            Service cateringService1 = new Service();
            cateringService1.setName("Premium Wedding Buffet");
            cateringService1.setDescription("Gourmet buffet for up to 100 guests with 5 main dishes.");
            cateringService1.setPrice(5000.0);
            cateringService1.setVendor(caterer);
            serviceRepository.save(cateringService1);
            
            Service cateringService2 = new Service();
            cateringService2.setName("Cocktail Hour Package");
            cateringService2.setDescription("Hors d'oeuvres and drinks for cocktail hour.");
            cateringService2.setPrice(1500.0);
            cateringService2.setVendor(caterer);
            serviceRepository.save(cateringService2);
            
            // Venue vendor
            Vendor venue = new Vendor();
            venue.setName("Grand Palace Weddings");
            venue.setDescription("Elegant and spacious venue for your dream wedding.");
            venue.setCategory("Venue");
            venue.setLocation("Chicago");
            venue.setRating(4.9);
            venue.setImageUrl("https://example.com/images/venue1.jpg");
            venue.setContactEmail("venue@example.com");
            venue.setContactPhone("555-123-4567");
            vendorRepository.save(venue);
            
            // Add services for venue
            Service venueService1 = new Service();
            venueService1.setName("Grand Ballroom");
            venueService1.setDescription("Elegant ballroom for up to 300 guests.");
            venueService1.setPrice(8000.0);
            venueService1.setVendor(venue);
            serviceRepository.save(venueService1);
            
            Service venueService2 = new Service();
            venueService2.setName("Garden Ceremony");
            venueService2.setDescription("Beautiful garden setting for your ceremony.");
            venueService2.setPrice(3000.0);
            venueService2.setVendor(venue);
            serviceRepository.save(venueService2);
        }
    }
}
