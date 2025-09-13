import Navigation from "@/components/Navigation";
import AthleteList from "@/components/AthleteList";
import CoachAnalytics from "@/components/CoachAnalytics";
import InjuryAlerts from "@/components/InjuryAlerts";
import TrainingPlans from "@/components/TrainingPlans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, AlertTriangle, Calendar, TrendingUp, Shield } from "lucide-react";

const CoachDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Coach Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your athletes, analyze performance, and optimize training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-coach">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5 text-secondary" />
                <span>Total Athletes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary mb-2">24</div>
              <div className="flex space-x-2">
                <Badge className="bg-performance-excellent text-performance-excellent-foreground">18 Active</Badge>
                <Badge variant="secondary">6 Inactive</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span>Avg Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success mb-2">87%</div>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>Risk Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive mb-2">3</div>
              <p className="text-sm text-muted-foreground">Injury risk high</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Training Plans</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <p className="text-sm text-muted-foreground">Active programs</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="athletes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="athletes" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Athletes</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Training Plans</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="athletes" className="space-y-6">
            <AthleteList />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <CoachAnalytics />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <InjuryAlerts />
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <TrainingPlans />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CoachDashboard;