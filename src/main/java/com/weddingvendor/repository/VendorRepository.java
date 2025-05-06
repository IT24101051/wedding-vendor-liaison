
package com.weddingvendor.repository;

import com.weddingvendor.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, String> {
    List<Vendor> findByCategory(String category);
    List<Vendor> findByLocation(String location);
    
    @Query("SELECT v FROM Vendor v WHERE " +
           "(:name IS NULL OR LOWER(v.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:category IS NULL OR v.category = :category) AND " +
           "(:location IS NULL OR v.location = :location)")
    List<Vendor> searchVendors(String name, String category, String location);
}
