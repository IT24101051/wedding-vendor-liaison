
package com.weddingvendor.repository;

import com.weddingvendor.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {
    List<Booking> findByClientId(String clientId);
    List<Booking> findByVendorId(String vendorId);
    List<Booking> findByStatus(String status);
}
