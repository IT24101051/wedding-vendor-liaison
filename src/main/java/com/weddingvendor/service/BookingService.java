
package com.weddingvendor.service;

import com.weddingvendor.model.Booking;
import com.weddingvendor.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public Optional<Booking> getBookingById(String id) {
        return bookingRepository.findById(id);
    }
    
    public Booking createBooking(Booking booking) {
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }
    
    public Booking updateBooking(String id, Booking bookingDetails) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        
        if (optionalBooking.isPresent()) {
            Booking existingBooking = optionalBooking.get();
            existingBooking.setClientName(bookingDetails.getClientName());
            existingBooking.setClientEmail(bookingDetails.getClientEmail());
            existingBooking.setClientPhone(bookingDetails.getClientPhone());
            existingBooking.setEventDate(bookingDetails.getEventDate());
            existingBooking.setStatus(bookingDetails.getStatus());
            existingBooking.setPaymentStatus(bookingDetails.getPaymentStatus());
            existingBooking.setAmount(bookingDetails.getAmount());
            existingBooking.setNotes(bookingDetails.getNotes());
            existingBooking.setUpdatedAt(LocalDateTime.now());
            
            return bookingRepository.save(existingBooking);
        }
        
        return null;
    }
    
    public boolean deleteBooking(String id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Booking> getClientBookings(String clientId) {
        return bookingRepository.findByClientId(clientId);
    }
    
    public List<Booking> getVendorBookings(String vendorId) {
        return bookingRepository.findByVendorId(vendorId);
    }
    
    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }
}
