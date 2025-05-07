
package com.weddingvendor.config;

import com.weddingvendor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class DataSeedInitializer implements CommandLineRunner {

    private static final Logger logger = Logger.getLogger(DataSeedInitializer.class.getName());

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        logger.info("========================================");
        logger.info("Initializing default users...");
        logger.info("========================================");
        
        // Create default users when the application starts
        userService.createDefaultUsers();
        
        logger.info("========================================");
        logger.info("Default users created successfully.");
        logger.info("You can login with the following credentials:");
        logger.info("Client: client@example.com / password");
        logger.info("Vendor: vendor@example.com / password");
        logger.info("Admin: admin@example.com / admin123");
        logger.info("========================================");
    }
}
