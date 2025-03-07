
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Store, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // For demo purposes, we'll just simulate a login
    setTimeout(() => {
      setIsLoading(false);
      // Mock login - in a real app, you would validate with your backend
      if (email === "vendor@example.com" && password === "password") {
        navigate("/vendor/dashboard");
      } else {
        setError("Invalid email or password. Try vendor@example.com / password");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-light p-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Store className="h-8 w-8 text-wedding-gold" />
            <span className="text-3xl font-display font-bold text-wedding-navy">Vendor Portal</span>
          </Link>
          <p className="mt-2 text-gray-600">Sign in to manage your wedding services</p>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Vendor Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your vendor account
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
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-wedding-navy hover:underline">
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
                className="w-full bg-wedding-gold text-white hover:bg-wedding-gold/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            
            <div className="mt-4 text-center text-sm">
              <p>
                Don't have a vendor account?{" "}
                <Link to="/vendor/register" className="text-wedding-navy font-semibold hover:underline">
                  Register now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-wedding-navy">
            Return to Wedding Vendor Liaison Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorLogin;
