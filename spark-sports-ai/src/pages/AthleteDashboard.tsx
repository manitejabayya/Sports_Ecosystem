import Navigation from "@/components/Navigation";
import PerformanceCharts from "@/components/PerformanceCharts";
import GoalsTracker from "@/components/GoalsTracker";
import AchievementsBadges from "@/components/AchievementsBadges";
import TrainingLogs from "@/components/TrainingLogs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Award, Calendar, Activity, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AthleteDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            {user?.name ? `Welcome, ${user.name}` : "My Performance Dashboard"}
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your progress, celebrate achievements, and reach new heights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-athlete">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Zap className="h-5 w-5 text-performance-excellent" />
                <span>Fitness Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-performance-excellent mb-2">92</div>
              <Progress value={92} className="h-2" />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Goals Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">7/10</div>
              <Progress value={70} className="h-2" />
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Award className="h-5 w-5 text-success" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">23</div>
              <p className="text-sm text-muted-foreground">Badges earned</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Activity className="h-5 w-5 text-secondary" />
                <span>Training Days</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary mb-2">45</div>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Goals</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Training Logs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceCharts />
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <GoalsTracker />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementsBadges />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <TrainingLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AthleteDashboard;