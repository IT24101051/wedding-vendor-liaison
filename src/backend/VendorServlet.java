package com.weddingvendor.backend;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet to handle vendor-related operations
 */
@WebServlet("/api/vendors/*")
public class VendorServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final VendorSystem vendorSystem = new VendorSystem();
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    /**
     * Handle GET requests
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            System.out.println("Received GET request for vendors: " + pathInfo);
            
            if (pathInfo == null || pathInfo.equals("/")) {
                // Get all vendors or apply sorting/filtering
                String sortBy = request.getParameter("sortBy");
                String category = request.getParameter("category");
                String location = request.getParameter("location");
                String search = request.getParameter("search");
                
                List<Vendor> vendorList;
                
                if (search != null && !search.isEmpty()) {
                    vendorList = vendorSystem.searchVendors(search);
                    System.out.println("Searching vendors with query: " + search + ", found: " + vendorList.size());
                } else if (category != null && !category.equals("all")) {
                    vendorList = vendorSystem.getVendorsByCategory(category);
                    System.out.println("Filtering vendors by category: " + category + ", found: " + vendorList.size());
                } else if (location != null && !location.equals("all")) {
                    vendorList = vendorSystem.getVendorsByLocation(location);
                    System.out.println("Filtering vendors by location: " + location + ", found: " + vendorList.size());
                } else if (sortBy != null) {
                    switch (sortBy) {
                        case "priceAsc":
                            vendorList = vendorSystem.getVendorsSortedByPrice();
                            System.out.println("Sorted vendors by price (ascending), found: " + vendorList.size());
                            break;
                        case "priceDesc":
                            vendorList = vendorSystem.getVendorsSortedByPriceDesc();
                            System.out.println("Sorted vendors by price (descending), found: " + vendorList.size());
                            break;
                        case "rating":
                            vendorList = vendorSystem.getVendorsSortedByRating();
                            System.out.println("Sorted vendors by rating, found: " + vendorList.size());
                            break;
                        default:
                            vendorList = vendorSystem.getAllVendors();
                            System.out.println("Getting all vendors, found: " + vendorList.size());
                    }
                } else {
                    vendorList = vendorSystem.getAllVendors();
                    System.out.println("Getting all vendors, found: " + vendorList.size());
                }
                
                out.print(gson.toJson(vendorList));
            } else {
                // Get vendor by ID
                String vendorId = pathInfo.substring(1);
                Vendor vendor = vendorSystem.getVendorById(vendorId);
                
                if (vendor != null) {
                    System.out.println("Found vendor by ID: " + vendorId);
                    out.print(gson.toJson(vendor));
                } else {
                    System.out.println("Vendor not found with ID: " + vendorId);
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    out.print(gson.toJson(new ErrorResponse("Vendor not found")));
                }
            }
        } catch (Exception e) {
            System.err.println("Error in vendor servlet: " + e.getMessage());
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Internal server error: " + e.getMessage())));
        }
    }
    
    /**
     * Handle POST requests to create a new vendor
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        StringBuilder buffer = new StringBuilder();
        String line;
        try {
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            
            Vendor newVendor = gson.fromJson(buffer.toString(), Vendor.class);
            String vendorId = vendorSystem.addVendor(newVendor);
            
            response.setStatus(HttpServletResponse.SC_CREATED);
            PrintWriter out = response.getWriter();
            out.print(gson.toJson(new SuccessResponse(vendorId)));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            PrintWriter out = response.getWriter();
            out.print(gson.toJson(new ErrorResponse("Invalid vendor data: " + e.getMessage())));
        }
    }
    
    /**
     * Handle PUT requests to update a vendor
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(gson.toJson(new ErrorResponse("Vendor ID is required")));
            return;
        }
        
        String vendorId = pathInfo.substring(1);
        
        StringBuilder buffer = new StringBuilder();
        String line;
        try {
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            
            Vendor updatedVendor = gson.fromJson(buffer.toString(), Vendor.class);
            boolean success = vendorSystem.updateVendor(vendorId, updatedVendor);
            
            if (success) {
                out.print(gson.toJson(new SuccessResponse("Vendor updated successfully")));
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ErrorResponse("Vendor not found")));
            }
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(gson.toJson(new ErrorResponse("Invalid vendor data: " + e.getMessage())));
        }
    }
    
    /**
     * Handle DELETE requests to remove a vendor
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(gson.toJson(new ErrorResponse("Vendor ID is required")));
            return;
        }
        
        String vendorId = pathInfo.substring(1);
        boolean success = vendorSystem.deleteVendor(vendorId);
        
        if (success) {
            out.print(gson.toJson(new SuccessResponse("Vendor deleted successfully")));
        } else {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print(gson.toJson(new ErrorResponse("Vendor not found")));
        }
    }
    
    // Helper classes for JSON responses
    private static class SuccessResponse {
        private final String status = "success";
        private final Object data;
        
        public SuccessResponse(Object data) {
            this.data = data;
        }
    }
    
    private static class ErrorResponse {
        private final String status = "error";
        private final String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}
