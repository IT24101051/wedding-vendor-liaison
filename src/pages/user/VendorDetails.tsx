
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import UserLayout from "@/components/layouts/UserLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, DollarSign, Clock, Users, Check } from "lucide-react";
import { motion } from "framer-motion";

const VendorDetails = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Mock vendor data
  const vendor = {
    id: parseInt(id || "1"),
    name: "Elegant Moments Photography",
    category: "Photographer",
    rating: 4.9,
    reviewCount: 124,
    price: "$1,200 - $3,000",
    location: "New York, NY",
    description: "Specializing in candid wedding photography that captures the emotions of your special day. With over 10 years of experience, we pride ourselves on our ability to document the beautiful moments that make your wedding unique.",
    about: "Elegant Moments Photography was founded in 2010 by award-winning photographer James Smith. We are a team of passionate photographers dedicated to capturing the most precious moments of your wedding day. Our style is a blend of photojournalism and fine art, resulting in timeless images that tell your unique love story.",
    images: [
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511285560929-80b456503681?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      {
        name: "Basic Wedding Package",
        price: "$1,200",
        description: "6 hours of coverage, 1 photographer, 300+ edited digital images, online gallery"
      },
      {
        name: "Premium Wedding Package",
        price: "$2,000",
        description: "8 hours of coverage, 2 photographers, engagement session, 500+ edited digital images, online gallery, wedding album"
      },
      {
        name: "Luxury Wedding Package",
        price: "$3,000",
        description: "10 hours of coverage, 2 photographers, engagement session, bridal session, 700+ edited digital images, online gallery, premium wedding album, canvas print"
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Sarah & Michael",
        date: "October 2023",
        rating: 5,
        comment: "James and his team were absolutely amazing! They captured every moment perfectly and were so professional throughout the day. The photos exceeded our expectations!"
      },
      {
        id: 2,
        name: "Jessica & David",
        date: "September 2023",
        rating: 5,
        comment: "We couldn't be happier with our wedding photos! Elegant Moments Photography truly captured the essence of our special day. Highly recommend!"
      },
      {
        id: 3,
        name: "Emma & John",
        date: "August 2023",
        rating: 4,
        comment: "Great photographers with an eye for detail. They were flexible with our schedule and delivered beautiful photos. Would have liked a few more family shots."
      }
    ],
    faq: [
      {
        question: "How far in advance should we book?",
        answer: "We recommend booking 8-12 months in advance, especially for peak wedding season dates (May-October)."
      },
      {
        question: "Do you travel for weddings?",
        answer: "Yes, we are available for travel worldwide. Travel fees may apply depending on the location."
      },
      {
        question: "When will we receive our photos?",
        answer: "You will receive your online gallery within 6-8 weeks after your wedding date."
      },
      {
        question: "Do you offer engagement sessions?",
        answer: "Yes, engagement sessions are included in our Premium and Luxury packages, and can be added to the Basic package for an additional fee."
      }
    ]
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link to="/user" className="text-gray-500 hover:text-wedding-navy">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/user/vendors" className="text-gray-500 hover:text-wedding-navy">Vendors</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-wedding-navy">{vendor.name}</span>
          </nav>
        </div>

        {/* Vendor Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="bg-wedding-gold/20 text-wedding-navy text-xs font-semibold px-2.5 py-1 rounded mr-2">
                  {vendor.category}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium ml-1">{vendor.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({vendor.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-wedding-navy mb-2">{vendor.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{vendor.location}</span>
              </div>
              <p className="text-gray-600 max-w-2xl">{vendor.description}</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="text-xl font-semibold text-wedding-navy">{vendor.price}</div>
              <Link to={`/user/book/${vendor.id}`}>
                <Button className="w-full bg-wedding-gold text-white hover:bg-wedding-gold/90">
                  Book Now
                </Button>
              </Link>
              <Button variant="outline" className="w-full border-wedding-navy text-wedding-navy">
                Contact Vendor
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <img 
                src={vendor.images[activeImageIndex]} 
                alt={vendor.name} 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {vendor.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-w-3 aspect-h-2 rounded-lg overflow-hidden cursor-pointer ${
                    index === activeImageIndex ? 'ring-2 ring-wedding-gold' : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img 
                    src={image} 
                    alt={`${vendor.name} ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Tabs defaultValue="services">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="services">Services & Pricing</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            
            {/* Services Tab */}
            <TabsContent value="services" className="pt-6">
              <h2 className="text-2xl font-bold text-wedding-navy mb-6">Our Wedding Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {vendor.services.map((service, index) => (
                  <Card key={index} className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-wedding-navy mb-2">{service.name}</h3>
                      <p className="text-lg font-bold text-wedding-gold mb-4">{service.price}</p>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <Link to={`/user/book/${vendor.id}`}>
                        <Button className="w-full bg-wedding-navy text-white hover:bg-wedding-navy/90">
                          Select & Book
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-wedding-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-wedding-navy mb-4">What's Included</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Professional editing and color correction</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Online gallery with high-resolution images</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Personal printing rights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Pre-wedding consultation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom timeline planning</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Backup equipment</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            {/* About Tab */}
            <TabsContent value="about" className="pt-6">
              <h2 className="text-2xl font-bold text-wedding-navy mb-6">About Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-4">{vendor.about}</p>
                  <h3 className="text-lg font-semibold text-wedding-navy mt-6 mb-4">Why Choose Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-wedding-gold/20 p-1 rounded mr-3 mt-1">
                        <Calendar className="h-4 w-4 text-wedding-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-wedding-navy">Experience</p>
                        <p className="text-sm text-gray-600">Over 10 years of wedding photography experience</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-wedding-gold/20 p-1 rounded mr-3 mt-1">
                        <DollarSign className="h-4 w-4 text-wedding-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-wedding-navy">Transparent Pricing</p>
                        <p className="text-sm text-gray-600">No hidden fees, clear package options</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-wedding-gold/20 p-1 rounded mr-3 mt-1">
                        <Clock className="h-4 w-4 text-wedding-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-wedding-navy">Timely Delivery</p>
                        <p className="text-sm text-gray-600">Your photos delivered within 6-8 weeks</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-wedding-gold/20 p-1 rounded mr-3 mt-1">
                        <Users className="h-4 w-4 text-wedding-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-wedding-navy">Dedicated Team</p>
                        <p className="text-sm text-gray-600">Professional, friendly photographers who care about your day</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Our team" 
                    className="w-full h-80 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-wedding-light p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-wedding-navy mb-3">Contact Information</h3>
                    <p className="text-gray-600 mb-2">Email: info@elegantmoments.com</p>
                    <p className="text-gray-600 mb-2">Phone: (555) 123-4567</p>
                    <p className="text-gray-600">Address: 123 Wedding St, New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-wedding-navy">Customer Reviews</h2>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-lg font-semibold ml-1">{vendor.rating}</span>
                  <span className="text-gray-500 ml-1">({vendor.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6 mb-8">
                {vendor.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-wedding-navy">{review.name}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{review.date}</p>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <Button variant="outline" className="border-wedding-navy text-wedding-navy">
                  Show More Reviews
                </Button>
              </div>
            </TabsContent>
            
            {/* FAQ Tab */}
            <TabsContent value="faq" className="pt-6">
              <h2 className="text-2xl font-bold text-wedding-navy mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4 mb-8">
                {vendor.faq.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-wedding-navy mb-2">{item.question}</h3>
                      <p className="text-gray-600">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="bg-wedding-light p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-wedding-navy mb-3">Have more questions?</h3>
                <p className="text-gray-600 mb-4">We're happy to help! Contact us directly or schedule a consultation.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-wedding-navy text-white hover:bg-wedding-navy/90">
                    Contact Us
                  </Button>
                  <Button variant="outline" className="border-wedding-navy text-wedding-navy">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </UserLayout>
  );
};

export default VendorDetails;
