
package com.weddingvendor.controller;

import com.weddingvendor.model.Vendor;
import com.weddingvendor.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin(origins = "*")
public class VendorController {
    
    @Autowired
    private VendorService vendorService;
    
    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String sort) {
        
        List<Vendor> vendors;
        
        // If search parameters are provided, use search method
        if (name != null || category != null || location != null) {
            vendors = vendorService.searchVendors(name, category, location);
        } else {
            vendors = vendorService.getAllVendors();
        }
        
        // Apply sorting if requested
        if (sort != null) {
            switch (sort) {
                case "name":
                    vendors.sort((v1, v2) -> v1.getName().compareToIgnoreCase(v2.getName()));
                    break;
                case "rating":
                    vendors.sort((v1, v2) -> Double.compare(v2.getRating(), v1.getRating()));
                    break;
                // Add more sorting options as needed
            }
        }
        
        return ResponseEntity.ok(vendors);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getVendorById(@PathVariable String id) {
        Optional<Vendor> vendor = vendorService.getVendorById(id);
        
        if (vendor.isPresent()) {
            return ResponseEntity.ok(vendor.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Vendor>> getVendorsByCategory(@PathVariable String category) {
        List<Vendor> vendors = vendorService.getVendorsByCategory(category);
        return ResponseEntity.ok(vendors);
    }
    
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Vendor>> getVendorsByLocation(@PathVariable String location) {
        List<Vendor> vendors = vendorService.getVendorsByLocation(location);
        return ResponseEntity.ok(vendors);
    }
    
    @PostMapping
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        Vendor createdVendor = vendorService.createVendor(vendor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVendor);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVendor(@PathVariable String id, @RequestBody Vendor vendorDetails) {
        Vendor updatedVendor = vendorService.updateVendor(id, vendorDetails);
        
        if (updatedVendor != null) {
            return ResponseEntity.ok(updatedVendor);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVendor(@PathVariable String id) {
        boolean deleted = vendorService.deleteVendor(id);
        
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
