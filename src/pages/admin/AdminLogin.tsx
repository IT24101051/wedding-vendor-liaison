
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wedding-navy">Admin Portal</h1>
          <p className="mt-2 text-gray-600">Sign in to access the admin dashboard</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Administrator Login</CardTitle>
            <CardDescription>
              Please enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="username" placeholder="admin" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-wedding-gold hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="password" type="password" className="pl-9" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-wedding-navy hover:bg-wedding-navy/90">
              Sign In
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            This is a secured area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
