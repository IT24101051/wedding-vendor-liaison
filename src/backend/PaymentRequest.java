
package com.weddingvendor.backend;

import java.io.Serializable;

/**
 * Represents a payment request in the system
 */
public class PaymentRequest implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private String bookingId;
    private String userId;
    private String vendorId;
    private double amount;
    private String currency;
    private String paymentMethod;
    private CardDetails cardDetails;
    
    // Default constructor
    public PaymentRequest() {
    }
    
    // Getters and Setters
    public String getBookingId() {
        return bookingId;
    }
    
    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getVendorId() {
        return vendorId;
    }
    
    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }
    
    public double getAmount() {
        return amount;
    }
    
    public void setAmount(double amount) {
        this.amount = amount;
    }
    
    public String getCurrency() {
        return currency;
    }
    
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public CardDetails getCardDetails() {
        return cardDetails;
    }
    
    public void setCardDetails(CardDetails cardDetails) {
        this.cardDetails = cardDetails;
    }
    
    /**
     * Nested class for card details
     */
    public static class CardDetails implements Serializable {
        private static final long serialVersionUID = 1L;
        
        private String cardNumber;
        private String cardholderName;
        private String expiryDate;
        private String cvv;
        
        public String getCardNumber() {
            return cardNumber;
        }
        
        public void setCardNumber(String cardNumber) {
            this.cardNumber = cardNumber;
        }
        
        public String getCardholderName() {
            return cardholderName;
        }
        
        public void setCardholderName(String cardholderName) {
            this.cardholderName = cardholderName;
        }
        
        public String getExpiryDate() {
            return expiryDate;
        }
        
        public void setExpiryDate(String expiryDate) {
            this.expiryDate = expiryDate;
        }
        
        public String getCvv() {
            return cvv;
        }
        
        public void setCvv(String cvv) {
            this.cvv = cvv;
        }
    }
}
