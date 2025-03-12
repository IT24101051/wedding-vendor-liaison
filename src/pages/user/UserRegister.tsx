
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

const UserRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please fill in all required fields",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Passwords do not match",
      });
      return;
    }
    
    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "You must accept the Terms of Service and Privacy Policy",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await register({
      email,
      password,
      name,
      type: 'user'
    });
    
    setIsSubmitting(false);
    
    if (success) {
      navigate('/user/dashboard');
    }
  };
  
  return (
    <div className="flex min-h-screen bg-wedding-light">
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <Heart className="h-8 w-8 text-wedding-gold" />
              <span className="text-3xl font-display font-bold text-wedding-navy">Wedding Vendor Liaison</span>
            </Link>
            <p className="text-gray-600 mt-2">Create your account to start planning your perfect wedding</p>
          </div>
          
          <Card>
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
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
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input 
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the <Link to="/terms" className="text-wedding-gold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-wedding-gold hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit"
                  className="w-full bg-wedding-gold hover:bg-wedding-gold/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/user/login" className="text-wedding-gold hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
