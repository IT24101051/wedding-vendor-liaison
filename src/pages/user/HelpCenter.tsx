
import React, { useState } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Users, Calendar, CreditCard, MessageSquare } from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // FAQ data organized by category
  const faqsByCategory = {
    general: [
      {
        question: "What is Wedding Vendor Liaison?",
        answer: "Wedding Vendor Liaison is a platform that connects couples planning their wedding with professional vendors who provide various wedding services. We make it easy to find, compare, and book vendors for your special day."
      },
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign In' button in the top right corner of the homepage. Then select 'Create an account' and follow the instructions to complete your registration."
      },
      {
        question: "Is it free to use Wedding Vendor Liaison?",
        answer: "Yes, it's completely free for couples to create an account, browse vendors, and manage their wedding planning. Vendors pay a subscription fee to be listed on our platform."
      }
    ],
    vendors: [
      {
        question: "How do I find the right vendors for my wedding?",
        answer: "You can browse vendors by category, location, and price range. You can also filter by availability for your wedding date. Each vendor has a detailed profile with photos, reviews, and pricing information to help you make an informed decision."
      },
      {
        question: "Can I message vendors before booking?",
        answer: "Yes, you can send messages to vendors through our platform to ask questions or discuss your specific needs before making a booking."
      },
      {
        question: "How can I compare different vendors?",
        answer: "You can save vendors to your favorites and then compare their services, prices, and reviews side by side. This makes it easier to choose the best option for your wedding."
      }
    ],
    bookings: [
      {
        question: "How do I book a vendor?",
        answer: "Once you've found a vendor you like, click the 'Book Now' button on their profile. Select your wedding date, choose the specific service package you want, and follow the prompts to complete your booking request."
      },
      {
        question: "Can I cancel or change my booking?",
        answer: "Yes, you can cancel or request changes to your booking through your account dashboard. Please note that cancellation policies vary by vendor, and some may charge a cancellation fee depending on how close it is to your event date."
      },
      {
        question: "What happens after I submit a booking request?",
        answer: "After you submit a booking request, the vendor will receive a notification and can either accept or decline the request. Once accepted, you'll receive a confirmation email with all the details of your booking."
      }
    ],
    payments: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), as well as PayPal for secure online payments."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption and security protocols to protect your payment information. We never store your full credit card details on our servers."
      },
      {
        question: "When am I charged for a booking?",
        answer: "Most vendors require a deposit at the time of booking (typically 25-50% of the total price), with the remaining balance due closer to your wedding date. The specific payment schedule will be clearly outlined before you confirm your booking."
      }
    ],
    support: [
      {
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team through the 'Contact Us' page, by emailing support@weddingvendorliaison.com, or by calling (800) 555-1234 during our business hours."
      },
      {
        question: "What if I have a dispute with a vendor?",
        answer: "If you experience an issue with a vendor, first try to resolve it directly with them through our messaging system. If that doesn't resolve the issue, you can contact our support team who will help mediate the situation."
      },
      {
        question: "Do you offer refunds?",
        answer: "Refund policies are set by individual vendors and will be clearly stated in their terms of service. If you need to request a refund, you should first contact the vendor. If you need additional assistance, our support team can help guide you through the process."
      }
    ]
  };

  // Filter FAQs based on search query
  const filterFaqs = (faqs: any[]) => {
    if (!searchQuery) return faqs;
    
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-wedding-navy mb-6">Help Center</h1>
        
        {/* Search bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center max-w-3xl mx-auto mb-6">
              <h2 className="text-2xl font-semibold mb-2">How can we help you?</h2>
              <p className="text-gray-600">Search our knowledge base for answers to common questions</p>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Type your question here..."
                className="pl-10 pr-4 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-1 top-1 bg-wedding-navy" size="sm">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Categories and FAQs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="vendors" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Vendors</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden md:inline">Support</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filterFaqs(faqsByCategory.general).map((faq, index) => (
                    <AccordionItem key={index} value={`general-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vendors">
            <Card>
              <CardHeader>
                <CardTitle>Finding and Working with Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filterFaqs(faqsByCategory.vendors).map((faq, index) => (
                    <AccordionItem key={index} value={`vendors-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Making and Managing Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filterFaqs(faqsByCategory.bookings).map((faq, index) => (
                    <AccordionItem key={index} value={`bookings-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payments and Billing</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filterFaqs(faqsByCategory.payments).map((faq, index) => (
                    <AccordionItem key={index} value={`payments-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Customer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filterFaqs(faqsByCategory.support).map((faq, index) => (
                    <AccordionItem key={index} value={`support-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Contact support section */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">Our support team is ready to assist you</p>
          <div className="flex justify-center">
            <Button asChild className="bg-wedding-navy mr-4">
              <a href="/user/contact-us">Contact Support</a>
            </Button>
            <Button variant="outline" className="border-wedding-navy text-wedding-navy">
              <a href="mailto:support@weddingvendorliaison.com">Email Us</a>
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default HelpCenter;
