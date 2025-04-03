
package com.weddingvendor.backend;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * In-memory booking system for the Wedding Vendor application
 */
public class BookingSystem {
    private static final List<Booking> bookings = new ArrayList<>();
    private static final DateTimeFormatter ISO_FORMAT = DateTimeFormatter.ISO_DATE_TIME;
    
    // Initialize with some sample data
    static {
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
                
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Delete a booking
     */
    public boolean deleteBooking(String bookingId) {
        return bookings.removeIf(booking -> booking.getId().equals(bookingId));
    }
}
