import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Target, Clock, Plus, Edit, Eye, Brain } from "lucide-react";

const TrainingPlans = () => {
  const trainingPlans = [
    {
      id: 1,
      name: "Sprint Speed Development",
      description: "8-week intensive sprint training program",
      athletes: 8,
      duration: "8 weeks",
      progress: 65,
      status: "active",
      startDate: "Oct 1, 2024",
      endDate: "Nov 26, 2024",
      focus: ["Speed", "Technique", "Power"],
      aiGenerated: true,
      sessions: [
        { week: 1, completed: true, focus: "Base Building" },
        { week: 2, completed: true, focus: "Speed Endurance" },
        { week: 3, completed: true, focus: "Maximum Speed" },
        { week: 4, completed: true, focus: "Technique Refinement" },
        { week: 5, completed: true, focus: "Power Development" },
        { week: 6, completed: false, focus: "Competition Prep" },
        { week: 7, completed: false, focus: "Peak Performance" },
        { week: 8, completed: false, focus: "Recovery & Assessment" },
      ]
    },
    {
      id: 2,
      name: "Endurance Foundation",
      description: "12-week aerobic base building program",
      athletes: 6,
      duration: "12 weeks",
      progress: 42,
      status: "active",
      startDate: "Sep 15, 2024",
      endDate: "Dec 7, 2024",
      focus: ["Endurance", "Recovery", "Consistency"],
      aiGenerated: false,
      sessions: [
        { week: 1, completed: true, focus: "Easy Runs" },
        { week: 2, completed: true, focus: "Tempo Building" },
        { week: 3, completed: true, focus: "Long Runs" },
        { week: 4, completed: true, focus: "Recovery Week" },
        { week: 5, completed: true, focus: "Threshold Training" },
        { week: 6, completed: false, focus: "Hill Training" },
      ]
    },
    {
      id: 3,
      name: "Injury Recovery Protocol",
      description: "Personalized rehabilitation program",
      athletes: 2,
      duration: "6 weeks",
      progress: 85,
      status: "active",
      startDate: "Nov 1, 2024",
      endDate: "Dec 13, 2024",
      focus: ["Recovery", "Strength", "Mobility"],
      aiGenerated: true,
      sessions: [
        { week: 1, completed: true, focus: "Pain Management" },
        { week: 2, completed: true, focus: "Mobility Restoration" },
        { week: 3, completed: true, focus: "Strength Building" },
        { week: 4, completed: true, focus: "Functional Movement" },
        { week: 5, completed: true, focus: "Sport-Specific Prep" },
        { week: 6, completed: false, focus: "Return to Training" },
      ]
    },
    {
      id: 4,
      name: "Competition Preparation",
      description: "4-week pre-competition peaking program",
      athletes: 4,
      duration: "4 weeks",
      progress: 100,
      status: "completed",
      startDate: "Oct 1, 2024",
      endDate: "Oct 28, 2024",
      focus: ["Peaking", "Tapering", "Mental Prep"],
      aiGenerated: false,
      sessions: [
        { week: 1, completed: true, focus: "High Intensity" },
        { week: 2, completed: true, focus: "Speed Work" },
        { week: 3, completed: true, focus: "Tapering" },
        { week: 4, completed: true, focus: "Competition Ready" },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-coach">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Training Programs</span>
                <Badge className="bg-primary text-primary-foreground">12 Active</Badge>
              </CardTitle>
              <CardDescription>
                Manage and track your athletes' training programs
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Brain className="mr-2 h-4 w-4" />
                AI Generate
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Plan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trainingPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium">{plan.name}</h4>
                      {plan.aiGenerated && (
                        <Badge variant="outline" className="text-xs">
                          <Brain className="mr-1 h-3 w-3" />
                          AI
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{plan.athletes} athletes</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{plan.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {plan.focus.map((focus, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(plan.status)}>
                    {plan.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{plan.progress}%</span>
                  </div>
                  <Progress value={plan.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{plan.startDate}</span>
                    <span>{plan.endDate}</span>
                  </div>
                </div>

                {plan.status === 'active' && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Weekly Sessions</h5>
                    <div className="grid grid-cols-4 gap-2">
                      {plan.sessions.slice(0, 4).map((session, index) => (
                        <div key={index} className={`text-center p-2 rounded text-xs ${
                          session.completed ? 'bg-success/20 text-success' : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          <div className="font-medium">W{session.week}</div>
                          <div className="text-xs">{session.focus}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Active Programs</span>
                <span className="font-medium">9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completed This Month</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">AI Generated</span>
                <span className="font-medium">6</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">94%</div>
              <p className="text-sm text-muted-foreground">Program completion rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Next Milestone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Sprint Competition</span>
              </div>
              <p className="text-xs text-muted-foreground">Dec 15, 2024</p>
              <p className="text-xs text-muted-foreground">8 athletes participating</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingPlans;