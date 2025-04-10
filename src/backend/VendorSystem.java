package com.weddingvendor.backend;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * System to manage vendors using the custom LinkedList implementation with file persistence
 */
public class VendorSystem {
    private static VendorLinkedList vendors = new VendorLinkedList();
    private static final String DATA_FILE = "data/vendors.dat";
    private static boolean isInitialized = false;
    
    // Initialize with sample data or load from file
    public VendorSystem() {
        if (!isInitialized) {
            System.out.println("Initializing VendorSystem...");
            boolean loaded = loadFromFile();
            
            // If no data was loaded, initialize with sample data
            if (!loaded || vendors.isEmpty()) {
                System.out.println("No vendor data found, initializing with sample data");
                initializeSampleData();
            } else {
                System.out.println("Successfully loaded vendor data from file");
            }
            
            isInitialized = true;
        }
    }
    
    /**
     * Initialize the system with sample vendor data
     */
    private static void initializeSampleData() {
        System.out.println("Initializing vendor system with sample data");
        // Create vendors with sample data
        Vendor vendor1 = new Vendor(
            "vendor1",
            "Elegant Moments Photography",
            "Photographer",
            4.9,
            124,
            "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            1200,
            3000,
            "New York, NY",
            "Specializing in candid wedding photography that captures the emotions of your special day."
        );
        
        // Add services to vendor1
        vendor1.addService(new Service("basic", "Basic Wedding Package", "Photography", 
            "6 hours of coverage, 1 photographer, 300+ edited digital images", 1200, "6 hours"));
        vendor1.addService(new Service("premium", "Premium Wedding Package", "Photography", 
            "8 hours of coverage, 2 photographers, engagement session, 500+ edited digital images", 2000, "8 hours"));
        vendor1.addService(new Service("luxury", "Luxury Wedding Package", "Photography", 
            "10 hours of coverage, 2 photographers, engagement session, bridal session, 700+ edited digital images", 3000, "10 hours"));
        
        Vendor vendor2 = new Vendor(
            "vendor2",
            "Royal Garden Venue",
            "Venue",
            4.8,
            89,
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            5000,
            15000,
            "Chicago, IL",
            "A stunning garden venue with both indoor and outdoor spaces for your dream wedding."
        );
        
        // Add services to vendor2
        vendor2.addService(new Service("basic_venue", "Basic Venue Package", "Venue", 
            "6 hour venue rental, basic setup and cleanup", 5000, "6 hours"));
        vendor2.addService(new Service("premium_venue", "Premium Venue Package", "Venue", 
            "8 hour venue rental, premium setup, cleanup, and basic decoration", 8000, "8 hours"));
        vendor2.addService(new Service("luxury_venue", "Luxury Venue Package", "Venue", 
            "12 hour venue rental, premium setup, cleanup, decoration, and coordination", 15000, "12 hours"));
        
        Vendor vendor3 = new Vendor(
            "vendor3",
            "Divine Cuisine Catering",
            "Caterer",
            4.7,
            156,
            "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            45,
            120,
            "Los Angeles, CA",
            "Gourmet catering services with customizable menus to suit any taste and dietary requirement."
        );
        
        // Add more vendors...
        Vendor vendor4 = new Vendor(
            "vendor4",
            "Blooming Beauty Florals",
            "Florist",
            4.9,
            78,
            "https://images.unsplash.com/photo-1561128290-006dc4827214?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            800,
            2500,
            "Miami, FL",
            "Creating breathtaking floral arrangements that bring your wedding vision to life."
        );
        
        Vendor vendor5 = new Vendor(
            "vendor5",
            "Harmony Wedding Band",
            "Entertainment",
            4.8,
            92,
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            1800,
            3500,
            "Austin, TX",
            "Live music entertainment that keeps your guests dancing all night long."
        );
        
        Vendor vendor6 = new Vendor(
            "vendor6",
            "Dream Wedding Planners",
            "Planner",
            5.0,
            64,
            "https://images.unsplash.com/photo-1511795409834-432f7b1632a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            2500,
            8000,
            "Seattle, WA",
            "Full-service wedding planning to make your journey to the altar stress-free and enjoyable."
        );
        
        // Add all vendors to the LinkedList
        vendors.add(vendor1);
        vendors.add(vendor2);
        vendors.add(vendor3);
        vendors.add(vendor4);
        vendors.add(vendor5);
        vendors.add(vendor6);
        
        System.out.println("Added " + vendors.size() + " sample vendors");
        
        // Save the initial data to file
        saveToFile();
    }
    
