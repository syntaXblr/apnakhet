
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { LocationCoordinates } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface AddressSearchProps {
  onAddressSelect: (coordinates: LocationCoordinates, address: string) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onAddressSelect }) => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulate geocoding with the Mapbox API
  const geocodeAddress = async (address: string) => {
    setLoading(true);
    
    try {
      // In a real app, this would call a backend API that performs geocoding
      // For this demo, we'll simulate with random coordinates in central India
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate random coordinates near central India
      // In a real app, these would come from geocoding the address
      const baseLatitude = 20.5937; // Central India latitude
      const baseLongitude = 78.9629; // Central India longitude
      
      // Add some randomness to simulate different locations
      const randomOffset = () => (Math.random() - 0.5) * 5;
      
      const coordinates: LocationCoordinates = {
        latitude: baseLatitude + randomOffset(),
        longitude: baseLongitude + randomOffset()
      };
      
      onAddressSelect(coordinates, address);
      toast({
        title: "Location found",
        description: `Address resolved to coordinates: ${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`,
      });
    } catch (error) {
      console.error('Error geocoding address:', error);
      toast({
        title: "Error finding location",
        description: "Could not resolve the address to coordinates. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      geocodeAddress(address);
    } else {
      toast({
        title: "Address required",
        description: "Please enter an address to search",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Enter farm address or village name"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pr-10 border-farm-brown/30 focus:border-farm-green-dark"
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading} 
          className="bg-farm-green-dark hover:bg-farm-green-dark/90 text-white"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Searching</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Search size={18} />
              <span>Search</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddressSearch;
