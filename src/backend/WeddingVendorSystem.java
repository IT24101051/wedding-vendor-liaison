
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
    
    public static void main(String[] args) {
        // Initialize the system
        BookingSystem bookingSystem = new BookingSystem();
        AuthenticationService authService = new AuthenticationService();
        PaymentProcessor paymentProcessor = new PaymentProcessor();
        NotificationService notificationService = new NotificationService();
        
        // Register sample users
        User client = new Client("client@example.com", "password", "Demo Client");
        User vendor = new Vendor("vendor@example.com", "password", "Elegant Moments Photography");
        User admin = new Admin("admin@example.com", "admin123", "Admin User");
        
        authService.registerUser(client);
        authService.registerUser(vendor);
        authService.registerUser(admin);
        
        // Sample booking flow
        if (authService.authenticateUser("client@example.com", "password")) {
            Booking booking = new Booking();
            booking.setClientId(client.getId());
            booking.setVendorId(vendor.getId());
            booking.setServiceName("Premium Wedding Photography");
            booking.setAmount(2500.00);
            booking.setEventDate(LocalDateTime.now().plusMonths(3));
            
            // Create booking
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
                
                System.out.println("Booking confirmed and notifications sent");
            }
        }
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
}
