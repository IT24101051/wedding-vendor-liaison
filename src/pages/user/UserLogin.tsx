
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Alert } from "@/components/ui/alert";
import { Heart, User, AlertCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/user/payment/booking1";

  useEffect(() => {
    if (isAuthenticated('user')) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    const success = await login(email, password, 'user');
    
    setIsLoading(false);
    if (success) {
      toast({
        title: "Login successful",
        description: "You've been logged in to your account",
      });
      navigate(from);
    } else {
      setError("Invalid email or password. Try client@example.com / password");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Blue Strap/Banner */}
      <div className="bg-primary py-3 text-white text-center shadow">
        <div className="container">
          <p className="fw-medium mb-0">Client access portal - powered by Java backend</p>
        </div>
      </div>
      
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <motion.div 
          className="w-100"
          style={{ maxWidth: "420px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-4">
            <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none">
              <ArrowLeft className="text-primary" style={{ height: "32px", width: "32px" }} />
              <span className="fs-3 fw-bold text-dark font-display">Wedding Vendor Liaison</span>
            </Link>
            <p className="mt-2 text-secondary">Sign in to manage your wedding services</p>
          </div>
          
          <div className="card">
            <div className="card-header bg-white border-0 text-center py-3">
              <h4 className="fs-4 fw-bold mb-1">Client Login</h4>
              <p className="text-secondary mb-0">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                  <AlertCircle className="me-2" style={{ height: "16px", width: "16px" }} />
                  <div>{error}</div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <div>
                  <label htmlFor="email" className="form-label fw-medium">Email</label>
                  <div className="position-relative">
                    <div className="position-absolute top-50 translate-middle-y" style={{ left: "12px" }}>
                      <User className="text-secondary" style={{ height: "16px", width: "16px" }} />
                    </div>
                    <input 
                      id="email" 
                      type="email" 
                      className="form-control ps-4"
                      style={{ paddingLeft: "40px" }}
                      placeholder="client@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="password" className="form-label fw-medium mb-0">Password</label>
                    <Link to="#" className="text-primary small text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>
                  <input 
                    id="password" 
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="small">
                  Don't have an account?{" "}
                  <Link to="/user/register" className="text-primary fw-semibold text-decoration-none">
                    Register now
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="small text-secondary text-decoration-none hover-text-primary">
              Return to Wedding Vendor Liaison Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;
