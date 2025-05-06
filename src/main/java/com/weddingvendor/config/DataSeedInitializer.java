
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
        // Create default users when the application starts
        userService.createDefaultUsers();
        System.out.println("Default users created successfully.");
    }
}
