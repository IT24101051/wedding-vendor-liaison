
package com.weddingvendor.service;

import com.weddingvendor.model.Booking;
import com.weddingvendor.model.Payment;
import com.weddingvendor.repository.BookingRepository;
import com.weddingvendor.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    public Optional<Payment> getPaymentById(String id) {
        return paymentRepository.findById(id);
    }
    
    public Optional<Payment> getPaymentByBookingId(String bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }
    
    public List<Payment> getUserPayments(String userId) {
        return paymentRepository.findByUserId(userId);
    }
    
    public List<Payment> getVendorPayments(String vendorId) {
        return paymentRepository.findByVendorId(vendorId);
    }
    
    public Payment createPayment(Payment payment) {
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());
        
        // Generate transaction ID if not provided
        if (payment.getTransactionId() == null) {
            payment.setTransactionId("txn_" + UUID.randomUUID().toString().substring(0, 8));
        }
        
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update booking payment status if payment is successful
        if ("completed".equalsIgnoreCase(payment.getStatus()) && payment.getBooking() != null) {
            Booking booking = payment.getBooking();
            booking.setPaymentStatus("PAID");
            bookingRepository.save(booking);
        }
        
        return savedPayment;
    }
    
    public Payment updatePayment(String id, Payment paymentDetails) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);
        
        if (optionalPayment.isPresent()) {
            Payment existingPayment = optionalPayment.get();
            
            if (paymentDetails.getStatus() != null) {
                existingPayment.setStatus(paymentDetails.getStatus());
                
                // Update booking payment status if payment is successful
                if ("completed".equalsIgnoreCase(paymentDetails.getStatus()) && existingPayment.getBooking() != null) {
                    Booking booking = existingPayment.getBooking();
                    booking.setPaymentStatus("PAID");
                    bookingRepository.save(booking);
                }
            }
            
            existingPayment.setUpdatedAt(LocalDateTime.now());
            
            return paymentRepository.save(existingPayment);
        }
        
        return null;
    }
    
    public boolean deletePayment(String id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Simulate payment processing
    public Payment processPayment(Payment payment) {
        // In a real application, this would integrate with a payment gateway
        // For demo purposes, we'll just set the payment as completed
        payment.setStatus("completed");
        payment.setTransactionId("txn_" + UUID.randomUUID().toString().substring(0, 8));
        payment.setCreatedAt(LocalDateTime.now());
        payment.setUpdatedAt(LocalDateTime.now());
        
        Payment savedPayment = paymentRepository.save(payment);
        
        // Update booking payment status
        if (payment.getBooking() != null) {
            Booking booking = payment.getBooking();
            booking.setPaymentStatus("PAID");
            bookingRepository.save(booking);
        }
        
        return savedPayment;
    }
}
