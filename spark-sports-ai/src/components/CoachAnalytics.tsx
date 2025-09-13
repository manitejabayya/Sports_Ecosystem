import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Award, Target, Activity } from "lucide-react";

const CoachAnalytics = () => {
  const analyticsData = {
    teamPerformance: {
      average: 84,
      improvement: 12,
      topPerformers: 6,
      needsAttention: 3
    },
    trainingCompliance: {
      thisWeek: 87,
      lastWeek: 82,
      monthly: 85
    },
    performanceDistribution: [
      { range: "Elite (90-100)", count: 2, percentage: 8 },
      { range: "Advanced (80-89)", count: 8, percentage: 33 },
      { range: "Intermediate (70-79)", count: 10, percentage: 42 },
      { range: "Beginner (60-69)", count: 4, percentage: 17 }
    ],
    sportBreakdown: [
      { sport: "Track & Field", athletes: 12, avgScore: 86 },
      { sport: "Sprints", athletes: 6, avgScore: 88 },
      { sport: "Field Events", athletes: 4, avgScore: 82 },
      { sport: "Distance", athletes: 2, avgScore: 79 }
    ]
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-coach">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-secondary" />
            <span>Team Performance Overview</span>
          </CardTitle>
          <CardDescription>
            Comprehensive analytics of your athletes' performance and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-secondary mb-1">
                {analyticsData.teamPerformance.average}
              </div>
              <div className="text-sm text-muted-foreground">Team Average</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-success mb-1">
                +{analyticsData.teamPerformance.improvement}%
              </div>
              <div className="text-sm text-muted-foreground">Monthly Growth</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-primary mb-1">
                {analyticsData.teamPerformance.topPerformers}
              </div>
              <div className="text-sm text-muted-foreground">Top Performers</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-destructive mb-1">
                {analyticsData.teamPerformance.needsAttention}
              </div>
              <div className="text-sm text-muted-foreground">Need Attention</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Training Compliance</span>
            </CardTitle>
            <CardDescription>
              Weekly training session attendance rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">This Week</span>
                <span className="text-sm font-bold">{analyticsData.trainingCompliance.thisWeek}%</span>
              </div>
              <Progress value={analyticsData.trainingCompliance.thisWeek} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Last Week</span>
                <span className="text-sm font-bold">{analyticsData.trainingCompliance.lastWeek}%</span>
              </div>
              <Progress value={analyticsData.trainingCompliance.lastWeek} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Monthly Average</span>
                <span className="text-sm font-bold">{analyticsData.trainingCompliance.monthly}%</span>
              </div>
              <Progress value={analyticsData.trainingCompliance.monthly} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-secondary" />
              <span>Performance Distribution</span>
            </CardTitle>
            <CardDescription>
              How your athletes are distributed across performance levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.performanceDistribution.map((level, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{level.range}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{level.count} athletes</span>
                    <Badge variant="outline" className="text-xs">
                      {level.percentage}%
                    </Badge>
                  </div>
                </div>
                <Progress value={level.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Sport Category Breakdown</span>
          </CardTitle>
          <CardDescription>
            Performance analysis by sport category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analyticsData.sportBreakdown.map((sport, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-card">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{sport.sport}</h4>
                  <Badge className="bg-secondary text-secondary-foreground">
                    {sport.athletes} athletes
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Score</span>
                    <span className="font-medium">{sport.avgScore}/100</span>
                  </div>
                  <Progress value={sport.avgScore} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachAnalytics;