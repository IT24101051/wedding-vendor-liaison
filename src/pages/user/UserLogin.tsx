
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
    <div className="min-h-screen flex flex-col bg-wedding-light">
      {/* Blue Strap/Banner */}
      <div className="bg-[#1EAEDB] py-3 text-white text-center shadow-md">
        <div className="wedding-container">
          <p className="font-medium">Client access portal - powered by Java backend</p>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <ArrowLeft className="h-8 w-8 text-[#1EAEDB]" />
              <span className="text-3xl font-display font-bold text-wedding-navy">Wedding Vendor Liaison</span>
            </Link>
            <p className="mt-2 text-gray-600">Sign in to manage your wedding services</p>
          </div>
          
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Client Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="client@example.com"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="text-sm text-[#1EAEDB] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#1EAEDB] text-white hover:bg-[#1EAEDB]/90"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <p>
                  Don't have an account?{" "}
                  <Link to="/user/register" className="text-[#1EAEDB] font-semibold hover:underline">
                    Register now
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-[#1EAEDB]">
              Return to Wedding Vendor Liaison Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserLogin;
