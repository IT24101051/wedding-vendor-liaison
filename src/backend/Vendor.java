
package com.weddingvendor.backend;

import java.util.ArrayList;
import java.util.List;

/**
 * Vendor class to store wedding vendor details
 */
public class Vendor {
    private String id;
    private String name;
    private String category;
    private double rating;
    private int reviewCount;
    private String image;
    private double minPrice;
    private double maxPrice;
    private String priceDisplay;
    private String location;
    private String description;
    private List<Service> services;
    
    public Vendor() {
        this.services = new ArrayList<>();
    }
    
    public Vendor(String id, String name, String category, double rating, int reviewCount, 
                  String image, double minPrice, double maxPrice, String location, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.image = image;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.priceDisplay = "$" + String.format("%.0f", minPrice) + " - $" + String.format("%.0f", maxPrice);
        this.location = location;
        this.description = description;
        this.services = new ArrayList<>();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    
    public int getReviewCount() { return reviewCount; }
    public void setReviewCount(int reviewCount) { this.reviewCount = reviewCount; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public double getMinPrice() { return minPrice; }
    public void setMinPrice(double minPrice) { 
        this.minPrice = minPrice;
        updatePriceDisplay();
    }
    
    public double getMaxPrice() { return maxPrice; }
    public void setMaxPrice(double maxPrice) { 
        this.maxPrice = maxPrice;
        updatePriceDisplay();
    }
    
    public String getPriceDisplay() { return priceDisplay; }
    public void setPriceDisplay(String priceDisplay) { this.priceDisplay = priceDisplay; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public List<Service> getServices() { return services; }
    public void setServices(List<Service> services) { this.services = services; }
    public void addService(Service service) { this.services.add(service); }
    
    private void updatePriceDisplay() {
        this.priceDisplay = "$" + String.format("%.0f", minPrice) + " - $" + String.format("%.0f", maxPrice);
    }
}
