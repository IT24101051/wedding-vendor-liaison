
package com.weddingvendor.backend;

/**
 * Represents a booking in the Wedding Vendor system
 */
public class Booking {
    private String id;
    private String userId;
    private String userName;
    private String vendorId;
    private String vendorName;
    private String serviceName;
    private String eventType;
    private String serviceDate;
    private double amount;
    private String status;
    private String paymentStatus;
    private String notes;
    private String createdAt;
    private String updatedAt;
    
    // Default constructor
    public Booking() {}
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getVendorId() {
        return vendorId;
    }
    
    public void setVendorId(String vendorId) {
        this.vendorId = vendorId;
    }
    
    public String getVendorName() {
        return vendorName;
    }
    
    public void setVendorName(String vendorName) {
        this.vendorName = vendorName;
    }
    
    public String getServiceName() {
        return serviceName;
    }
    
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
    
    public String getEventType() {
        return eventType;
    }
    
    public void setEventType(String eventType) {
        this.eventType = eventType;
    }
    
    public String getServiceDate() {
        return serviceDate;
    }
    
    public void setServiceDate(String serviceDate) {
        this.serviceDate = serviceDate;
    }
    
    public double getAmount() {
        return amount;
    }
    
    public void setAmount(double amount) {
        this.amount = amount;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getPaymentStatus() {
        return paymentStatus;
    }
    
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
