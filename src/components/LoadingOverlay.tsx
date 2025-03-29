
import { Satellite } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Processing satellite imagery...' }) => {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="flex flex-col items-center space-y-4">
        <Satellite size={48} className="text-farm-green-dark animate-spin-slow" />
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-medium text-farm-green-dark">{message}</h3>
          <p className="text-sm text-muted-foreground max-w-md text-center mt-2">
            Our AI system is analyzing the latest satellite data for your selected location to provide accurate recommendations.
          </p>
        </div>
        <div className="w-48 h-2 bg-muted overflow-hidden rounded-full">
          <div className="h-full bg-farm-green-dark animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
