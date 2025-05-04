
package com.weddingvendor.backend;

import java.io.IOException;
import java.io.PrintWriter;
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
 * Servlet handling payment gateway operations
 */
@WebServlet("/api/payments/*")
public class PaymentGatewayServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private static PaymentSystem paymentSystem = new PaymentSystem();
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PaymentGatewayServlet() {
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
                // Get all payments
                out.print(gson.toJson(paymentSystem.getAllPayments()));
            } else if (pathInfo.startsWith("/user/")) {
                // Get payments for a specific user
                String userId = pathInfo.substring(6);
                out.print(gson.toJson(paymentSystem.getUserPayments(userId)));
            } else if (pathInfo.startsWith("/booking/")) {
                // Get payment for a specific booking
                String bookingId = pathInfo.substring(9);
                Payment payment = paymentSystem.getPaymentByBookingId(bookingId);
                if (payment != null) {
                    out.print(gson.toJson(payment));
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.print(gson.toJson(new ErrorResponse("Payment not found for booking: " + bookingId)));
                }
            } else {
                // Get specific payment by ID
                String paymentId = pathInfo.substring(1);
                Payment payment = paymentSystem.getPaymentById(paymentId);
                if (payment != null) {
                    out.print(gson.toJson(payment));
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.print(gson.toJson(new ErrorResponse("Payment not found with ID: " + paymentId)));
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error retrieving payment information: " + e.getMessage())));
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
            // Parse payment request from request body
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            PaymentRequest paymentRequest = gson.fromJson(requestBody, PaymentRequest.class);
            
            // Process payment
            Payment payment = paymentSystem.processPayment(paymentRequest);
            
            // Update booking payment status if successful
            if (payment.getStatus().equals("completed")) {
                BookingSystem bookingSystem = new BookingSystem();
                Booking booking = bookingSystem.getBookingById(paymentRequest.getBookingId());
                if (booking != null) {
                    booking.setPaymentStatus("paid");
                    bookingSystem.updateBooking(booking.getId(), booking);
                }
            }
            
            out.print(gson.toJson(payment));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error processing payment: " + e.getMessage())));
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
                out.print(gson.toJson(new ErrorResponse("Payment ID is required")));
                return;
            }
            
            String paymentId = pathInfo.substring(1);
            
            // Parse payment updates from request body
            String requestBody = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Payment updates = gson.fromJson(requestBody, Payment.class);
            
            // Update payment
            boolean updated = paymentSystem.updatePayment(paymentId, updates);
            
            if (updated) {
                out.print(gson.toJson(new SuccessResponse("Payment updated successfully", paymentId)));
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ErrorResponse("Payment not found with ID: " + paymentId)));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error updating payment: " + e.getMessage())));
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
