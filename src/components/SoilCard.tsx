
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SoilData } from '@/types';
import { Database, Earth } from 'lucide-react';

interface SoilCardProps {
  soil: SoilData;
}

const SoilCard: React.FC<SoilCardProps> = ({ soil }) => {
  const getNutrientLevel = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 30) return 'Low';
    if (percentage < 70) return 'Medium';
    return 'High';
  };

  const getProgressColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="border-farm-brown/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-farm-brown">
          <Earth size={24} />
          Soil Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Soil Type:</span>
          <span className="text-sm font-semibold">{soil.type}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">pH Level:</span>
          <span className="text-sm font-semibold">{soil.ph.toFixed(1)}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Moisture:</span>
            <span className="text-sm font-semibold">{soil.moisture.toFixed(0)}%</span>
          </div>
          <Progress value={soil.moisture} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Nitrogen (N):</span>
            <span className="text-sm">{soil.nutrients.nitrogen} ppm - {getNutrientLevel(soil.nutrients.nitrogen, 120)}</span>
          </div>
          <Progress value={(soil.nutrients.nitrogen / 120) * 100} className={`h-2 ${getProgressColor(soil.nutrients.nitrogen, 120)}`} />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Phosphorus (P):</span>
            <span className="text-sm">{soil.nutrients.phosphorus} ppm - {getNutrientLevel(soil.nutrients.phosphorus, 80)}</span>
          </div>
          <Progress value={(soil.nutrients.phosphorus / 80) * 100} className={`h-2 ${getProgressColor(soil.nutrients.phosphorus, 80)}`} />
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Potassium (K):</span>
            <span className="text-sm">{soil.nutrients.potassium} ppm - {getNutrientLevel(soil.nutrients.potassium, 150)}</span>
          </div>
          <Progress value={(soil.nutrients.potassium / 150) * 100} className={`h-2 ${getProgressColor(soil.nutrients.potassium, 150)}`} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilCard;
