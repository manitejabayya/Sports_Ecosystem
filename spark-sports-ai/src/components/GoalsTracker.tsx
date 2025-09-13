import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Calendar, Trophy, Plus, CheckCircle2 } from "lucide-react";

const GoalsTracker = () => {
  const goals = [
    {
      id: 1,
      title: "Improve 100m Sprint Time",
      target: "Sub 11.5 seconds",
      current: "11.8 seconds",
      progress: 85,
      deadline: "Dec 2024",
      status: "active",
      category: "Performance"
    },
    {
      id: 2,
      title: "Complete 30-Day Consistency Challenge",
      target: "30 training days",
      current: "28 days",
      progress: 93,
      deadline: "Nov 2024",
      status: "active",
      category: "Consistency"
    },
    {
      id: 3,
      title: "Achieve Regional Competition Qualification",
      target: "Sub 11.2 seconds",
      current: "11.8 seconds",
      progress: 45,
      deadline: "Mar 2025",
      status: "active",
      category: "Competition"
    },
    {
      id: 4,
      title: "Master Sprint Technique",
      target: "90+ technique score",
      current: "92 score",
      progress: 100,
      deadline: "Oct 2024",
      status: "completed",
      category: "Technique"
    }
  ];

  const milestones = [
    { date: "Nov 15", event: "Personal Best in 100m", completed: true },
    { date: "Nov 20", event: "Complete technique assessment", completed: true },
    { date: "Nov 25", event: "30-day consistency streak", completed: false },
    { date: "Dec 01", event: "Mid-season evaluation", completed: false },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-athlete">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Active Goals</span>
              </CardTitle>
              <CardDescription>
                Track your progress towards achieving your athletic goals
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{goal.title}</h4>
                    <Badge variant={goal.status === 'completed' ? 'default' : 'secondary'}>
                      {goal.category}
                    </Badge>
                    {goal.status === 'completed' && (
                      <Badge className="bg-success text-success-foreground">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{goal.deadline}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current: {goal.current}</span>
                    <span>Target: {goal.target}</span>
                  </div>
                  <Progress 
                    value={goal.progress} 
                    className={`h-3 ${goal.status === 'completed' ? 'opacity-75' : ''}`}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-secondary" />
            <span>Upcoming Milestones</span>
          </CardTitle>
          <CardDescription>
            Key dates and achievements on your journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  milestone.completed ? 'bg-success' : 'bg-muted-foreground'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${
                      milestone.completed ? 'text-muted-foreground' : ''
                    }`}>
                      {milestone.event}
                    </span>
                    <span className="text-sm text-muted-foreground">{milestone.date}</span>
                  </div>
                </div>
                {milestone.completed && (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsTracker;