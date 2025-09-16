import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Plus, Zap, Target, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect, useState } from "react";

const TrainingLogs = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [trainingLogs, setTrainingLogs] = useState<any[]>([]);
  const [weeklyStats, setWeeklyStats] = useState({
    totalSessions: 0,
    totalHours: 0,
    avgIntensity: "Low",
    avgRating: 0
  });

  useEffect(() => {
    // Get training sessions from user data
    const userSessions = (user as any)?.athleteData?.trainingSessions || profile?.profile?.trainingSessions || [];
    
    // Transform training sessions to match component structure
    const transformedLogs = userSessions.map((session: any, index: number) => ({
      id: session.id || index + 1,
      date: session.date ? new Date(session.date).toLocaleDateString() : "Recent",
      type: session.type || session.workoutType || "Training",
      duration: session.duration ? `${session.duration} minutes` : "Unknown",
      location: session.location || "Training Facility",
      exercises: session.exercises || session.activities || [
        { name: session.type || "Exercise", sets: "1x", notes: session.notes || "Training completed" }
      ],
      intensity: session.intensity || "Medium",
      rating: session.rating || session.score || 7,
      notes: session.notes || session.description || "Training session completed"
    }));

    // If no user sessions, create a default entry
    if (transformedLogs.length === 0) {
      const defaultLogs = [
        {
          id: 1,
          date: new Date().toLocaleDateString(),
          type: "Welcome Session",
          duration: "0 minutes",
          location: "Get Started",
          exercises: [
            { name: "Profile Setup", sets: "1x", notes: "Complete your profile to track training" }
          ],
          intensity: "Low",
          rating: 0,
          notes: "Start logging your training sessions to track progress"
        }
      ];
      setTrainingLogs(defaultLogs);
    } else {
      setTrainingLogs(transformedLogs);
    }

    // Calculate weekly stats from user sessions
    const totalSessions = userSessions.length;
    const totalMinutes = userSessions.reduce((sum: number, session: any) => sum + (session.duration || 0), 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10;
    const avgRating = totalSessions > 0 
      ? Math.round((userSessions.reduce((sum: number, session: any) => sum + (session.rating || session.score || 0), 0) / totalSessions) * 10) / 10
      : 0;
    
    // Determine average intensity
    const intensities = userSessions.map((s: any) => s.intensity || 'Medium');
    const highCount = intensities.filter((i: string) => i === 'High').length;
    const mediumCount = intensities.filter((i: string) => i === 'Medium').length;
    const avgIntensity = highCount > mediumCount ? 'High' : mediumCount > 0 ? 'Medium' : 'Low';

    setWeeklyStats({
      totalSessions,
      totalHours,
      avgIntensity,
      avgRating
    });
  }, [user, profile]);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-athlete">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Training Summary</span>
              </CardTitle>
              <CardDescription>
                Your training performance this week
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Workout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-gradient-card">
              <div className="text-2xl font-bold text-primary mb-1">{weeklyStats.totalSessions}</div>
              <div className="text-sm text-muted-foreground">Sessions</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-card">
              <div className="text-2xl font-bold text-secondary mb-1">{weeklyStats.totalHours}h</div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-card">
              <div className="text-2xl font-bold text-warning mb-1">{weeklyStats.avgIntensity}</div>
              <div className="text-sm text-muted-foreground">Avg Intensity</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-card">
              <div className="text-2xl font-bold text-success mb-1">{weeklyStats.avgRating}/10</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <span>Recent Training Sessions</span>
          </CardTitle>
          <CardDescription>
            Detailed log of your recent workouts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trainingLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium">{log.type}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{log.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{log.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{log.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getIntensityColor(log.intensity)}>
                      <Zap className="mr-1 h-3 w-3" />
                      {log.intensity}
                    </Badge>
                    <Badge variant="outline">
                      ⭐ {log.rating}/10
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-sm">Exercises:</h5>
                  {log.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                      <div className="flex items-center space-x-2">
                        <Target className="h-3 w-3 text-primary" />
                        <span className="font-medium">{exercise.name}</span>
                        <Badge variant="secondary" className="text-xs">{exercise.sets}</Badge>
                      </div>
                      <span className="text-muted-foreground">{exercise.notes}</span>
                    </div>
                  ))}
                </div>

                {log.notes && (
                  <div className="text-sm p-3 rounded-lg bg-muted/30">
                    <span className="font-medium">Notes: </span>
                    <span className="text-muted-foreground">{log.notes}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainingLogs;