
package com.weddingvendor.backend;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet handling user authentication (login, registration, etc.)
 */
@WebServlet("/api/auth/*")
public class AuthenticationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    
    // Simple in-memory user store - in a real app this would be a database
    private static final Map<String, User> usersByEmail = new HashMap<>();
    private static final Map<String, User> usersById = new HashMap<>();
    
    // Initialize with demo accounts
    static {
        // Client account
        User clientUser = new User();
        clientUser.setId(UUID.randomUUID().toString());
        clientUser.setEmail("client@example.com");
        clientUser.setPassword("password"); // In a real app, this would be hashed
        clientUser.setName("Demo Client");
        clientUser.setRole("user");
        usersByEmail.put(clientUser.getEmail(), clientUser);
        usersById.put(clientUser.getId(), clientUser);
        
        // Vendor account
        User vendorUser = new User();
        vendorUser.setId(UUID.randomUUID().toString());
        vendorUser.setEmail("vendor@example.com");
        vendorUser.setPassword("password"); // In a real app, this would be hashed
        vendorUser.setName("Demo Vendor");
        vendorUser.setRole("vendor");
        usersByEmail.put(vendorUser.getEmail(), vendorUser);
        usersById.put(vendorUser.getId(), vendorUser);
        
        // Admin account
        User adminUser = new User();
        adminUser.setId(UUID.randomUUID().toString());
        adminUser.setEmail("admin@example.com");
        adminUser.setPassword("password"); // In a real app, this would be hashed
        adminUser.setName("System Administrator");
        adminUser.setRole("admin");
        usersByEmail.put(adminUser.getEmail(), adminUser);
        usersById.put(adminUser.getId(), adminUser);
    }
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AuthenticationServlet() {
        super();
    }

    /**
     * Handle POST requests for login, register, etc.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            if (pathInfo.endsWith("/login")) {
                handleLogin(request, response, out);
            } else if (pathInfo.endsWith("/register")) {
                handleRegistration(request, response, out);
            } else if (pathInfo.endsWith("/logout")) {
                handleLogout(request, response, out);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ApiResponse(false, "Invalid endpoint")));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ApiResponse(false, "Error processing request: " + e.getMessage())));
            e.printStackTrace();
        }
        
        out.flush();
    }
    
    /**
     * Handle GET requests for checking auth status
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String pathInfo = request.getPathInfo();
        PrintWriter out = response.getWriter();
        
        try {
            if (pathInfo.endsWith("/status")) {
                handleStatusCheck(request, response, out);
            } else {
                response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                out.print(gson.toJson(new ApiResponse(false, "Invalid endpoint")));
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            out.print(gson.toJson(new ApiResponse(false, "Error processing request: " + e.getMessage())));
            e.printStackTrace();
        }
        
        out.flush();
    }
    
    private void handleLogin(HttpServletRequest request, HttpServletResponse response, PrintWriter out) throws IOException {
        LoginRequest loginRequest = gson.fromJson(request.getReader(), LoginRequest.class);
        
        User user = usersByEmail.get(loginRequest.getEmail());
        
        if (user != null && user.getPassword().equals(loginRequest.getPassword()) && 
            (loginRequest.getRole() == null || user.getRole().equals(loginRequest.getRole()))) {
            
            // Create user session
            HttpSession session = request.getSession(true);
            session.setAttribute("userId", user.getId());
            session.setAttribute("userRole", user.getRole());
            
            // Return success with user info (never send password back)
            UserResponse userResponse = new UserResponse();
            userResponse.setId(user.getId());
            userResponse.setEmail(user.getEmail());
            userResponse.setName(user.getName());
            userResponse.setRole(user.getRole());
            
            response.setStatus(HttpServletResponse.SC_OK);
            out.print(gson.toJson(new ApiResponse(true, "Login successful", userResponse)));
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.print(gson.toJson(new ApiResponse(false, "Invalid email or password")));
        }
    }
    
    private void handleRegistration(HttpServletRequest request, HttpServletResponse response, PrintWriter out) throws IOException {
        RegisterRequest registerRequest = gson.fromJson(request.getReader(), RegisterRequest.class);
        
        // Check if email already exists
        if (usersByEmail.containsKey(registerRequest.getEmail())) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(gson.toJson(new ApiResponse(false, "Email already registered")));
            return;
        }
        
        // Create new user
        User newUser = new User();
        newUser.setId(UUID.randomUUID().toString());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(registerRequest.getPassword()); // In a real app, this would be hashed
        newUser.setName(registerRequest.getName());
        newUser.setRole(registerRequest.getRole());
        
        // Save to our "database"
        usersByEmail.put(newUser.getEmail(), newUser);
        usersById.put(newUser.getId(), newUser);
        
        // Create session for the new user
        HttpSession session = request.getSession(true);
        session.setAttribute("userId", newUser.getId());
        session.setAttribute("userRole", newUser.getRole());
        
        // Return success with user info (never send password back)
        UserResponse userResponse = new UserResponse();
        userResponse.setId(newUser.getId());
        userResponse.setEmail(newUser.getEmail());
        userResponse.setName(newUser.getName());
        userResponse.setRole(newUser.getRole());
        
        response.setStatus(HttpServletResponse.SC_CREATED);
        out.print(gson.toJson(new ApiResponse(true, "Registration successful", userResponse)));
    }
    
    private void handleLogout(HttpServletRequest request, HttpServletResponse response, PrintWriter out) throws IOException {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        
        response.setStatus(HttpServletResponse.SC_OK);
        out.print(gson.toJson(new ApiResponse(true, "Logged out successfully")));
    }
    
    private void handleStatusCheck(HttpServletRequest request, HttpServletResponse response, PrintWriter out) throws IOException {
        HttpSession session = request.getSession(false);
        
        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            User user = usersById.get(userId);
            
            if (user != null) {
                // User is authenticated, return user info
                UserResponse userResponse = new UserResponse();
                userResponse.setId(user.getId());
                userResponse.setEmail(user.getEmail());
                userResponse.setName(user.getName());
                userResponse.setRole(user.getRole());
                
                response.setStatus(HttpServletResponse.SC_OK);
                out.print(gson.toJson(new ApiResponse(true, "Authenticated", userResponse)));
                return;
            }
        }
        
        // User is not authenticated
        response.setStatus(HttpServletResponse.SC_OK);
        out.print(gson.toJson(new ApiResponse(false, "Not authenticated")));
    }
    
    // Model classes
    static class User {
        private String id;
        private String email;
        private String password;
        private String name;
        private String role;
        
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
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
    
    static class UserResponse {
        private String id;
        private String email;
        private String name;
        private String role;
        
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
    
    static class ApiResponse {
        private boolean success;
        private String message;
        private Object data;
        
        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
        
        public ApiResponse(boolean success, String message, Object data) {
            this.success = success;
            this.message = message;
            this.data = data;
        }
    }
}
