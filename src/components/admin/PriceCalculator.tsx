
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ServiceType = "venue" | "catering" | "photography" | "entertainment" | "decoration" | "custom";

interface PricingRates {
  venue: { basePrice: number, ratePerHour: number, premiumLocation: number };
  catering: { basePrice: number, ratePerPerson: number, premiumMenu: number };
  photography: { basePrice: number, ratePerHour: number, additionalPhotographer: number };
  entertainment: { basePrice: number, ratePerHour: number, premiumPackage: number };
  decoration: { basePrice: number, standardPackage: number, premiumPackage: number };
  custom: { basePrice: number, hourlyRate: number };
}

const PriceCalculator = () => {
  const { toast } = useToast();
  
  // Default pricing rates
  const pricingRates: PricingRates = {
    venue: { basePrice: 1000, ratePerHour: 200, premiumLocation: 500 },
    catering: { basePrice: 500, ratePerPerson: 45, premiumMenu: 15 },
    photography: { basePrice: 800, ratePerHour: 150, additionalPhotographer: 350 },
    entertainment: { basePrice: 600, ratePerHour: 100, premiumPackage: 300 },
    decoration: { basePrice: 400, standardPackage: 300, premiumPackage: 800 },
    custom: { basePrice: 0, hourlyRate: 75 }
  };
  
  // State for form inputs
  const [serviceType, setServiceType] = useState<ServiceType>("venue");
  const [hours, setHours] = useState<number>(4);
  const [guests, setGuests] = useState<number>(100);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [additionalItems, setAdditionalItems] = useState<number>(0);
  const [customRate, setCustomRate] = useState<number>(75);
  const [customBase, setCustomBase] = useState<number>(0);
  
  // State for results
  const [basePrice, setBasePrice] = useState<number>(0);
  const [additionalCosts, setAdditionalCosts] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [calculationDetails, setCalculationDetails] = useState<string[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Handle calculation
  const calculatePrice = () => {
    let base = 0;
    let additional = 0;
    let details: string[] = [];

    switch (serviceType) {
      case "venue":
        base = pricingRates.venue.basePrice;
        additional = hours * pricingRates.venue.ratePerHour;
        if (isPremium) additional += pricingRates.venue.premiumLocation;
        
        details = [
          `Base venue fee: $${base.toFixed(2)}`,
          `${hours} hours at $${pricingRates.venue.ratePerHour.toFixed(2)}/hour: $${(hours * pricingRates.venue.ratePerHour).toFixed(2)}`,
          isPremium ? `Premium location fee: $${pricingRates.venue.premiumLocation.toFixed(2)}` : ""
        ].filter(item => item !== "");
        break;
        
      case "catering":
        base = pricingRates.catering.basePrice;
        additional = guests * pricingRates.catering.ratePerPerson;
        if (isPremium) additional += guests * pricingRates.catering.premiumMenu;
        
        details = [
          `Base catering service fee: $${base.toFixed(2)}`,
          `${guests} guests at $${pricingRates.catering.ratePerPerson.toFixed(2)}/person: $${(guests * pricingRates.catering.ratePerPerson).toFixed(2)}`,
          isPremium ? `Premium menu upgrade ($${pricingRates.catering.premiumMenu.toFixed(2)}/person): $${(guests * pricingRates.catering.premiumMenu).toFixed(2)}` : ""
        ].filter(item => item !== "");
        break;
        
      case "photography":
        base = pricingRates.photography.basePrice;
        additional = hours * pricingRates.photography.ratePerHour;
        if (additionalItems > 0) additional += additionalItems * pricingRates.photography.additionalPhotographer;
        
        details = [
          `Base photography package: $${base.toFixed(2)}`,
          `${hours} hours at $${pricingRates.photography.ratePerHour.toFixed(2)}/hour: $${(hours * pricingRates.photography.ratePerHour).toFixed(2)}`,
          additionalItems > 0 ? `${additionalItems} additional photographer(s): $${(additionalItems * pricingRates.photography.additionalPhotographer).toFixed(2)}` : ""
        ].filter(item => item !== "");
        break;
        
      case "entertainment":
        base = pricingRates.entertainment.basePrice;
        additional = hours * pricingRates.entertainment.ratePerHour;
        if (isPremium) additional += pricingRates.entertainment.premiumPackage;
        
        details = [
          `Base entertainment fee: $${base.toFixed(2)}`,
          `${hours} hours at $${pricingRates.entertainment.ratePerHour.toFixed(2)}/hour: $${(hours * pricingRates.entertainment.ratePerHour).toFixed(2)}`,
          isPremium ? `Premium entertainment package: $${pricingRates.entertainment.premiumPackage.toFixed(2)}` : ""
        ].filter(item => item !== "");
        break;
        
      case "decoration":
        base = pricingRates.decoration.basePrice;
        additional = isPremium ? pricingRates.decoration.premiumPackage : pricingRates.decoration.standardPackage;
        
        details = [
          `Base decoration service fee: $${base.toFixed(2)}`,
          isPremium ? 
            `Premium decoration package: $${pricingRates.decoration.premiumPackage.toFixed(2)}` : 
            `Standard decoration package: $${pricingRates.decoration.standardPackage.toFixed(2)}`
        ];
        break;
        
      case "custom":
        base = customBase;
        additional = hours * customRate;
        
        details = [
          `Base custom service fee: $${base.toFixed(2)}`,
          `${hours} hours at $${customRate.toFixed(2)}/hour: $${(hours * customRate).toFixed(2)}`
        ];
        break;
    }

    const total = base + additional;
    
    setBasePrice(base);
    setAdditionalCosts(additional);
    setTotalPrice(total);
    setCalculationDetails(details);
    setHasCalculated(true);
    
    toast({
      title: "Price Calculation Complete",
      description: `Total price for ${serviceType} service: $${total.toFixed(2)}`,
    });
  };

  // Reset the form
  const resetForm = () => {
    setHasCalculated(false);
    setBasePrice(0);
    setAdditionalCosts(0);
    setTotalPrice(0);
    setCalculationDetails([]);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-wedding-gold" />
          <CardTitle>Service Price Calculator</CardTitle>
        </div>
        <CardDescription>Calculate service pricing for vendors and clients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select 
                value={serviceType} 
                onValueChange={(value) => {
                  setServiceType(value as ServiceType);
                  resetForm();
                }}
              >
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select a service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venue">Venue</SelectItem>
                  <SelectItem value="catering">Catering</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="decoration">Decoration</SelectItem>
                  <SelectItem value="custom">Custom Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {serviceType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customBase">Base Price ($)</Label>
                <Input
                  id="customBase"
                  type="number"
                  min="0"
                  value={customBase}
                  onChange={(e) => setCustomBase(Number(e.target.value))}
                />
              </div>
            )}

            {serviceType === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customRate">Hourly Rate ($)</Label>
                <Input
                  id="customRate"
                  type="number"
                  min="0"
                  value={customRate}
                  onChange={(e) => setCustomRate(Number(e.target.value))}
                />
              </div>
            )}

            {(serviceType === "venue" || serviceType === "photography" || 
              serviceType === "entertainment" || serviceType === "custom") && (
              <div className="space-y-2">
                <Label htmlFor="hours">Duration (hours)</Label>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />
              </div>
            )}

            {serviceType === "catering" && (
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>
            )}

            {serviceType === "photography" && (
              <div className="space-y-2">
                <Label htmlFor="additionalPhotographers">Additional Photographers</Label>
                <Input
                  id="additionalPhotographers"
                  type="number"
                  min="0"
                  value={additionalItems}
                  onChange={(e) => setAdditionalItems(Number(e.target.value))}
                />
              </div>
            )}

            {(serviceType === "venue" || serviceType === "catering" || 
              serviceType === "entertainment" || serviceType === "decoration") && (
              <div className="space-y-2">
                <Label htmlFor="premium">Premium Option</Label>
                <Select 
                  value={isPremium ? "yes" : "no"} 
                  onValueChange={(value) => setIsPremium(value === "yes")}
                >
                  <SelectTrigger id="premium">
                    <SelectValue placeholder="Premium option?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="pt-4 flex space-x-2">
              <Button 
                onClick={calculatePrice}
                className="flex-1 bg-wedding-gold text-white hover:bg-wedding-gold/90"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Price
              </Button>
              <Button 
                onClick={resetForm} 
                variant="outline"
                className="flex-1"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className={`${hasCalculated ? 'block' : 'hidden'} lg:block bg-gray-50 p-4 rounded-lg`}>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <DollarSign className="h-5 w-5 text-green-600 mr-1" />
              Price Breakdown
            </h3>
            
            {!hasCalculated ? (
              <p className="text-gray-500 text-center py-8">
                Enter service details and click "Calculate Price" to see results
              </p>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-700">Calculation Details</h4>
                  <ul className="space-y-1 text-sm">
                    {calculationDetails.map((detail, index) => (
                      <li key={index} className="text-gray-600">{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Base Price:</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Additional Costs:</span>
                    <span>${additionalCosts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total Price:</span>
                    <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Admin Pricing Notes</h4>
                  <p className="text-xs text-blue-700">
                    This is an estimate based on standard rates. Actual prices may vary based on 
                    vendor-specific rates, seasonal factors, and customized service requirements.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCalculator;
