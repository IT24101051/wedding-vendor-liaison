
package com.weddingvendor.backend;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet handling vendor booking operations
 */
@WebServlet("/api/vendor/bookings/*")
public class VendorBookingServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static BookingSystem bookingSystem = new BookingSystem();
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public VendorBookingServlet() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // Get all bookings
                List<Booking> allBookings = bookingSystem.getAllBookings();
                out.print(gson.toJson(allBookings));
                System.out.println("Returning all bookings: " + allBookings.size());
            } else if (pathInfo.startsWith("/user/")) {
                // Get bookings for a specific user
                String userId = pathInfo.substring(6);
                List<Booking> userBookings = bookingSystem.getUserBookings(userId);
                out.print(gson.toJson(userBookings));
                System.out.println("Found " + userBookings.size() + " bookings for user " + userId);
            } else {
                // Check if it's a specific booking ID request
                if (pathInfo.substring(1).startsWith("booking")) {
                    // Get a specific booking
                    String bookingId = pathInfo.substring(1);
                    Booking booking = bookingSystem.getBookingById(bookingId);
                    
                    if (booking != null) {
                        out.print(gson.toJson(booking));
                        System.out.println("Found booking: " + bookingId);
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print(gson.toJson(new ErrorResponse("Booking not found: " + bookingId)));
                    }
                } else {
                    // Get specific vendor bookings
                    String vendorId = pathInfo.substring(1);
                    
                    // Normalize vendor ID format (ensure it starts with "vendor")
                    if (!vendorId.startsWith("vendor")) {
                        vendorId = "vendor" + vendorId;
                    }
                    
                    List<Booking> vendorBookings = bookingSystem.getVendorBookings(vendorId);
                    out.print(gson.toJson(vendorBookings));
                    System.out.println("Found " + vendorBookings.size() + " bookings for vendor " + vendorId);
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error retrieving bookings: " + e.getMessage())));
            e.printStackTrace();
        }
        out.flush();
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        PrintWriter out = response.getWriter();
        
        try {
            // Parse booking from request body
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Booking booking = gson.fromJson(requestBody, Booking.class);
            
            // Normalize vendor ID format
            if (!booking.getVendorId().startsWith("vendor")) {
                booking.setVendorId("vendor" + booking.getVendorId());
            }
            
            // Create booking
            String bookingId = bookingSystem.createBooking(booking);
            out.print(gson.toJson(new SuccessResponse("Booking created successfully", bookingId)));
            
            System.out.println("Created new booking with ID: " + bookingId + " for vendor: " + booking.getVendorId());
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error creating booking: " + e.getMessage())));
            e.printStackTrace();
        }
        out.flush();
    }
    
    /**
     * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(gson.toJson(new ErrorResponse("Booking ID is required")));
                return;
            }
            
            String bookingId = pathInfo.substring(1);
            
            // Parse booking updates from request body
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Booking updates = gson.fromJson(requestBody, Booking.class);
            
            // Update booking
            boolean updated = bookingSystem.updateBooking(bookingId, updates);
            
            if (updated) {
                out.print(gson.toJson(new SuccessResponse("Booking updated successfully", bookingId)));
                System.out.println("Updated booking with ID: " + bookingId);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ErrorResponse("Booking not found with ID: " + bookingId)));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error updating booking: " + e.getMessage())));
            e.printStackTrace();
        }
        out.flush();
    }
    
    /**
     * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(gson.toJson(new ErrorResponse("Booking ID is required")));
                return;
            }
            
            String bookingId = pathInfo.substring(1);
            
            // Delete booking
            boolean deleted = bookingSystem.deleteBooking(bookingId);
            
            if (deleted) {
                out.print(gson.toJson(new SuccessResponse("Booking deleted successfully", bookingId)));
                System.out.println("Deleted booking with ID: " + bookingId);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ErrorResponse("Booking not found with ID: " + bookingId)));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error deleting booking: " + e.getMessage())));
            e.printStackTrace();
        }
        out.flush();
    }
    
    // Response classes for JSON formatting
    class SuccessResponse {
        private String message;
        private String id;
        
        public SuccessResponse(String message, String id) {
            this.message = message;
            this.id = id;
        }
    }
    
    class ErrorResponse {
        private String error;
        
        public ErrorResponse(String error) {
            this.error = error;
        }
    }
}
