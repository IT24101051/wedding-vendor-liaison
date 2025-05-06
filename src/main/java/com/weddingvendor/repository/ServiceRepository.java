
package com.weddingvendor.repository;

import com.weddingvendor.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, String> {
    List<Service> findByVendorId(String vendorId);
    List<Service> findByVendorIdAndActive(String vendorId, boolean active);
}
