
package com.weddingvendor.service;

import com.weddingvendor.model.Service;
import com.weddingvendor.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService {
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }
    
    public Optional<Service> getServiceById(String id) {
        return serviceRepository.findById(id);
    }
    
    public List<Service> getServicesByVendor(String vendorId) {
        return serviceRepository.findByVendorId(vendorId);
    }
    
    public List<Service> getActiveServicesByVendor(String vendorId) {
        return serviceRepository.findByVendorIdAndActive(vendorId, true);
    }
    
    public Service createService(Service service) {
        return serviceRepository.save(service);
    }
    
    public Service updateService(String id, Service serviceDetails) {
        Optional<Service> optionalService = serviceRepository.findById(id);
        
        if (optionalService.isPresent()) {
            Service existingService = optionalService.get();
            existingService.setName(serviceDetails.getName());
            existingService.setDescription(serviceDetails.getDescription());
            existingService.setPrice(serviceDetails.getPrice());
            existingService.setActive(serviceDetails.isActive());
            
            return serviceRepository.save(existingService);
        }
        
        return null;
    }
    
    public boolean deleteService(String id) {
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
