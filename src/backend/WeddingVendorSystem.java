package com.weddingvendor.backend;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Core backend system for the Wedding Vendor Liaison application.
 * This Java implementation demonstrates OOP concepts like:
 * - Inheritance
 * - Encapsulation
 * - Polymorphism
 * - Abstraction
 * - Interfaces
 */
public class WeddingVendorSystem {
    
    private static BookingSystem bookingSystem;
    private static AuthenticationService authService;
    private static PaymentProcessor paymentProcessor;
    private static NotificationService notificationService;
    private static MessagingService messagingService;
    private static VendorService vendorService;
    private static ReviewSystem reviewSystem;
    private static DataPersistenceManager dataPersistenceManager;
    
    public static void main(String[] args) {
        // Initialize the system components
        initialize();
        
        // Register sample users
        registerSampleUsers();
        
        // Sample booking flow
        demonstrateBookingFlow();
        
        // Start API server (in a real application, this would start a web server)
        startAPIServer();
    }
    
    private static void initialize() {
        bookingSystem = new BookingSystem();
        authService = new AuthenticationService();
        paymentProcessor = new PaymentProcessor();
        notificationService = new NotificationService();
        messagingService = new MessagingService();
        vendorService = new VendorService();
        reviewSystem = new ReviewSystem();
        dataPersistenceManager = new DataPersistenceManager();
        
        System.out.println("Wedding Vendor System initialized successfully");
    }
    
    private static void registerSampleUsers() {
        User client = new Client("client@example.com", "password", "Demo Client");
        User vendor = new Vendor("vendor@example.com", "password", "Elegant Moments Photography");
        User admin = new Admin("admin@example.com", "admin123", "Admin User");
        
        authService.registerUser(client);
        authService.registerUser(vendor);
        authService.registerUser(admin);
        
        // Add services for the vendor
        Service photographyService = new Service(vendor.getId(), "Premium Wedding Photography", 
            "Professional photography for your special day", 2500.00);
        Service videoService = new Service(vendor.getId(), "Wedding Videography", 
            "4K video coverage with drone footage", 3000.00);
            
        ((Vendor)vendor).addService(photographyService);
        ((Vendor)vendor).addService(videoService);
        
        vendorService.addVendor((Vendor)vendor);
        
        System.out.println("Sample users registered successfully");
    }
    
    private static void demonstrateBookingFlow() {
        if (authService.authenticateUser("client@example.com", "password")) {
            User client = authService.getUserByEmail("client@example.com");
            User vendor = authService.getUserByEmail("vendor@example.com");
            
            // Create a booking
            Booking booking = new Booking();
            booking.setClientId(client.getId());
            booking.setVendorId(vendor.getId());
            booking.setServiceName("Premium Wedding Photography");
            booking.setAmount(2500.00);
            booking.setEventDate(LocalDateTime.now().plusMonths(3));
            
            String bookingId = bookingSystem.createBooking(booking);
            System.out.println("Booking created with ID: " + bookingId);
            
            // Process payment
            Payment payment = new Payment();
            payment.setBookingId(bookingId);
            payment.setAmount(booking.getAmount());
            payment.setPaymentMethod(PaymentMethod.CREDIT_CARD);
            
            if (paymentProcessor.processPayment(payment)) {
                booking.setStatus(BookingStatus.CONFIRMED);
                bookingSystem.updateBooking(booking);
                
                // Send notifications
                notificationService.sendNotification(
                    new Notification(client.getId(), "Booking Confirmed", 
                    "Your booking has been confirmed and payment processed.")
                );
                
                notificationService.sendNotification(
                    new Notification(vendor.getId(), "New Booking", 
                    "You have a new confirmed booking from " + client.getName())
                );
                
                // Add to client's booking list
                ((Client)client).addBooking(bookingId);
                
                // Add to vendor's booking list
                ((Vendor)vendor).addBooking(bookingId);
                
                // Create a message thread between client and vendor
                String threadId = messagingService.createThread(client.getId(), vendor.getId());
                messagingService.sendMessage(threadId, client.getId(), 
                    "Hello! I'm excited about our upcoming photo session!");
                
                System.out.println("Booking confirmed, notifications sent, and communication initiated");
                
                // Save all data changes
                dataPersistenceManager.saveChanges();
            }
        }
    }
    
