
package com.weddingvendor.service;

import com.weddingvendor.model.Vendor;
import com.weddingvendor.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {
    
    @Autowired
    private VendorRepository vendorRepository;
    
    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }
    
    public Optional<Vendor> getVendorById(String id) {
        return vendorRepository.findById(id);
    }
    
    public Vendor createVendor(Vendor vendor) {
        return vendorRepository.save(vendor);
    }
    
    public Vendor updateVendor(String id, Vendor vendorDetails) {
        Optional<Vendor> optionalVendor = vendorRepository.findById(id);
        
        if (optionalVendor.isPresent()) {
            Vendor existingVendor = optionalVendor.get();
            existingVendor.setName(vendorDetails.getName());
            existingVendor.setDescription(vendorDetails.getDescription());
            existingVendor.setLocation(vendorDetails.getLocation());
            existingVendor.setCategory(vendorDetails.getCategory());
            existingVendor.setRating(vendorDetails.getRating());
            existingVendor.setImageUrl(vendorDetails.getImageUrl());
            existingVendor.setContactEmail(vendorDetails.getContactEmail());
            existingVendor.setContactPhone(vendorDetails.getContactPhone());
            
            return vendorRepository.save(existingVendor);
        }
        
        return null;
    }
    
    public boolean deleteVendor(String id) {
        if (vendorRepository.existsById(id)) {
            vendorRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Vendor> getVendorsByCategory(String category) {
        return vendorRepository.findByCategory(category);
    }
    
    public List<Vendor> getVendorsByLocation(String location) {
        return vendorRepository.findByLocation(location);
    }
    
    public List<Vendor> searchVendors(String name, String category, String location) {
        return vendorRepository.searchVendors(name, category, location);
    }
}
