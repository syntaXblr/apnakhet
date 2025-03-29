
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MapPin, Map as MapIcon, Satellite } from 'lucide-react';
import Map from '@/components/Map';
import AddressSearch from '@/components/AddressSearch';
import WeatherCard from '@/components/WeatherCard';
import SoilCard from '@/components/SoilCard';
import InsightsCard from '@/components/InsightsCard';
import CropRecommendationCard from '@/components/CropRecommendationCard';
import LoadingOverlay from '@/components/LoadingOverlay';
import { FarmData, LocationCoordinates } from '@/types';
import { fetchFarmDataForLocation } from '@/services/mockApiService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationCoordinates | undefined>();
  const [farmData, setFarmData] = useState<FarmData | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('map');
  const { toast } = useToast();

  const handleLocationSelect = async (coordinates: LocationCoordinates) => {
    setSelectedLocation(coordinates);
    setLoading(true);
    
    try {
      // This would call our Python backend in a real application
      const data = await fetchFarmDataForLocation(
        coordinates, 
        `Lat: ${coordinates.latitude.toFixed(4)}, Lng: ${coordinates.longitude.toFixed(4)}`
      );
      setFarmData(data);
      
      toast({
        title: "Farm data loaded",
        description: "AI analysis of your farm location is complete.",
      });
    } catch (error) {
      console.error('Error fetching farm data:', error);
      toast({
        title: "Error loading data",
        description: "Could not fetch farm data for the selected location. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = async (coordinates: LocationCoordinates, address: string) => {
    setSelectedLocation(coordinates);
    setLoading(true);
    
    try {
      // This would call our Python backend in a real application
      const data = await fetchFarmDataForLocation(coordinates, address);
      setFarmData(data);
      
      toast({
        title: "Farm data loaded",
        description: "AI analysis for the selected address is complete.",
      });
    } catch (error) {
      console.error('Error fetching farm data:', error);
      toast({
        title: "Error loading data",
        description: "Could not fetch farm data for the selected address. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-farm-beige/30 dark:bg-gray-900">
      <header className="bg-farm-green-dark text-white p-4 sm:p-6">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Satellite size={28} />
              <h1 className="text-2xl font-bold">FarmSmart Satellite</h1>
            </div>
            <p className="text-sm sm:text-base opacity-90">
              AI-powered agricultural insights for smallholder farmers
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="border-farm-brown/10 mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-farm-brown">Farm Location</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter your farm address or select a location on the map to get AI-powered agricultural insights.
                </p>
                <AddressSearch onAddressSelect={handleAddressSelect} />
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                {farmData && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-farm-green-dark" />
                    <span className="font-medium text-farm-green-dark">
                      Last updated: {formatDate(farmData.lastUpdated)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <Card className="border-farm-brown/10 relative h-[400px] sm:h-[500px]">
            <CardContent className="p-0 h-full">
              <Tabs 
                defaultValue="map" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <div className="p-3 border-b">
                  <TabsList>
                    <TabsTrigger value="map" className="flex items-center gap-1">
                      <MapIcon size={16} />
                      Map View
                    </TabsTrigger>
                    <TabsTrigger 
                      value="insights" 
                      disabled={!farmData}
                      className="flex items-center gap-1"
                    >
                      <Satellite size={16} />
                      Satellite Insights
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="map" className="flex-grow">
                  <Map 
                    onLocationSelect={handleLocationSelect}
                    selectedLocation={selectedLocation}
                    className="h-full"
                  />
                </TabsContent>
                <TabsContent value="insights" className="p-4 overflow-y-auto h-full">
                  {farmData ? (
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <h2 className="text-lg font-semibold mb-1">Location Details</h2>
                        <p className="text-sm text-muted-foreground">{farmData.location.address}</p>
                        <p className="text-xs text-muted-foreground">
                          Lat: {farmData.location.coordinates.latitude.toFixed(4)}, 
                          Lng: {farmData.location.coordinates.longitude.toFixed(4)}
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Insights from AI Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          Based on satellite imagery analysis, weather data, and soil conditions, our AI
                          system has generated these recommendations specific to your farm location.
                        </p>
                      </div>
                      
                      <InsightsCard insights={farmData.insights} />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground">Select a location to see insights</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              {loading && <LoadingOverlay />}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {farmData ? (
              <>
                <WeatherCard weather={farmData.weather} />
                <SoilCard soil={farmData.soil} />
                <CropRecommendationCard recommendations={farmData.cropRecommendations} />
              </>
            ) : (
              <Card className="border-dashed border-muted-foreground/30">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
                  <Satellite size={48} className="text-muted-foreground/40 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Farm Data Available</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Please select a location on the map or search for an address to get AI-powered insights for your farm.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-farm-green-dark/10 py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>FarmSmart Satellite - AI-powered agricultural insights for smallholder farmers in India</p>
          <p className="mt-1">This is a demonstration of how satellite imagery and AI can help improve farming practices.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
