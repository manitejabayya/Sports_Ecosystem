import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Shield, Clock, User, Phone, Eye, Calendar } from "lucide-react";

const InjuryAlerts = () => {
  const riskAlerts = [
    {
      id: 1,
      athleteName: "Rahul Kumar",
      riskLevel: "high",
      riskType: "Hamstring Strain",
      probability: 85,
      factors: ["Overtraining", "Fatigue levels high", "Previous injury"],
      lastAssessment: "1 day ago",
      recommendedAction: "Immediate rest and assessment",
      avatar: "/placeholder.svg",
      contact: "+91 98765 43210"
    },
    {
      id: 2,
      athleteName: "Anita Sharma",
      riskLevel: "medium",
      riskType: "Knee Stress",
      probability: 65,
      factors: ["Increased training load", "Biomechanical issues"],
      lastAssessment: "2 days ago",
      recommendedAction: "Modified training plan",
      avatar: "/placeholder.svg",
      contact: "+91 98765 43211"
    },
    {
      id: 3,
      athleteName: "Vikram Patel",
      riskLevel: "medium",
      riskType: "Shoulder Impingement",
      probability: 58,
      factors: ["Technique deviation", "Insufficient recovery"],
      lastAssessment: "3 days ago",
      recommendedAction: "Form correction needed",
      avatar: "/placeholder.svg",
      contact: "+91 98765 43212"
    }
  ];

  const injuryHistory = [
    {
      athleteName: "Priya Singh",
      injuryType: "Ankle Sprain",
      date: "Oct 15, 2024",
      status: "Recovered",
      recoveryDays: 14
    },
    {
      athleteName: "Sneha Reddy",
      injuryType: "Muscle Strain",
      date: "Sep 28, 2024",
      status: "Recovered",
      recoveryDays: 7
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return {
        bg: 'bg-destructive/10',
        text: 'text-destructive',
        border: 'border-destructive/20'
      };
      case 'medium': return {
        bg: 'bg-warning/10',
        text: 'text-warning',
        border: 'border-warning/20'
      };
      case 'low': return {
        bg: 'bg-success/10',
        text: 'text-success',
        border: 'border-success/20'
      };
      default: return {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        border: 'border-muted'
      };
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-coach">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span>Active Risk Alerts</span>
            <Badge variant="destructive">{riskAlerts.length} Active</Badge>
          </CardTitle>
          <CardDescription>
            AI-powered injury risk detection and prevention alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAlerts.map((alert) => {
              const colors = getRiskColor(alert.riskLevel);
              return (
                <div key={alert.id} className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={alert.avatar} />
                        <AvatarFallback>
                          {alert.athleteName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{alert.athleteName}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Assessment: {alert.lastAssessment}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={colors.text} variant="outline">
                      {alert.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h5 className="font-medium text-sm mb-2">Risk Assessment</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{alert.riskType}</span>
                          <span className="font-medium">{alert.probability}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              alert.riskLevel === 'high' ? 'bg-destructive' : 
                              alert.riskLevel === 'medium' ? 'bg-warning' : 'bg-success'
                            }`}
                            style={{ width: `${alert.probability}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-sm mb-2">Risk Factors</h5>
                      <div className="space-y-1">
                        {alert.factors.map((factor, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium">Recommended Action: </span>
                      <span className="text-sm">{alert.recommendedAction}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="mr-2 h-3 w-3" />
                        Call
                      </Button>
                      <Button size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Injury Prevention Stats</span>
          </CardTitle>
          <CardDescription>
            Track your team's injury prevention success
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-success mb-1">89%</div>
              <div className="text-sm text-muted-foreground">Prevention Success</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-primary mb-1">2</div>
              <div className="text-sm text-muted-foreground">Injuries Prevented</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-secondary mb-1">145</div>
              <div className="text-sm text-muted-foreground">Days Injury-Free</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-secondary" />
            <span>Recent Injury History</span>
          </CardTitle>
          <CardDescription>
            Past injuries and recovery tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {injuryHistory.map((injury, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">{injury.athleteName}</span>
                    <span className="text-muted-foreground"> - {injury.injuryType}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-muted-foreground">{injury.date}</span>
                  <Badge className="bg-success text-success-foreground">
                    {injury.status}
                  </Badge>
                  <span className="text-muted-foreground">{injury.recoveryDays} days</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InjuryAlerts;