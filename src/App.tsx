
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// User Interface
import UserHome from "./pages/user/UserHome";
import VendorList from "./pages/user/VendorList";
import VendorDetails from "./pages/user/VendorDetails";
import BookingForm from "./pages/user/BookingForm";
import UserBookings from "./pages/user/UserBookings";
import PaymentPage from "./pages/user/PaymentPage";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister"; // Import the UserRegister component
import PrivacyPolicy from "./pages/user/PrivacyPolicy";
import ContactUs from "./pages/user/ContactUs";
import HelpCenter from "./pages/user/HelpCenter";

// Vendor Interface
import VendorDashboard from "./pages/vendor/VendorDashboard";
import VendorProfile from "./pages/vendor/VendorProfile";
import VendorServices from "./pages/vendor/VendorServices";
import VendorBookings from "./pages/vendor/VendorBookings";
import VendorRegister from "./pages/vendor/VendorRegister";
import VendorLogin from "./pages/vendor/VendorLogin";

// Admin Interface
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminLogin from "./pages/admin/AdminLogin";

// Shared Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 30000, // Refetch data every 30 seconds for real-time updates
      staleTime: 15000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing Page - Accessible without login */}
            <Route path="/" element={<Index />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/register" element={<UserRegister />} /> {/* Add the UserRegister route */}
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route path="/vendor/register" element={<VendorRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Public user routes - Accessible without login */}
            <Route path="/user" element={<UserHome />} />
            <Route path="/user/vendors" element={<VendorList />} />
            <Route path="/user/vendors/:id" element={<VendorDetails />} />
            <Route path="/user/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/user/contact-us" element={<ContactUs />} />
            <Route path="/user/help-center" element={<HelpCenter />} />
            
            {/* Protected user routes - Require login */}
            <Route path="/user/book/:id" element={
              <ProtectedRoute requiredType="user">
                <BookingForm />
              </ProtectedRoute>
            } />
            <Route path="/user/bookings" element={
              <ProtectedRoute requiredType="user">
                <UserBookings />
              </ProtectedRoute>
            } />
            <Route path="/user/payment/:id" element={
              <ProtectedRoute requiredType="user">
                <PaymentPage />
              </ProtectedRoute>
            } />
            
            {/* Vendor Interface Routes */}
            <Route path="/vendor/dashboard" element={
              <ProtectedRoute requiredType="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/vendor/profile" element={
              <ProtectedRoute requiredType="vendor">
                <VendorProfile />
              </ProtectedRoute>
            } />
            <Route path="/vendor/services" element={
              <ProtectedRoute requiredType="vendor">
                <VendorServices />
              </ProtectedRoute>
            } />
            <Route path="/vendor/bookings" element={
              <ProtectedRoute requiredType="vendor">
                <VendorBookings />
              </ProtectedRoute>
            } />
            
            {/* Admin Interface Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/vendors" element={
              <ProtectedRoute requiredType="admin">
                <AdminVendors />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute requiredType="admin">
                <AdminBookings />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
