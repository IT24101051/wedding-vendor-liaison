
package com.weddingvendor.config;

import com.weddingvendor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeedInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("========================================");
        System.out.println("Initializing default users...");
        System.out.println("========================================");
        
        // Create default users when the application starts
        userService.createDefaultUsers();
        
        System.out.println("========================================");
        System.out.println("Default users created successfully.");
        System.out.println("You can login with the following credentials:");
        System.out.println("Client: client@example.com / password");
        System.out.println("Vendor: vendor@example.com / password");
        System.out.println("Admin: admin@example.com / admin123");
        System.out.println("========================================");
    }
}
