import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Calendar, Trophy, Plus, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect, useState } from "react";

const GoalsTracker = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [goals, setGoals] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);

  useEffect(() => {
    // Get goals from user profile data
    const userGoals = profile?.profile?.goals || (user as any)?.athleteData?.goals || [];
    const userMilestones = profile?.profile?.milestones || (user as any)?.athleteData?.milestones || [];
    
    // Transform goals data to match component structure
    const transformedGoals = userGoals.map((goal: any, index: number) => ({
      id: goal.id || index + 1,
      title: goal.title || goal.shortTerm || goal.longTerm || goal.dream || "Goal",
      target: goal.target || goal.targetValue || "Not specified",
      current: goal.current || goal.currentValue || "0",
      progress: goal.progress || 0,
      deadline: goal.deadline || goal.targetDate || "TBD",
      status: goal.status || "active",
      category: goal.category || "General"
    }));

    // Transform milestones data
    const transformedMilestones = userMilestones.map((milestone: any) => ({
      date: milestone.date || milestone.targetDate || "TBD",
      event: milestone.event || milestone.title || milestone.description || "Milestone",
      completed: milestone.completed || milestone.status === 'completed' || false
    }));

    // If no user goals, show default structure with user's profile goals
    if (transformedGoals.length === 0 && (profile?.profile?.goals || (user as any)?.profile?.goals)) {
      const profileGoals = profile?.profile?.goals || (user as any)?.profile?.goals || {};
      const defaultGoals = [];
      
      if (profileGoals.shortTerm) {
        defaultGoals.push({
          id: 1,
          title: "Short-term Goal",
          target: profileGoals.shortTerm,
          current: "In Progress",
          progress: 25,
          deadline: "Next 6 months",
          status: "active",
          category: "Short-term"
        });
      }
      
      if (profileGoals.longTerm) {
        defaultGoals.push({
          id: 2,
          title: "Long-term Goal", 
          target: profileGoals.longTerm,
          current: "Planning",
          progress: 10,
          deadline: "1-2 years",
          status: "active",
          category: "Long-term"
        });
      }
      
      if (profileGoals.dream) {
        defaultGoals.push({
          id: 3,
          title: "Dream Goal",
          target: profileGoals.dream,
          current: "Vision",
          progress: 5,
          deadline: "Future",
          status: "active", 
          category: "Dream"
        });
      }
      
      setGoals(defaultGoals);
    } else {
      setGoals(transformedGoals);
    }

    setMilestones(transformedMilestones);
  }, [user, profile]);

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