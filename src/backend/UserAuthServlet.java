
package com.weddingvendor.backend;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet handling user authentication
 */
@WebServlet("/api/auth/*")
public class UserAuthServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    // Simple in-memory user store - in a real app this would be a database
    private static final Map<String, UserAccount> userAccounts = new HashMap<>();
    
    // Initialize with demo accounts
    static {
        // Client account
        UserAccount clientAccount = new UserAccount();
        clientAccount.setEmail("client@example.com");
        clientAccount.setPassword("password");
        clientAccount.setName("Demo Client");
        clientAccount.setRole("user");
        userAccounts.put(clientAccount.getEmail(), clientAccount);
        
        // Vendor account
        UserAccount vendorAccount = new UserAccount();
        vendorAccount.setEmail("vendor@example.com");
        vendorAccount.setPassword("password");
        vendorAccount.setName("Demo Vendor");
        vendorAccount.setRole("vendor");
        userAccounts.put(vendorAccount.getEmail(), vendorAccount);
        
        // Admin account
        UserAccount adminAccount = new UserAccount();
        adminAccount.setEmail("admin@example.com");
        adminAccount.setPassword("password");
        adminAccount.setName("System Administrator");
        adminAccount.setRole("admin");
        userAccounts.put(adminAccount.getEmail(), adminAccount);
    }
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserAuthServlet() {
        super();
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            if (pathInfo.endsWith("/login")) {
                // Handle login request
                LoginRequest loginRequest = gson.fromJson(request.getReader(), LoginRequest.class);
                String email = loginRequest.getEmail();
                String password = loginRequest.getPassword();
                String role = loginRequest.getRole();
                
                UserAccount account = userAccounts.get(email);
                
                if (account != null && account.getPassword().equals(password) && 
                    (role == null || account.getRole().equals(role))) {
                    
                    // Create session
                    HttpSession session = request.getSession(true);
                    session.setAttribute("user", account);
                    
                    // Return success response
                    LoginResponse loginResponse = new LoginResponse();
                    loginResponse.setSuccess(true);
                    loginResponse.setName(account.getName());
                    loginResponse.setRole(account.getRole());
                    
                    out.print(gson.toJson(loginResponse));
                } else {
                    // Return failure response
                    LoginResponse loginResponse = new LoginResponse();
                    loginResponse.setSuccess(false);
                    loginResponse.setMessage("Invalid credentials");
                    
                    out.print(gson.toJson(loginResponse));
                }
            } else if (pathInfo.endsWith("/register")) {
                // Handle registration (simplified for demo)
                RegisterRequest registerRequest = gson.fromJson(request.getReader(), RegisterRequest.class);
                
                // Check if user already exists
                if (userAccounts.containsKey(registerRequest.getEmail())) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    out.print(gson.toJson(new ErrorResponse("User already exists")));
                    return;
                }
                
                // Create new user account
                UserAccount newAccount = new UserAccount();
                newAccount.setEmail(registerRequest.getEmail());
                newAccount.setPassword(registerRequest.getPassword());
                newAccount.setName(registerRequest.getName());
                newAccount.setRole(registerRequest.getRole());
                
                userAccounts.put(newAccount.getEmail(), newAccount);
                
                // Return success response
                out.print(gson.toJson(new SuccessResponse("User registered successfully")));
            } else if (pathInfo.endsWith("/logout")) {
                // Handle logout
                HttpSession session = request.getSession(false);
                if (session != null) {
                    session.invalidate();
                }
                
                out.print(gson.toJson(new SuccessResponse("Logged out successfully")));
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ErrorResponse("Invalid endpoint")));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error processing request: " + e.getMessage())));
            e.printStackTrace();
        }
        
        out.flush();
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
            if (pathInfo != null && pathInfo.endsWith("/status")) {
                // Check if user is logged in
                HttpSession session = request.getSession(false);
                
                if (session != null && session.getAttribute("user") != null) {
                    UserAccount account = (UserAccount) session.getAttribute("user");
                    
                    // Return user info
                    UserInfoResponse userInfo = new UserInfoResponse();
                    userInfo.setAuthenticated(true);
                    userInfo.setName(account.getName());
                    userInfo.setEmail(account.getEmail());
                    userInfo.setRole(account.getRole());
                    
                    out.print(gson.toJson(userInfo));
                } else {
                    // Return not authenticated
                    UserInfoResponse userInfo = new UserInfoResponse();
                    userInfo.setAuthenticated(false);
                    
                    out.print(gson.toJson(userInfo));
                }
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ErrorResponse("Invalid endpoint")));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ErrorResponse("Error processing request: " + e.getMessage())));
            e.printStackTrace();
        }
        
        out.flush();
    }
    
    // Helper classes for request/response
    static class UserAccount {
        private String email;
        private String password;
        private String name;
        private String role;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
    
    static class LoginRequest {
        private String email;
        private String password;
        private String role;
        
        public String getEmail() { return email; }
        public String getPassword() { return password; }
        public String getRole() { return role; }
    }
    
    static class LoginResponse {
        private boolean success;
        private String name;
        private String role;
        private String message;
        
        public void setSuccess(boolean success) { this.success = success; }
        public void setName(String name) { this.name = name; }
        public void setRole(String role) { this.role = role; }
        public void setMessage(String message) { this.message = message; }
    }
    
    static class RegisterRequest {
        private String email;
        private String password;
        private String name;
        private String role;
        
        public String getEmail() { return email; }
        public String getPassword() { return password; }
        public String getName() { return name; }
        public String getRole() { return role; }
    }
    
    static class UserInfoResponse {
        private boolean authenticated;
        private String name;
        private String email;
        private String role;
        
        public void setAuthenticated(boolean authenticated) { this.authenticated = authenticated; }
        public void setName(String name) { this.name = name; }
        public void setEmail(String email) { this.email = email; }
        public void setRole(String role) { this.role = role; }
    }
    
    static class SuccessResponse {
        private String message;
        
        public SuccessResponse(String message) {
            this.message = message;
        }
    }
    
    static class ErrorResponse {
        private String error;
        
        public ErrorResponse(String error) {
            this.error = error;
        }
    }
}
