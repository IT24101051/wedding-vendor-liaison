
package com.weddingvendor.backend;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * System to manage payment operations
 */
public class PaymentSystem {
    private static List<Payment> payments = new ArrayList<>();
    private static final DateTimeFormatter ISO_FORMAT = DateTimeFormatter.ISO_DATE_TIME;
    private static final String DATA_FILE = "data/payments.dat";
    private static boolean isInitialized = false;
    
    // Initialize with sample data or load from file
    static {
        loadFromFile();
        
        // If no data was loaded, initialize with sample data
        if (payments.isEmpty()) {
            initializeSampleData();
        }
    }
    
    /**
     * Initialize with some sample data
     */
    private static void initializeSampleData() {
        // Sample payment 1
        Payment payment1 = new Payment();
        payment1.setId("payment1");
        payment1.setBookingId("booking1");
        payment1.setUserId("user1");
        payment1.setVendorId("vendor1");
        payment1.setAmount(2500);
        payment1.setCurrency("USD");
        payment1.setPaymentMethod("credit_card");
        payment1.setStatus("completed");
        payment1.setTransactionId("txn_" + UUID.randomUUID().toString().substring(0, 8));
        payment1.setCreatedAt("2023-08-20T15:30:00.000Z");
        payment1.setUpdatedAt("2023-08-20T15:30:00.000Z");
        
        // Sample payment 2
        Payment payment2 = new Payment();
        payment2.setId("payment2");
        payment2.setBookingId("booking2");
        payment2.setUserId("user1");
        payment2.setVendorId("vendor2");
        payment2.setAmount(8000);
        payment2.setCurrency("USD");
        payment2.setPaymentMethod("credit_card");
        payment2.setStatus("completed");
        payment2.setTransactionId("txn_" + UUID.randomUUID().toString().substring(0, 8));
        payment2.setCreatedAt("2023-08-18T11:15:00.000Z");
        payment2.setUpdatedAt("2023-08-18T11:15:00.000Z");
        
        // Add all payments to the system
        payments.add(payment1);
        payments.add(payment2);
        
        // Save the initial data to file
        saveToFile();
    }
    
    /**
     * Load payments from file
     */
    @SuppressWarnings("unchecked")
    private static void loadFromFile() {
        File file = new File(DATA_FILE);
        
        if (file.exists() && file.length() > 0) {
            try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
                // Read the list of payments from the file
                payments = (List<Payment>) ois.readObject();
                System.out.println("Loaded " + payments.size() + " payments from file");
                isInitialized = true;
            } catch (IOException | ClassNotFoundException e) {
                System.err.println("Error loading payments from file: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
    
    /**
     * Save payments to file
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
                oos.writeObject(payments);
                System.out.println("Saved " + payments.size() + " payments to file");
            }
        } catch (IOException e) {
            System.err.println("Error saving payments to file: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Get all payments in the system
     */
    public List<Payment> getAllPayments() {
        return new ArrayList<>(payments);
    }
    
    /**
     * Get payments for a specific user
     */
    public List<Payment> getUserPayments(String userId) {
        return payments.stream()
            .filter(payment -> payment.getUserId().equals(userId))
            .collect(Collectors.toList());
    }
    
    /**
     * Get a specific payment by ID
     */
    public Payment getPaymentById(String paymentId) {
        return payments.stream()
            .filter(payment -> payment.getId().equals(paymentId))
            .findFirst()
            .orElse(null);
    }
    
    /**
     * Get payment by booking ID
     */
    public Payment getPaymentByBookingId(String bookingId) {
        return payments.stream()
            .filter(payment -> payment.getBookingId().equals(bookingId))
            .findFirst()
            .orElse(null);
    }
    
    /**
     * Process a payment request
     */
    public Payment processPayment(PaymentRequest request) {
        Payment payment = new Payment();
        payment.setId("payment" + UUID.randomUUID().toString().substring(0, 8));
        payment.setBookingId(request.getBookingId());
        payment.setUserId(request.getUserId());
        payment.setVendorId(request.getVendorId());
        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency() != null ? request.getCurrency() : "USD");
        payment.setPaymentMethod(request.getPaymentMethod());
        
        // Simulate payment processing with credit card validation
        if ("credit_card".equals(request.getPaymentMethod())) {
            if (request.getCardDetails() == null) {
                payment.setStatus("failed");
                payment.setTransactionId("txn_failed");
            } else {
                // Simple validation (in a real system, this would call a payment gateway API)
                String cardNumber = request.getCardDetails().getCardNumber();
                if (cardNumber != null && cardNumber.length() >= 13 && cardNumber.length() <= 19) {
                    payment.setStatus("completed");
                    payment.setTransactionId("txn_" + UUID.randomUUID().toString().substring(0, 8));
                } else {
                    payment.setStatus("failed");
                    payment.setTransactionId("txn_failed");
                }
            }
        } else if ("paypal".equals(request.getPaymentMethod())) {
            // Simulate PayPal payment (always successful for demo)
            payment.setStatus("completed");
            payment.setTransactionId("pp_" + UUID.randomUUID().toString().substring(0, 8));
        } else {
            // Unknown payment method
            payment.setStatus("failed");
            payment.setTransactionId("txn_failed");
        }
        
        // Set timestamps
        String now = LocalDateTime.now().format(ISO_FORMAT);
        payment.setCreatedAt(now);
        payment.setUpdatedAt(now);
        
        // Add to collection
        payments.add(payment);
        
        // Save changes to file
        saveToFile();
        
        return payment;
    }
    
    /**
     * Update an existing payment
     */
    public boolean updatePayment(String paymentId, Payment updates) {
        for (int i = 0; i < payments.size(); i++) {
            Payment payment = payments.get(i);
            
            if (payment.getId().equals(paymentId)) {
                // Update status if provided
                if (updates.getStatus() != null) payment.setStatus(updates.getStatus());
                
                // Update transactionId if provided
                if (updates.getTransactionId() != null) payment.setTransactionId(updates.getTransactionId());
                
                // Always update the updatedAt timestamp
                payment.setUpdatedAt(LocalDateTime.now().format(ISO_FORMAT));
                
                // Save changes to file
                saveToFile();
                
                return true;
            }
        }
        
        return false;
    }
}