    private static void startAPIServer() {
        APIServer apiServer = new APIServer(8080, authService, bookingSystem, 
            paymentProcessor, notificationService, messagingService, vendorService, reviewSystem);
        apiServer.start();
        System.out.println("API Server started on port 8080");
    }
}

// AUTHENTICATION SYSTEM

/**
 * Base User class demonstrating inheritance and encapsulation
 */
abstract class User {
    private String id;
    private String email;
    private String password;
    private String name;
    private LocalDateTime createdAt;
    
    public User(String email, String password, String name) {
        this.id = UUID.randomUUID().toString();
        this.email = email;
        this.password = password;
        this.name = name;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getEmail() { return email; }
    public String getName() { return name; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    
    // Protected methods for password validation
    protected boolean validatePassword(String inputPassword) {
        return this.password.equals(inputPassword);
    }
    
    // Abstract method demonstrating polymorphism
    public abstract String getUserType();
    
    // Additional method for validation
    public boolean isValid() {
        return email != null && !email.isEmpty() && password != null && !password.isEmpty();
    }
}

class Client extends User {
    private List<String> bookingIds;
    
    public Client(String email, String password, String name) {
        super(email, password, name);
        this.bookingIds = new ArrayList<>();
    }
    
    public void addBooking(String bookingId) {
        bookingIds.add(bookingId);
    }
    
    public List<String> getBookingIds() {
        return new ArrayList<>(bookingIds);
    }
    
    @Override
    public String getUserType() {
        return "client";
    }
}

class Vendor extends User {
    private String businessName;
    private String description;
    private List<Service> services;
    private List<String> bookingIds;
    
    public Vendor(String email, String password, String name) {
        super(email, password, name);
        this.businessName = name;
        this.services = new ArrayList<>();
        this.bookingIds = new ArrayList<>();
    }
    
    public void addService(Service service) {
        services.add(service);
    }
    
    public List<Service> getServices() {
        return new ArrayList<>(services);
    }
    
    public void addBooking(String bookingId) {
        bookingIds.add(bookingId);
    }
    
    @Override
    public String getUserType() {
        return "vendor";
    }
}

class Admin extends User {
    private List<String> permissions;
    
    public Admin(String email, String password, String name) {
        super(email, password, name);
        this.permissions = new ArrayList<>(Arrays.asList("MANAGE_USERS", "MANAGE_BOOKINGS", "MANAGE_PAYMENTS"));
    }
    
    public boolean hasPermission(String permission) {
        return permissions.contains(permission);
    }
    
    @Override
    public String getUserType() {
        return "admin";
    }
}

class AuthenticationService {
    private Map<String, User> usersByEmail;
    private Map<String, User> usersById;
    private Map<String, String> activeTokens;
    
    public AuthenticationService() {
        this.usersByEmail = new HashMap<>();
        this.usersById = new HashMap<>();
        this.activeTokens = new HashMap<>();
    }
    
    public void registerUser(User user) {
        usersByEmail.put(user.getEmail(), user);
        usersById.put(user.getId(), user);
    }
    
    public boolean authenticateUser(String email, String password) {
        User user = usersByEmail.get(email);
        return user != null && user.validatePassword(password);
    }
    
    public String createAuthToken(String email) {
        User user = usersByEmail.get(email);
        if (user != null) {
            String token = UUID.randomUUID().toString();
            activeTokens.put(token, user.getId());
            return token;
        }
        return null;
    }
    
    public User getUserByToken(String token) {
        String userId = activeTokens.get(token);
        return userId != null ? usersById.get(userId) : null;
    }
    
    public void invalidateToken(String token) {
        activeTokens.remove(token);
    }
    
    public User getUserByEmail(String email) {
        return usersByEmail.get(email);
    }
    
    public boolean changePassword(String userId, String oldPassword, String newPassword) {
        User user = usersById.get(userId);
        if (user != null && user.validatePassword(oldPassword)) {
            // In a real implementation, you would update the password here
            System.out.println("Password changed for user: " + user.getEmail());
            return true;
        }
        return false;
    }
    
    public void logoutAllSessions(String userId) {
        activeTokens.entrySet().removeIf(entry -> entry.getValue().equals(userId));
    }
    
    public boolean isTokenValid(String token) {
        return activeTokens.containsKey(token);
    }
}

// BOOKING SYSTEM

enum BookingStatus {
    PENDING, CONFIRMED, COMPLETED, CANCELLED
}

enum PaymentStatus {
    PENDING, PAID, REFUNDED, FAILED
}

class Booking {
    private String id;
    private String clientId;
    private String vendorId;
    private String serviceName;
    private LocalDateTime eventDate;
    private double amount;
    private BookingStatus status;
    private PaymentStatus paymentStatus;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Booking() {
        this.id = UUID.randomUUID().toString();
        this.status = BookingStatus.PENDING;
        this.paymentStatus = PaymentStatus.PENDING;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = this.createdAt;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }
    public String getVendorId() { return vendorId; }
    public void setVendorId(String vendorId) { this.vendorId = vendorId; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { 
        this.status = status; 
        this.updatedAt = LocalDateTime.now();
    }
    public PaymentStatus getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { 
        this.paymentStatus = paymentStatus; 
        this.updatedAt = LocalDateTime.now();
    }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}

class Service {
    private String id;
    private String vendorId;
    private String name;
    private String description;
    private double price;
    private boolean isActive;
    
    public Service(String vendorId, String name, String description, double price) {
        this.id = UUID.randomUUID().toString();
        this.vendorId = vendorId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.isActive = true;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getVendorId() { return vendorId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}

class BookingSystem {
    private Map<String, Booking> bookings;
    private Map<String, List<String>> clientBookings;
    private Map<String, List<String>> vendorBookings;
    
    public BookingSystem() {
        this.bookings = new ConcurrentHashMap<>();
        this.clientBookings = new ConcurrentHashMap<>();
        this.vendorBookings = new ConcurrentHashMap<>();
    }
    
    public String createBooking(Booking booking) {
        bookings.put(booking.getId(), booking);
        
        // Update client bookings index
        clientBookings.computeIfAbsent(booking.getClientId(), k -> new ArrayList<>())
                      .add(booking.getId());
        
        // Update vendor bookings index
        vendorBookings.computeIfAbsent(booking.getVendorId(), k -> new ArrayList<>())
                      .add(booking.getId());
        
        return booking.getId();
    }
    
    public Booking getBooking(String bookingId) {
        return bookings.get(bookingId);
    }
    
    public List<Booking> getClientBookings(String clientId) {
        List<String> bookingIds = clientBookings.getOrDefault(clientId, new ArrayList<>());
        return bookingIds.stream()
                        .map(bookings::get)
                        .collect(Collectors.toList());
    }
    
    public List<Booking> getVendorBookings(String vendorId) {
        List<String> bookingIds = vendorBookings.getOrDefault(vendorId, new ArrayList<>());
        return bookingIds.stream()
                        .map(bookings::get)
                        .collect(Collectors.toList());
    }
    
    public void updateBooking(Booking booking) {
        bookings.put(booking.getId(), booking);
    }
    
    public void cancelBooking(String bookingId) {
        Booking booking = bookings.get(bookingId);
        if (booking != null) {
            booking.setStatus(BookingStatus.CANCELLED);
            bookings.put(bookingId, booking);
        }
    }
    
    public List<Booking> searchBookings(Map<String, String> criteria) {
        return bookings.values().stream()
            .filter(booking -> matchesCriteria(booking, criteria))
            .collect(Collectors.toList());
    }
    
    private boolean matchesCriteria(Booking booking, Map<String, String> criteria) {
        for (Map.Entry<String, String> entry : criteria.entrySet()) {
            switch (entry.getKey()) {
                case "status":
                    if (!booking.getStatus().toString().equals(entry.getValue())) {
                        return false;
                    }
                    break;
                case "clientId":
                    if (!booking.getClientId().equals(entry.getValue())) {
                        return false;
                    }
                    break;
                case "vendorId":
                    if (!booking.getVendorId().equals(entry.getValue())) {
                        return false;
                    }
                    break;
                // Add more criteria as needed
            }
        }
        return true;
    }
    
    public List<Booking> getUpcomingBookings(String userId, boolean isVendor) {
        List<String> bookingIds;
        if (isVendor) {
            bookingIds = vendorBookings.getOrDefault(userId, new ArrayList<>());
        } else {
            bookingIds = clientBookings.getOrDefault(userId, new ArrayList<>());
        }
        
        LocalDateTime now = LocalDateTime.now();
        return bookingIds.stream()
            .map(bookings::get)
            .filter(booking -> booking.getEventDate().isAfter(now))
            .sorted(Comparator.comparing(Booking::getEventDate))
            .collect(Collectors.toList());
    }
    
    public Map<String, Integer> getBookingStatistics(String vendorId) {
        List<Booking> vendorAllBookings = getVendorBookings(vendorId);
        
        Map<String, Integer> stats = new HashMap<>();
        stats.put("total", vendorAllBookings.size());
        stats.put("pending", countBookingsByStatus(vendorAllBookings, BookingStatus.PENDING));
        stats.put("confirmed", countBookingsByStatus(vendorAllBookings, BookingStatus.CONFIRMED));
        stats.put("completed", countBookingsByStatus(vendorAllBookings, BookingStatus.COMPLETED));
        stats.put("cancelled", countBookingsByStatus(vendorAllBookings, BookingStatus.CANCELLED));
        
        return stats;
    }
    
    private int countBookingsByStatus(List<Booking> bookings, BookingStatus status) {
        return (int) bookings.stream()
            .filter(booking -> booking.getStatus() == status)
            .count();
    }
}

// PAYMENT SYSTEM

enum PaymentMethod {
    CREDIT_CARD, PAYPAL, BANK_TRANSFER
}

class Payment {
    private String id;
    private String bookingId;
    private double amount;
    private PaymentMethod paymentMethod;
    private PaymentStatus status;
    private String transactionId;
    private LocalDateTime paymentDate;
    
    public Payment() {
        this.id = UUID.randomUUID().toString();
        this.status = PaymentStatus.PENDING;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }
}

// Interface demonstrating abstraction
interface PaymentGateway {
    boolean processPayment(Payment payment);
    boolean refundPayment(Payment payment);
}

class StripeGateway implements PaymentGateway {
    @Override
    public boolean processPayment(Payment payment) {
        // Simulate Stripe API call
        payment.setTransactionId("stripe_" + UUID.randomUUID().toString());
        payment.setStatus(PaymentStatus.PAID);
        payment.setPaymentDate(LocalDateTime.now());
        return true;
    }
    
    @Override
    public boolean refundPayment(Payment payment) {
        // Simulate Stripe refund API call
        payment.setStatus(PaymentStatus.REFUNDED);
        return true;
    }
}

class PayPalGateway implements PaymentGateway {
    @Override
    public boolean processPayment(Payment payment) {
        // Simulate PayPal API call
        payment.setTransactionId("paypal_" + UUID.randomUUID().toString());
        payment.setStatus(PaymentStatus.PAID);
        payment.setPaymentDate(LocalDateTime.now());
        return true;
    }
    
    @Override
    public boolean refundPayment(Payment payment) {
        // Simulate PayPal refund API call
        payment.setStatus(PaymentStatus.REFUNDED);
        return true;
    }
}

class PaymentProcessor {
    private Map<PaymentMethod, PaymentGateway> gateways;
    private Map<String, Payment> payments;
    
    public PaymentProcessor() {
        this.gateways = new HashMap<>();
        this.gateways.put(PaymentMethod.CREDIT_CARD, new StripeGateway());
        this.gateways.put(PaymentMethod.PAYPAL, new PayPalGateway());
        this.payments = new HashMap<>();
    }
    
    public boolean processPayment(Payment payment) {
        PaymentGateway gateway = gateways.get(payment.getPaymentMethod());
        if (gateway != null && gateway.processPayment(payment)) {
            payments.put(payment.getId(), payment);
            return true;
        }
        return false;
    }
    
    public boolean refundPayment(String paymentId) {
        Payment payment = payments.get(paymentId);
        if (payment != null) {
            PaymentGateway gateway = gateways.get(payment.getPaymentMethod());
            return gateway != null && gateway.refundPayment(payment);
        }
        return false;
    }
    
    public Payment getPayment(String paymentId) {
        return payments.get(paymentId);
    }
    
    public List<Payment> getPaymentsByUser(String userId, boolean isVendor) {
        return payments.values().stream()
            .filter(payment -> {
                Booking booking = new BookingSystem().getBooking(payment.getBookingId());
                if (booking != null) {
                    return isVendor ? 
                        booking.getVendorId().equals(userId) : 
                        booking.getClientId().equals(userId);
                }
                return false;
            })
            .collect(Collectors.toList());
    }
    
    public Map<String, Double> getRevenueStatistics(String vendorId, int months) {
        Map<String, Double> revenueByMonth = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        
        for (int i = 0; i < months; i++) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime monthEnd = monthStart.plusMonths(1).minusNanos(1);
            String monthKey = monthStart.getMonth() + " " + monthStart.getYear();
            
            double monthlyRevenue = getPaymentsByUser(vendorId, true).stream()
                .filter(payment -> {
                    LocalDateTime paymentDate = payment.getPaymentDate();
                    return paymentDate != null && 
                           !paymentDate.isBefore(monthStart) && 
                           !paymentDate.isAfter(monthEnd) &&
                           payment.getStatus() == PaymentStatus.PAID;
                })
                .mapToDouble(Payment::getAmount)
                .sum();
            
            revenueByMonth.put(monthKey, monthlyRevenue);
        }
        
        return revenueByMonth;
    }
}

// NOTIFICATION SYSTEM

enum NotificationType {
    INFO, SUCCESS, WARNING, ERROR
}

class Notification {
    private String id;
    private String userId;
    private String title;
    private String message;
    private NotificationType type;
    private boolean isRead;
    private LocalDateTime timestamp;
    private String link;
    
    public Notification(String userId, String title, String message) {
        this.id = UUID.randomUUID().toString();
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.type = NotificationType.INFO;
        this.isRead = false;
        this.timestamp = LocalDateTime.now();
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
}

class NotificationService {
    private Map<String, List<Notification>> userNotifications;
    
    public NotificationService() {
        this.userNotifications = new ConcurrentHashMap<>();
    }
    
    public void sendNotification(Notification notification) {
        userNotifications.computeIfAbsent(notification.getUserId(), k -> new ArrayList<>())
                        .add(notification);
    }
    
    public List<Notification> getUserNotifications(String userId) {
        return new ArrayList<>(userNotifications.getOrDefault(userId, new ArrayList<>()));
    }
    
    public List<Notification> getUnreadNotifications(String userId) {
        return getUserNotifications(userId).stream()
                                         .filter(n -> !n.isRead())
                                         .collect(Collectors.toList());
    }
    
    public void markAsRead(String notificationId, String userId) {
        List<Notification> notifications = userNotifications.get(userId);
        if (notifications != null) {
            notifications.stream()
                       .filter(n -> n.getId().equals(notificationId))
                       .findFirst()
                       .ifPresent(n -> n.setRead(true));
        }
    }
    
    public void markAllAsRead(String userId) {
        List<Notification> notifications = userNotifications.get(userId);
        if (notifications != null) {
            notifications.forEach(n -> n.setRead(true));
        }
    }
    
    public boolean hasUnreadNotifications(String userId) {
        List<Notification> notifications = getUnreadNotifications(userId);
        return !notifications.isEmpty();
    }
    
    public int getUnreadCount(String userId) {
        return getUnreadNotifications(userId).size();
    }
    
    public List<Notification> getPaginatedNotifications(String userId, int page, int pageSize) {
        List<Notification> allNotifications = getUserNotifications(userId);
        int startIndex = page * pageSize;
        int endIndex = Math.min(startIndex + pageSize, allNotifications.size());
        
        if (startIndex >= allNotifications.size()) {
            return new ArrayList<>();
        }
        
        return allNotifications.subList(startIndex, endIndex);
    }
}

// MESSAGING SYSTEM

class Message {
    private String id;
    private String senderId;
    private String receiverId;
    private String content;
    private LocalDateTime timestamp;
    private boolean isRead;
    
    public Message(String senderId, String receiverId, String content) {
        this.id = UUID.randomUUID().toString();
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.timestamp = LocalDateTime.now();
        this.isRead = false;
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getSenderId() { return senderId; }
    public String getReceiverId() { return receiverId; }
    public String getContent() { return content; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { this.isRead = read; }
}

class MessageThread {
    private String id;
    private Set<String> participants;
    private List<Message> messages;
    
    public MessageThread(String... participantIds) {
        this.id = UUID.randomUUID().toString();
        this.participants = new HashSet<>(Arrays.asList(participantIds));
        this.messages = new ArrayList<>();
    }
    
    public String getId() { return id; }
    
    public Set<String> getParticipants() {
        return new HashSet<>(participants);
    }
    
    public void addMessage(Message message) {
        messages.add(message);
    }
    
    public List<Message> getMessages() {
        return new ArrayList<>(messages);
    }
}

class MessagingService {
    private Map<String, MessageThread> threads;
    private Map<String, Set<String>> userThreads;
    
    public MessagingService() {
        this.threads = new HashMap<>();
        this.userThreads = new HashMap<>();
    }
    
    public String createThread(String... participantIds) {
        MessageThread thread = new MessageThread(participantIds);
        threads.put(thread.getId(), thread);
        
        // Update user-thread mappings
        for (String userId : participantIds) {
            userThreads.computeIfAbsent(userId, k -> new HashSet<>())
                      .add(thread.getId());
        }
        
        return thread.getId();
    }
    
    public void sendMessage(String threadId, String senderId, String content) {
        MessageThread thread = threads.get(threadId);
        if (thread != null && thread.getParticipants().contains(senderId)) {
            Set<String> recipients = thread.getParticipants();
            recipients.remove(senderId);
            
            for (String recipientId : recipients) {
                Message message = new Message(senderId, recipientId, content);
                thread.addMessage(message);
            }
        }
    }
    
    public List<MessageThread> getUserThreads(String userId) {
        Set<String> threadIds = userThreads.getOrDefault(userId, new HashSet<>());
        return threadIds.stream()
                      .map(threads::get)
                      .collect(Collectors.toList());
    }
    
    public List<Message> getThreadMessages(String threadId) {
        MessageThread thread = threads.get(threadId);
        return thread != null ? thread.getMessages() : new ArrayList<>();
    }
    
    public List<Message> getUnreadMessages(String userId) {
        List<MessageThread> userThreadsList = getUserThreads(userId);
        
        return userThreadsList.stream()
            .flatMap(thread -> thread.getMessages().stream())
            .filter(message -> message.getReceiverId().equals(userId) && !message.isRead())
            .collect(Collectors.toList());
    }
    
    public int getUnreadCount(String userId) {
        return getUnreadMessages(userId).size();
    }
    
    public void markAllAsRead(String userId) {
        List<MessageThread> userThreadsList = getUserThreads(userId);
        
        userThreadsList.forEach(thread -> 
            thread.getMessages().stream()
                .filter(message -> message.getReceiverId().equals(userId))
                .forEach(message -> message.setRead(true))
        );
    }
    
    public List<MessageThread> searchThreads(String userId, String keyword) {
        List<MessageThread> userThreadsList = getUserThreads(userId);
        
        return userThreadsList.stream()
            .filter(thread -> 
                thread.getMessages().stream()
                    .anyMatch(message -> message.getContent().toLowerCase().contains(keyword.toLowerCase()))
            )
            .collect(Collectors.toList());
    }
}

// VENDOR SERVICE

class VendorService {
    private Map<String, Vendor> vendors;
    private Map<String, List<String>> vendorsByCategory;
    
    public VendorService() {
        this.vendors = new HashMap<>();
        this.vendorsByCategory = new HashMap<>();
    }
    
    public void addVendor(Vendor vendor) {
        vendors.put(vendor.getId(), vendor);
        // In a real implementation, you would have categories
        vendorsByCategory.computeIfAbsent("photography", k -> new ArrayList<>())
                         .add(vendor.getId());
    }
    
    public Vendor getVendor(String vendorId) {
        return vendors.get(vendorId);
    }
    
    public List<Vendor> searchVendors(String keyword) {
        return vendors.values().stream()
            .filter(vendor -> 
                vendor.getName().toLowerCase().contains(keyword.toLowerCase()) ||
                (vendor.getBusinessName() != null && 
                 vendor.getBusinessName().toLowerCase().contains(keyword.toLowerCase()))
            )
            .collect(Collectors.toList());
    }
    
    public List<Vendor> getVendorsByCategory(String category) {
        List<String> vendorIds = vendorsByCategory.getOrDefault(category, new ArrayList<>());
        return vendorIds.stream()
            .map(vendors::get)
            .collect(Collectors.toList());
    }
    
    public List<Service> getVendorServices(String vendorId) {
        Vendor vendor = vendors.get(vendorId);
        return vendor != null ? vendor.getServices() : new ArrayList<>();
    }
    
    public Map<String, Integer> getVendorStatistics() {
        Map<String, Integer> stats = new HashMap<>();
        
        // Count vendors by category
        for (Map.Entry<String, List<String>> entry : vendorsByCategory.entrySet()) {
            stats.put(entry.getKey(), entry.getValue().size());
        }
        
        stats.put("total", vendors.size());
        
        return stats;
    }
}

// REVIEW SYSTEM

class Review {
    private String id;
    private String bookingId;
    private String clientId;
    private String vendorId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
    private List<String> images;
    
    public Review(String bookingId, String clientId, String vendorId, int rating, String comment) {
        this.id = UUID.randomUUID().toString();
        this.bookingId = bookingId;
        this.clientId = clientId;
        this.vendorId = vendorId;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = LocalDateTime.now();
        this.images = new ArrayList<>();
    }
    
    // Getters and setters
    public String getId() { return id; }
    public String getBookingId() { return bookingId; }
    public String getClientId() { return clientId; }
    public String getVendorId() { return vendorId; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<String> getImages() { return new ArrayList<>(images); }
    public void addImage(String imageUrl) { this.images.add(imageUrl); }
}

class ReviewSystem {
    private Map<String, Review> reviews;
    private Map<String, List<String>> vendorReviews;
    private Map<String, List<String>> clientReviews;
    
    public ReviewSystem() {
        this.reviews = new HashMap<>();
        this.vendorReviews = new HashMap<>();
        this.clientReviews = new HashMap<>();
    }
    
    public String createReview(Review review) {
        reviews.put(review.getId(), review);
        
        // Update vendor reviews index
        vendorReviews.computeIfAbsent(review.getVendorId(), k -> new ArrayList<>())
                     .add(review.getId());
        
        // Update client reviews index
        clientReviews.computeIfAbsent(review.getClientId(), k -> new ArrayList<>())
                     .add(review.getId());
        
        return review.getId();
    }
    
    public Review getReview(String reviewId) {
        return reviews.get(reviewId);
    }
    
    public List<Review> getVendorReviews(String vendorId) {
        List<String> reviewIds = vendorReviews.getOrDefault(vendorId, new ArrayList<>());
        return reviewIds.stream()
                       .map(reviews::get)
                       .collect(Collectors.toList());
    }
    
    public List<Review> getClientReviews(String clientId) {
        List<String> reviewIds = clientReviews.getOrDefault(clientId, new ArrayList<>());
        return reviewIds.stream()
                       .map(reviews::get)
                       .collect(Collectors.toList());
    }
    
    public double getAverageRating(String vendorId) {
        List<Review> vendorReviewsList = getVendorReviews(vendorId);
        if (vendorReviewsList.isEmpty()) {
            return 0.0;
        }
        
        double sum = vendorReviewsList.stream()
                                     .mapToInt(Review::getRating)
                                     .sum();
        return sum / vendorReviewsList.size();
    }
    
    public Map<Integer, Integer> getRatingDistribution(String vendorId) {
        List<Review> vendorReviewsList = getVendorReviews(vendorId);
        Map<Integer, Integer> distribution = new HashMap<>();
        
        for (int i = 1; i <= 5; i++) {
            final int rating = i;
            int count = (int) vendorReviewsList.stream()
                                             .filter(review -> review.getRating() == rating)
                                             .count();
            distribution.put(i, count);
        }
        
        return distribution;
    }
}

// DATA PERSISTENCE

class DataPersistenceManager {
    // In a real application, this would handle database connections
    // or file I/O to save and load data
    
    public void saveChanges() {
        // Simulate saving data to a database or file
        System.out.println("All changes saved to database");
    }
    
    public void loadData() {
        // Simulate loading data from a database or file
        System.out.println("Data loaded from database");
    }
    
    public void backup() {
        // Simulate creating a backup
        System.out.println("Backup created at " + LocalDateTime.now());
    }
}

// API SERVER

class APIServer {
    private int port;
    private AuthenticationService authService;
    private BookingSystem bookingSystem;
    private PaymentProcessor paymentProcessor;
    private NotificationService notificationService;
    private MessagingService messagingService;
    private VendorService vendorService;
    private ReviewSystem reviewSystem;
    
    public APIServer(int port, AuthenticationService authService, BookingSystem bookingSystem,
                     PaymentProcessor paymentProcessor, NotificationService notificationService,
                     MessagingService messagingService, VendorService vendorService,
                     ReviewSystem reviewSystem) {
        this.port = port;
        this.authService = authService;
        this.bookingSystem = bookingSystem;
        this.paymentProcessor = paymentProcessor;
        this.notificationService = notificationService;
        this.messagingService = messagingService;
        this.vendorService = vendorService;
        this.reviewSystem = reviewSystem;
    }
    
    public void start() {
        // In a real application, this would start a web server like Tomcat, Jetty, etc.
        // and define REST API endpoints for the different service methods
        
        configureEndpoints();
    }
    
    private void configureEndpoints() {
        // This is a simplified representation of setting up API endpoints
        // In a real application, this would define actual HTTP endpoints
        
        // Auth endpoints
        System.out.println("Configured Auth endpoints: /api/auth/login, /api/auth/register, /api/auth/logout");
        
        // User endpoints
        System.out.println("Configured User endpoints: /api/users/{id}, /api/users/profile");
        
        // Vendor endpoints
        System.out.println("Configured Vendor endpoints: /api/vendors, /api/vendors/{id}, /api/vendors/search");
        
        // Booking endpoints
        System.out.println("Configured Booking endpoints: /api/bookings, /api/bookings/{id}, /api/bookings/user/{id}");
        
        // Payment endpoints
        System.out.println("Configured Payment endpoints: /api/payments, /api/payments/{id}, /api/payments/process");
        
        // Notification endpoints
        System.out.println("Configured Notification endpoints: /api/notifications, /api/notifications/unread");
        
        // Messaging endpoints
        System.out.println("Configured Messaging endpoints: /api/messages, /api/messages/threads");
        
        // Review endpoints
        System.out.println("Configured Review endpoints: /api/reviews, /api/reviews/vendor/{id}");
    }
    
    public void stop() {
        // In a real application, this would shut down the web server
        System.out.println("API Server stopped");
    }
}
