
import { useState, useEffect } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Star, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import JavaBackendService, { Vendor } from "@/services/JavaBackendService";
import { Skeleton } from "@/components/ui/skeleton";

const VendorList = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const { toast } = useToast();

  // Fetch vendors from backend
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        // Initially fetch vendors sorted by rating (default)
        const vendorsData = await JavaBackendService.getAllVendors();
        setVendors(vendorsData);
        setFilteredVendors(vendorsData);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        toast({
          title: "Error",
          description: "Failed to load vendors. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [toast]);

  // Apply filters and sorting
  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        let result = [...vendors];
        
        // Apply category filter if selected
        if (categoryFilter !== "all") {
          result = await JavaBackendService.getVendorsByCategory(categoryFilter);
        }
        
        // Apply location filter if selected
        if (locationFilter !== "all") {
          const locationResults = await JavaBackendService.getVendorsByLocation(locationFilter);
          if (categoryFilter !== "all") {
            // If category filter is also applied, we need to find the intersection
            result = result.filter(vendor => 
              locationResults.some(locVendor => locVendor.id === vendor.id)
            );
          } else {
            result = locationResults;
          }
        }
        
        // Apply search query if present
        if (searchQuery.trim()) {
          const searchResults = await JavaBackendService.searchVendors(searchQuery);
          if (categoryFilter !== "all" || locationFilter !== "all") {
            // If other filters are applied, find intersection
            result = result.filter(vendor => 
              searchResults.some(searchVendor => searchVendor.id === vendor.id)
            );
          } else {
            result = searchResults;
          }
        }

        // Apply price filter
        if (priceFilter !== "all") {
          switch (priceFilter) {
            case "budget":
              result = result.filter(vendor => vendor.minPrice < 1000);
              break;
            case "mid":
              result = result.filter(vendor => vendor.minPrice >= 1000 && vendor.minPrice < 3000);
              break;
            case "premium":
              result = result.filter(vendor => vendor.minPrice >= 3000 && vendor.minPrice < 5000);
              break;
            case "luxury":
              result = result.filter(vendor => vendor.minPrice >= 5000);
              break;
            default:
              break;
          }
        }

        // Apply sorting
        switch (sortBy) {
          case "priceAsc":
            result = await JavaBackendService.getVendorsSortedByPrice(true);
            break;
          case "priceDesc":
            result = await JavaBackendService.getVendorsSortedByPrice(false);
            break;
          case "rating":
            // Get sorted by rating from backend
            const ratedVendors = await JavaBackendService.getAllVendors();
            // Filter the sorted results based on current filters
            result = ratedVendors.filter(vendor => 
              result.some(filteredVendor => filteredVendor.id === vendor.id)
            );
            break;
          default:
            break;
        }

        setFilteredVendors(result);
      } catch (error) {
        console.error("Error applying filters:", error);
        toast({
          title: "Error",
          description: "Failed to apply filters. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (vendors.length > 0) {
      applyFilters();
    }
  }, [categoryFilter, locationFilter, priceFilter, searchQuery, sortBy, vendors, toast]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by useEffect
  };

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
          <form onSubmit={handleSearchSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search vendors..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Venue">Venues</SelectItem>
                    <SelectItem value="Photographer">Photographers</SelectItem>
                    <SelectItem value="Caterer">Caterers</SelectItem>
                    <SelectItem value="Florist">Florists</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Planner">Planners</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
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
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                    <SelectItem value="Chicago">Chicago</SelectItem>
                    <SelectItem value="Miami">Miami</SelectItem>
                    <SelectItem value="Austin">Austin</SelectItem>
                    <SelectItem value="Seattle">Seattle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Sort Options */}
      <section className="py-4 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SlidersHorizontal className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Sort By:</span>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={sortBy === "rating" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setSortBy("rating")}
              >
                Top Rated
              </Button>
              <Button 
                variant={sortBy === "priceAsc" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setSortBy("priceAsc")}
              >
                Price: Low to High
              </Button>
              <Button 
                variant={sortBy === "priceDesc" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setSortBy("priceDesc")}
              >
                Price: High to Low
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor List */}
      <section className="py-12 bg-wedding-light">
        <div className="container mx-auto px-4">
          {loading ? (
            // Loading skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden h-full">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="flex space-x-2 pt-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredVendors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor, index) => (
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
                        onError={(e) => {
                          // Fallback image if the vendor image fails to load
                          e.currentTarget.src = "https://images.unsplash.com/photo-1511795409834-432f7b1632a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                        }}
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
                      <p className="text-sm font-medium text-wedding-navy mb-4">{vendor.priceDisplay}</p>
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
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-wedding-navy mb-2">No vendors found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <Button onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setLocationFilter("all");
                setPriceFilter("all");
                setSortBy("rating");
              }}>
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </UserLayout>
  );
};

export default VendorList;
