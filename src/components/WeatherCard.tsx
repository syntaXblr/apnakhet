
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/types';
import { Cloud, CloudRain, CloudSun, Sun } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (forecast: string) => {
    switch (forecast.toLowerCase()) {
      case 'sunny':
        return <Sun size={24} className="text-yellow-500" />;
      case 'partly cloudy':
        return <CloudSun size={24} className="text-blue-400" />;
      case 'overcast':
        return <Cloud size={24} className="text-gray-500" />;
      case 'light rain':
      case 'heavy rain':
        return <CloudRain size={24} className="text-blue-500" />;
      default:
        return <Sun size={24} className="text-yellow-500" />;
    }
  };

  return (
    <Card className="border-farm-blue/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-farm-blue">
          {getWeatherIcon(weather.forecast)}
          Weather Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Temperature</span>
            <span className="font-medium">{weather.temperature.toFixed(1)}°C</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Humidity</span>
            <span className="font-medium">{weather.humidity.toFixed(0)}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Rainfall</span>
            <span className="font-medium">{weather.rainfall.toFixed(1)} mm</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Forecast</span>
            <span className="font-medium">{weather.forecast}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
