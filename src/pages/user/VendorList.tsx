
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VendorList = () => {
  // Mock vendor data
  const vendors = [
    {
      id: 1,
      name: "Elegant Moments Photography",
      category: "Photographer",
      rating: 4.9,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$1,200 - $3,000",
      location: "New York, NY",
      description: "Specializing in candid wedding photography that captures the emotions of your special day."
    },
    {
      id: 2,
      name: "Royal Garden Venue",
      category: "Venue",
      rating: 4.8,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$5,000 - $15,000",
      location: "Chicago, IL",
      description: "A stunning garden venue with both indoor and outdoor spaces for your dream wedding."
    },
    {
      id: 3,
      name: "Divine Cuisine Catering",
      category: "Caterer",
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$45 - $120 per person",
      location: "Los Angeles, CA",
      description: "Gourmet catering services with customizable menus to suit any taste and dietary requirement."
    },
    {
      id: 4,
      name: "Blooming Beauty Florals",
      category: "Florist",
      rating: 4.9,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1561128290-006dc4827214?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$800 - $2,500",
      location: "Miami, FL",
      description: "Creating breathtaking floral arrangements that bring your wedding vision to life."
    },
    {
      id: 5,
      name: "Harmony Wedding Band",
      category: "Entertainment",
      rating: 4.8,
      reviewCount: 92,
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$1,800 - $3,500",
      location: "Austin, TX",
      description: "Live music entertainment that keeps your guests dancing all night long."
    },
    {
      id: 6,
      name: "Dream Wedding Planners",
      category: "Planner",
      rating: 5.0,
      reviewCount: 64,
      image: "https://images.unsplash.com/photo-1511795409834-432f7b1632a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      price: "$2,500 - $8,000",
      location: "Seattle, WA",
      description: "Full-service wedding planning to make your journey to the altar stress-free and enjoyable."
    }
  ];

  return (
    <UserLayout>
      {/* Page Header */}
      <section className="bg-wedding-light py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-wedding-navy mb-4">Find Your Perfect Wedding Vendors</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our curated selection of top wedding professionals to make your special day perfect.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search vendors..." 
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select defaultValue="category">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="venue">Venues</SelectItem>
                  <SelectItem value="photographer">Photographers</SelectItem>
                  <SelectItem value="caterer">Caterers</SelectItem>
                  <SelectItem value="florist">Florists</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="planner">Planners</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="price">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Budget Friendly</SelectItem>
                  <SelectItem value="mid">Mid-Range</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="location">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="newyork">New York</SelectItem>
                  <SelectItem value="losangeles">Los Angeles</SelectItem>
                  <SelectItem value="chicago">Chicago</SelectItem>
                  <SelectItem value="miami">Miami</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor List */}
      <section className="py-12 bg-wedding-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor, index) => (
              <motion.div 
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
                  <div className="aspect-w-3 aspect-h-2">
                    <img 
                      src={vendor.image} 
                      alt={vendor.name} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="bg-wedding-gold/20 text-wedding-navy text-xs font-semibold px-2.5 py-1 rounded">
                        {vendor.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">{vendor.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({vendor.reviewCount})</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-wedding-navy mb-1">{vendor.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{vendor.location}</p>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{vendor.description}</p>
                    <p className="text-sm font-medium text-wedding-navy mb-4">{vendor.price}</p>
                    <div className="flex space-x-2">
                      <Link to={`/user/vendors/${vendor.id}`} className="flex-1">
                        <Button className="w-full bg-wedding-navy text-white hover:bg-wedding-navy/90">
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/user/book/${vendor.id}`} className="flex-1">
                        <Button className="w-full bg-wedding-gold text-white hover:bg-wedding-gold/90">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default VendorList;
