import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { usersAPI } from "@/lib/api";

const PerformanceCharts = () => {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user || user.role !== 'athlete') {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await usersAPI.getPerformanceAnalytics();
        const data = response.data?.data || response.data;
        setAnalyticsData(data);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load performance analytics');
        console.error('Failed to fetch performance analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  // Default/fallback data when loading or no data available
  const performanceData = analyticsData?.performanceMetrics || [
    { metric: "Sprint Speed", current: 0, benchmark: 85, trend: "stable", change: "0%" },
    { metric: "Endurance", current: 0, benchmark: 80, trend: "stable", change: "0%" },
    { metric: "Agility", current: 0, benchmark: 85, trend: "stable", change: "0%" },
    { metric: "Strength", current: 0, benchmark: 85, trend: "stable", change: "0%" },
  ];

  const weeklyProgress = analyticsData?.chartData || [
    { week: "Week 1", score: 0 },
    { week: "Week 2", score: 0 },
    { week: "Week 3", score: 0 },
    { week: "Week 4", score: 0 },
    { week: "Week 5", score: 0 },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-athlete">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Performance Metrics</span>
          </CardTitle>
          <CardDescription>
            Compare your current performance against benchmarks and track improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {performanceData.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{metric.metric}</h4>
                  <div className="flex items-center space-x-2">
                    {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-success" />}
                    {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                    {metric.trend === 'stable' && <Minus className="h-4 w-4 text-muted-foreground" />}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-success' : 
                      metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current</span>
                    <span className="font-medium">{metric.current}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${metric.current}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Benchmark</span>
                    <span className="font-medium">{metric.benchmark}/100</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1">
                    <div 
                      className="bg-muted-foreground h-1 rounded-full"
                      style={{ width: `${metric.benchmark}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress Trend</CardTitle>
          <CardDescription>
            Your performance progression over the last 5 weeks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyProgress.map((week, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-16 text-sm font-medium">{week.week}</div>
                <div className="flex-1">
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-gradient-hero h-3 rounded-full transition-all duration-500"
                      style={{ width: `${week.score}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm font-medium text-right">{week.score}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-gradient-card">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="font-medium">Excellent Progress!</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You've improved by 17 points over the last 5 weeks. Keep up the great work!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceCharts;