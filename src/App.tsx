
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Interface
import UserHome from "./pages/user/UserHome";
import VendorList from "./pages/user/VendorList";
import VendorDetails from "./pages/user/VendorDetails";
import BookingForm from "./pages/user/BookingForm";
import UserBookings from "./pages/user/UserBookings";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />
          
          {/* User Interface Routes */}
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/vendors" element={<VendorList />} />
          <Route path="/user/vendors/:id" element={<VendorDetails />} />
          <Route path="/user/book/:id" element={<BookingForm />} />
          <Route path="/user/bookings" element={<UserBookings />} />
          
          {/* Vendor Interface Routes */}
          <Route path="/vendor/register" element={<VendorRegister />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/profile" element={<VendorProfile />} />
          <Route path="/vendor/services" element={<VendorServices />} />
          <Route path="/vendor/bookings" element={<VendorBookings />} />
          
          {/* Admin Interface Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/vendors" element={<AdminVendors />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
