
package com.weddingvendor.repository;

import com.weddingvendor.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, String> {
    List<Payment> findByUserId(String userId);
    List<Payment> findByVendorId(String vendorId);
    Optional<Payment> findByBookingId(String bookingId);
}
