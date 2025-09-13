import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Users,
  Target,
  BarChart3,
  Calendar,
  Activity
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section id="track" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">Dual Dashboard</span>
            <br />
            <span className="text-foreground">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored interfaces for athletes and coaches, each designed to maximize performance insights and development outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Athlete Dashboard */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">Athlete Dashboard</h3>
              <p className="text-muted-foreground">Track your journey, celebrate achievements, and stay motivated</p>
            </div>

            <Card className="shadow-athlete border-0 bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span>Performance Overview</span>
                  </CardTitle>
                  <Badge className="bg-primary text-primary-foreground">Level 7</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-performance-excellent">92</div>
                    <div className="text-sm text-muted-foreground">Fitness Score</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-background/50">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">Assessments</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Speed Improvement</span>
                    <span className="text-performance-good">+12%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Endurance Training</span>
                    <span className="text-performance-excellent">+24%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-success" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Completed 30-day consistency challenge</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">New personal best in sprint assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-sm">Joined district-level training program</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coach Dashboard */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">Coach Dashboard</h3>
              <p className="text-muted-foreground">Manage talents, analyze performance, and optimize training</p>
            </div>

            <Card className="shadow-coach border-0 bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-secondary" />
                    <span>Athletes Overview</span>
                  </CardTitle>
                  <Badge variant="secondary">24 Athletes</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-xl font-bold text-performance-excellent">18</div>
                    <div className="text-xs text-muted-foreground">Improving</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-xl font-bold text-performance-average">4</div>
                    <div className="text-xs text-muted-foreground">At Risk</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-background/50">
                    <div className="text-xl font-bold text-primary">2</div>
                    <div className="text-xs text-muted-foreground">Elite</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <span>Weekly Training Compliance</span>
                    </span>
                    <span className="text-success font-medium">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  <span>Performance Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm">Priya Singh</span>
                    </div>
                    <Badge className="bg-success text-success-foreground">+15% Speed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">Rahul Kumar</span>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Injury Alert</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="shadow-athlete">
            <Calendar className="mr-2 h-5 w-5" />
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;