    /**
     * Load vendors from file
     */
    @SuppressWarnings("unchecked")
    private static boolean loadFromFile() {
        System.out.println("Attempting to load vendors from file: " + DATA_FILE);
        
        // Create data directory if it doesn't exist
        File dataDir = new File("data");
        if (!dataDir.exists()) {
            boolean created = dataDir.mkdir();
            if (created) {
                System.out.println("Created data directory");
            } else {
                System.err.println("Failed to create data directory");
                return false;
            }
        }
        
        File file = new File(DATA_FILE);
        
        if (file.exists() && file.length() > 0) {
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
                // Read the list of vendors from the file
                List<Vendor> vendorList = (List<Vendor>) ois.readObject();
                
                // Clear the current list
                vendors = new VendorLinkedList();
                
                // Add all vendors to the LinkedList
                for (Vendor vendor : vendorList) {
                    vendors.add(vendor);
                }
                
                System.out.println("Loaded " + vendorList.size() + " vendors from file: " + file.getAbsolutePath());
                return true;
            } catch (IOException | ClassNotFoundException e) {
                System.err.println("Error loading vendors from file: " + e.getMessage());
                e.printStackTrace();
                // If there's an error, initialize with sample data
                vendors = new VendorLinkedList();
                return false;
            }
        } else {
            System.out.println("Vendors data file does not exist or is empty, will create with sample data");
            return false;
        }
    }
    
    /**
     * Save vendors to file
     */
    private static void saveToFile() {
        try {
            // Ensure the data directory exists
            File dataDir = new File("data");
            if (!dataDir.exists()) {
                boolean created = dataDir.mkdir();
                if (!created) {
                    System.err.println("Failed to create data directory");
                    return;
                }
            }
            
            File file = new File(DATA_FILE);
            
            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
                // Convert LinkedList to regular list for serialization
                List<Vendor> vendorList = vendors.toList();
                oos.writeObject(vendorList);
                System.out.println("Saved " + vendorList.size() + " vendors to file: " + file.getAbsolutePath());
            }
        } catch (IOException e) {
            System.err.println("Error saving vendors to file: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Get all vendors
     */
    public List<Vendor> getAllVendors() {
        List<Vendor> result = vendors.toList();
        System.out.println("getAllVendors: Retrieved " + result.size() + " vendors");
        return result;
    }
    
    /**
     * Get vendor by ID
     */
    public Vendor getVendorById(String id) {
        return vendors.getById(id);
    }
    
    /**
     * Add a new vendor
     */
    public String addVendor(Vendor vendor) {
        if (vendor.getId() == null || vendor.getId().isEmpty()) {
            vendor.setId("vendor" + UUID.randomUUID().toString().substring(0, 8));
        }
        vendors.add(vendor);
        saveToFile();
        return vendor.getId();
    }
    
    /**
     * Update a vendor
     */
    public boolean updateVendor(String id, Vendor vendor) {
        boolean updated = vendors.updateById(id, vendor);
        if (updated) {
            saveToFile();
        }
        return updated;
    }
    
    /**
     * Delete a vendor
     */
    public boolean deleteVendor(String id) {
        boolean removed = vendors.removeById(id);
        if (removed) {
            saveToFile();
        }
        return removed;
    }
    
    /**
     * Get vendors sorted by price (ascending)
     */
    public List<Vendor> getVendorsSortedByPrice() {
        // Create a copy of the vendor list
        VendorLinkedList sortedList = new VendorLinkedList();
        for (Vendor vendor : vendors.toList()) {
            sortedList.add(vendor);
        }
        
        // Sort the copy
        sortedList.bubbleSortByPrice();
        
        return sortedList.toList();
    }
    
    /**
     * Get vendors sorted by price (descending)
     */
    public List<Vendor> getVendorsSortedByPriceDesc() {
        // Create a copy of the vendor list
        VendorLinkedList sortedList = new VendorLinkedList();
        for (Vendor vendor : vendors.toList()) {
            sortedList.add(vendor);
        }
        
        // Sort the copy
        sortedList.bubbleSortByPriceDesc();
        
        return sortedList.toList();
    }
    
    /**
     * Get vendors sorted by rating
     */
    public List<Vendor> getVendorsSortedByRating() {
        // Create a copy of the vendor list
        VendorLinkedList sortedList = new VendorLinkedList();
        for (Vendor vendor : vendors.toList()) {
            sortedList.add(vendor);
        }
        
        // Sort the copy
        sortedList.bubbleSortByRating();
        
        return sortedList.toList();
    }
    
    /**
     * Get vendors by category
     */
    public List<Vendor> getVendorsByCategory(String category) {
        VendorLinkedList categoryList = new VendorLinkedList();
        
        for (Vendor vendor : vendors.toList()) {
            if (vendor.getCategory().equalsIgnoreCase(category)) {
                categoryList.add(vendor);
            }
        }
        
        return categoryList.toList();
    }
    
    /**
     * Get vendors by location
     */
    public List<Vendor> getVendorsByLocation(String location) {
        VendorLinkedList locationList = new VendorLinkedList();
        
        for (Vendor vendor : vendors.toList()) {
            if (vendor.getLocation().contains(location)) {
                locationList.add(vendor);
            }
        }
        
        return locationList.toList();
    }
    
    /**
     * Search vendors by name or description
     */
    public List<Vendor> searchVendors(String query) {
        VendorLinkedList searchResults = new VendorLinkedList();
        
        for (Vendor vendor : vendors.toList()) {
            if (vendor.getName().toLowerCase().contains(query.toLowerCase()) || 
                vendor.getDescription().toLowerCase().contains(query.toLowerCase())) {
                searchResults.add(vendor);
            }
        }
        
        return searchResults.toList();
    }
}
