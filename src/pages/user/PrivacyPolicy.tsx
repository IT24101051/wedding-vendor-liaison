
import React from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-wedding-navy mb-6">Privacy Policy</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Wedding Vendor Liaison Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
              <p className="text-gray-700">
                Wedding Vendor Liaison ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create an account or profile</li>
                <li>Book services with vendors</li>
                <li>Contact our customer support</li>
                <li>Subscribe to our newsletters</li>
                <li>Participate in surveys or promotions</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-2">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, and events</li>
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-2">4. Sharing Your Information</h2>
              <p className="text-gray-700">
                We may share your information with vendors when you book their services. 
                We may also share your information with service providers, business partners, 
                or in response to legal requirements.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-2">5. Your Choices</h2>
              <p className="text-gray-700">
                You can update your account information at any time. You can also opt out of 
                receiving promotional emails by following the instructions in those emails.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at privacy@weddingvendorliaison.com.
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default PrivacyPolicy;
