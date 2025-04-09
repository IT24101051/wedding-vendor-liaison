
package com.weddingvendor.backend;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * File-based booking system for the Wedding Vendor application
 */
public class BookingSystem {
    private static List<Booking> bookings = new ArrayList<>();
    private static final DateTimeFormatter ISO_FORMAT = DateTimeFormatter.ISO_DATE_TIME;
    private static final String DATA_FILE = "bookings.dat";
    private static boolean isInitialized = false;
    
    // Initialize with sample data or load from file
    static {
        loadFromFile();
        
        // If no data was loaded, initialize with sample data
        if (bookings.isEmpty()) {
            initializeSampleData();
        }
    }
    
    /**
     * Initialize with some sample data
     */
    private static void initializeSampleData() {
        // Sample booking 1
        Booking booking1 = new Booking();
        booking1.setId("booking1");
        booking1.setUserId("user1");
        booking1.setUserName("Demo Client");
        booking1.setVendorId("vendor1");
        booking1.setVendorName("Elegant Moments Photography");
        booking1.setServiceName("Premium Wedding Photography");
        booking1.setEventType("Wedding");
        booking1.setServiceDate("2023-10-15");
        booking1.setAmount(2500);
        booking1.setStatus("confirmed");
        booking1.setPaymentStatus("paid");
        booking1.setNotes("Looking forward to capturing your special day!");
        booking1.setCreatedAt("2023-08-20T14:30:00.000Z");
        booking1.setUpdatedAt("2023-08-20T14:30:00.000Z");
        
        // Sample booking 2
        Booking booking2 = new Booking();
        booking2.setId("booking2");
        booking2.setUserId("user1");
        booking2.setUserName("Demo Client");
        booking2.setVendorId("vendor2");
        booking2.setVendorName("Royal Garden Venue");
        booking2.setServiceName("Full Day Venue Rental");
        booking2.setEventType("Wedding");
        booking2.setServiceDate("2023-10-15");
        booking2.setAmount(8000);
        booking2.setStatus("confirmed");
        booking2.setPaymentStatus("paid");
        booking2.setCreatedAt("2023-08-18T10:15:00.000Z");
        booking2.setUpdatedAt("2023-08-18T10:15:00.000Z");
        
        // Sample booking 3
        Booking booking3 = new Booking();
        booking3.setId("booking3");
        booking3.setUserId("user2");
        booking3.setUserName("Jane Smith");
        booking3.setVendorId("vendor1");
        booking3.setVendorName("Elegant Moments Photography");
        booking3.setServiceName("Engagement Photoshoot");
        booking3.setEventType("Engagement");
        booking3.setServiceDate("2023-09-10");
        booking3.setAmount(900);
        booking3.setStatus("completed");
        booking3.setPaymentStatus("paid");
        booking3.setNotes("Beautiful photos delivered on time!");
        booking3.setCreatedAt("2023-07-25T09:45:00.000Z");
        booking3.setUpdatedAt("2023-09-11T16:20:00.000Z");
        
        // Add all bookings to the system
        bookings.add(booking1);
        bookings.add(booking2);
        bookings.add(booking3);
        
        // Save the initial data to file
        saveToFile();
    }
    
    /**
     * Load bookings from file
     */
    @SuppressWarnings("unchecked")
    private static void loadFromFile() {
        File file = new File(DATA_FILE);
        
        if (file.exists()) {
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
                // Read the list of bookings from the file
                bookings = (List<Booking>) ois.readObject();
                System.out.println("Loaded " + bookings.size() + " bookings from file");
                isInitialized = true;
            } catch (IOException | ClassNotFoundException e) {
                System.err.println("Error loading bookings from file: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
    
    /**
     * Save bookings to file
     */
    private static void saveToFile() {
        try {
            // Ensure the data directory exists
            File dataDir = new File("data");
            if (!dataDir.exists()) {
                dataDir.mkdir();
            }
            
            File file = new File(DATA_FILE);
            
            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(file))) {
                oos.writeObject(bookings);
                System.out.println("Saved " + bookings.size() + " bookings to file");
            }
        } catch (IOException e) {
            System.err.println("Error saving bookings to file: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Get all bookings in the system
     */
    public List<Booking> getAllBookings() {
        return new ArrayList<>(bookings);
    }
    
    /**
     * Get bookings for a specific vendor
     */
    public List<Booking> getVendorBookings(String vendorId) {
        return bookings.stream()
            .filter(booking -> booking.getVendorId().equals(vendorId))
            .collect(Collectors.toList());
    }
    
    /**
     * Get bookings for a specific user
     */
    public List<Booking> getUserBookings(String userId) {
        return bookings.stream()
            .filter(booking -> booking.getUserId().equals(userId))
            .collect(Collectors.toList());
    }
    
    /**
     * Get a specific booking by ID
     */
    public Booking getBookingById(String bookingId) {
        return bookings.stream()
            .filter(booking -> booking.getId().equals(bookingId))
            .findFirst()
            .orElse(null);
    }
    
    /**
     * Create a new booking
     */
    public String createBooking(Booking booking) {
        // Generate a new ID if none exists
        if (booking.getId() == null || booking.getId().isEmpty()) {
            booking.setId("booking" + UUID.randomUUID().toString().substring(0, 8));
        }
        
        // Set created and updated timestamps
        String now = LocalDateTime.now().format(ISO_FORMAT);
        booking.setCreatedAt(now);
        booking.setUpdatedAt(now);
        
        // Add to collection
        bookings.add(booking);
        
        // Save changes to file
        saveToFile();
        
        return booking.getId();
    }
    
    /**
     * Update an existing booking
     */
    public boolean updateBooking(String bookingId, Booking updates) {
        for (int i = 0; i < bookings.size(); i++) {
            Booking booking = bookings.get(i);
            
            if (booking.getId().equals(bookingId)) {
                // Update all non-null fields
                if (updates.getUserId() != null) booking.setUserId(updates.getUserId());
                if (updates.getUserName() != null) booking.setUserName(updates.getUserName());
                if (updates.getVendorId() != null) booking.setVendorId(updates.getVendorId());
                if (updates.getVendorName() != null) booking.setVendorName(updates.getVendorName());
                if (updates.getServiceName() != null) booking.setServiceName(updates.getServiceName());
                if (updates.getEventType() != null) booking.setEventType(updates.getEventType());
                if (updates.getServiceDate() != null) booking.setServiceDate(updates.getServiceDate());
                if (updates.getAmount() > 0) booking.setAmount(updates.getAmount());
                if (updates.getStatus() != null) booking.setStatus(updates.getStatus());
                if (updates.getPaymentStatus() != null) booking.setPaymentStatus(updates.getPaymentStatus());
                if (updates.getNotes() != null) booking.setNotes(updates.getNotes());
                
                // Always update the updatedAt timestamp
                booking.setUpdatedAt(LocalDateTime.now().format(ISO_FORMAT));
                
                // Save changes to file
                saveToFile();
                
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Delete a booking
     */
    public boolean deleteBooking(String bookingId) {
        boolean removed = bookings.removeIf(booking -> booking.getId().equals(bookingId));
        
        if (removed) {
            // Save changes to file
            saveToFile();
        }
        
        return removed;
    }
}
