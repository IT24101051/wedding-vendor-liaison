
package com.weddingvendor.controller;

import com.weddingvendor.model.Service;
import com.weddingvendor.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {
    
    @Autowired
    private ServiceService serviceService;
    
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        List<Service> services = serviceService.getAllServices();
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable String id) {
        Optional<Service> service = serviceService.getServiceById(id);
        
        if (service.isPresent()) {
            return ResponseEntity.ok(service.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<Service>> getServicesByVendor(@PathVariable String vendorId) {
        List<Service> services = serviceService.getServicesByVendor(vendorId);
        return ResponseEntity.ok(services);
    }
    
    @GetMapping("/vendor/{vendorId}/active")
    public ResponseEntity<List<Service>> getActiveServicesByVendor(@PathVariable String vendorId) {
        List<Service> services = serviceService.getActiveServicesByVendor(vendorId);
        return ResponseEntity.ok(services);
    }
    
    @PostMapping
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        Service createdService = serviceService.createService(service);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdService);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateService(@PathVariable String id, @RequestBody Service serviceDetails) {
        Service updatedService = serviceService.updateService(id, serviceDetails);
        
        if (updatedService != null) {
            return ResponseEntity.ok(updatedService);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable String id) {
        boolean deleted = serviceService.deleteService(id);
        
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
