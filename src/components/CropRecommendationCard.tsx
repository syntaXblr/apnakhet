
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CropRecommendation } from '@/types';
import { Leaf } from 'lucide-react';

interface CropRecommendationCardProps {
  recommendations: CropRecommendation[];
}

const CropRecommendationCard: React.FC<CropRecommendationCardProps> = ({ recommendations }) => {
  return (
    <Card className="border-farm-green-light/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-farm-green-light">
          <Leaf size={24} />
          Recommended Crops
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.slice(0, 3).map((crop, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{crop.name}</span>
                <span className="text-sm">{crop.suitability.toFixed(0)}% suitable</span>
              </div>
              <Progress 
                value={crop.suitability} 
                className="h-2"
                indicatorClassName={
                  crop.suitability >= 85 ? "bg-green-500" :
                  crop.suitability >= 70 ? "bg-yellow-500" : "bg-orange-500"
                }
              />
              <div className="text-sm text-muted-foreground">
                Expected yield: {crop.expectedYield}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CropRecommendationCard;
