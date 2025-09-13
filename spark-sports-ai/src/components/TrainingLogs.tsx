import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Plus, Zap, Target, TrendingUp } from "lucide-react";

const TrainingLogs = () => {
  const trainingLogs = [
    {
      id: 1,
      date: "Nov 18, 2024",
      type: "Sprint Training",
      duration: "90 minutes",
      location: "Track Stadium",
      exercises: [
        { name: "100m Sprints", sets: "6x", notes: "Personal best: 11.7s" },
        { name: "Block Starts", sets: "8x", notes: "Good reaction time" },
        { name: "Cool Down", sets: "1x", notes: "15min recovery" }
      ],
      intensity: "High",
      rating: 9,
      notes: "Excellent session, felt strong throughout"
    },
    {
      id: 2,
      date: "Nov 16, 2024",
      type: "Strength Training",
      duration: "75 minutes",
      location: "Gym",
      exercises: [
        { name: "Squats", sets: "4x8", notes: "80kg working weight" },
        { name: "Deadlifts", sets: "4x6", notes: "100kg, good form" },
        { name: "Plyometrics", sets: "3x10", notes: "Explosive movements" }
      ],
      intensity: "Medium",
      rating: 8,
      notes: "Good strength session, increased weight"
    },
    {
      id: 3,
      date: "Nov 14, 2024",
      type: "Endurance",
      duration: "60 minutes",
      location: "Park",
      exercises: [
        { name: "5km Run", sets: "1x", notes: "22:30 - steady pace" },
        { name: "Hill Repeats", sets: "6x", notes: "200m intervals" },
        { name: "Core Work", sets: "3x", notes: "Plank variations" }
      ],
      intensity: "Medium",
      rating: 7,
      notes: "Recovery session, focused on endurance"
    }
  ];

  const weeklyStats = {
    totalSessions: 5,
    totalHours: 7.5,
    avgIntensity: "Medium-High",
    avgRating: 8.2
  };

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