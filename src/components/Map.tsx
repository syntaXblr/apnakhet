
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationCoordinates } from '@/types';
import { cn } from '@/lib/utils';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet's default icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  onLocationSelect: (coords: LocationCoordinates) => void;
  selectedLocation?: LocationCoordinates;
  className?: string;
}

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }: { onLocationSelect: (coords: LocationCoordinates) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect({
        latitude: lat,
        longitude: lng,
      });
    },
  });
  return null;
}

const MapMyIndiaMap: React.FC<MapProps> = ({ onLocationSelect, selectedLocation, className }) => {
  const mapRef = useRef<any>(null);
  
  // Default center on India
  const defaultCenter = { lat: 20.5937, lng: 78.9629 };
  const defaultZoom = 5;

  // Predefined locations in India
  const predefinedLocations = [
    { name: "New Delhi", coords: { latitude: 28.6139, longitude: 77.2090 } },
    { name: "Mumbai", coords: { latitude: 19.0760, longitude: 72.8777 } },
    { name: "Bangalore", coords: { latitude: 12.9716, longitude: 77.5946 } },
    { name: "Kolkata", coords: { latitude: 22.5726, longitude: 88.3639 } },
  ];

  return (
    <div className={cn("relative w-full h-full rounded-lg overflow-hidden", className)}>
      <div className="relative w-full h-full">
        <MapContainer 
          center={selectedLocation ? [selectedLocation.latitude, selectedLocation.longitude] : [defaultCenter.lat, defaultCenter.lng]} 
          zoom={selectedLocation ? 10 : defaultZoom} 
          className="w-full h-full"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapClickHandler onLocationSelect={onLocationSelect} />
          
          {selectedLocation && (
            <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
              <Popup>
                Selected Location <br />
                Lat: {selectedLocation.latitude.toFixed(4)}, <br />
                Lng: {selectedLocation.longitude.toFixed(4)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapMyIndiaMap;
