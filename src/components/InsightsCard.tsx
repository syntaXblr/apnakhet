
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FarmInsight } from '@/types';
import { Droplets, Flower, Bug } from 'lucide-react';

interface InsightsCardProps {
  insights: FarmInsight;
}

const InsightsCard: React.FC<InsightsCardProps> = ({ insights }) => {
  return (
    <Card className="border-farm-green-dark/20 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-farm-green-dark">
          AI-Powered Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="irrigation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="irrigation" className="flex items-center gap-1">
              <Droplets size={16} />
              <span className="hidden sm:inline">Irrigation</span>
            </TabsTrigger>
            <TabsTrigger value="fertilizer" className="flex items-center gap-1">
              <Flower size={16} />
              <span className="hidden sm:inline">Fertilizer</span>
            </TabsTrigger>
            <TabsTrigger value="pesticide" className="flex items-center gap-1">
              <Bug size={16} />
              <span className="hidden sm:inline">Pesticide</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="irrigation" className="pt-4 space-y-3">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Recommendation:</h4>
              <p className="text-sm bg-blue-50 p-2 rounded-md dark:bg-blue-950/20">
                {insights.irrigation.recommendation}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="font-medium text-sm">Watering Schedule:</h4>
                <p className="text-sm">Every {insights.irrigation.schedule}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Water Requirement:</h4>
                <p className="text-sm">{insights.irrigation.waterRequired}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fertilizer" className="pt-4 space-y-3">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Recommendation:</h4>
              <p className="text-sm bg-green-50 p-2 rounded-md dark:bg-green-950/20">
                {insights.fertilizer.recommendation}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="font-medium text-sm">Application Timing:</h4>
                <p className="text-sm">Every {insights.fertilizer.timing}</p>
              </div>
              <div>
                <h4 className="font-medium text-sm">Recommended Amount:</h4>
                <p className="text-sm">{insights.fertilizer.amount}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pesticide" className="pt-4 space-y-3">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Recommendation:</h4>
              <p className="text-sm bg-yellow-50 p-2 rounded-md dark:bg-yellow-950/20">
                {insights.pesticide.recommendation}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h4 className="font-medium text-sm">Target Pests:</h4>
                <ul className="text-sm list-disc list-inside">
                  {insights.pesticide.targetPests.map((pest, idx) => (
                    <li key={idx}>{pest}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm">Application Method:</h4>
                <p className="text-sm">{insights.pesticide.application}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
