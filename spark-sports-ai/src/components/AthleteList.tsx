import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, TrendingUp, AlertTriangle, Eye } from "lucide-react";

const AthleteList = () => {
  const athletes = [
    {
      id: 1,
      name: "Priya Singh",
      sport: "Track & Field",
      level: 7,
      performance: 92,
      trend: "up",
      riskLevel: "low",
      lastAssessment: "2 days ago",
      avatar: "/placeholder.svg",
      location: "Delhi"
    },
    {
      id: 2,
      name: "Rahul Kumar",
      sport: "Sprint",
      level: 6,
      performance: 78,
      trend: "stable",
      riskLevel: "high",
      lastAssessment: "1 day ago",
      avatar: "/placeholder.svg",
      location: "Mumbai"
    },
    {
      id: 3,
      name: "Anita Sharma",
      sport: "Long Jump",
      level: 8,
      performance: 89,
      trend: "up",
      riskLevel: "low",
      lastAssessment: "3 days ago",
      avatar: "/placeholder.svg",
      location: "Bangalore"
    },
    {
      id: 4,
      name: "Vikram Patel",
      sport: "Javelin",
      level: 5,
      performance: 65,
      trend: "down",
      riskLevel: "medium",
      lastAssessment: "5 days ago",
      avatar: "/placeholder.svg",
      location: "Pune"
    },
    {
      id: 5,
      name: "Sneha Reddy",
      sport: "Hurdles",
      level: 7,
      performance: 85,
      trend: "up",
      riskLevel: "low",
      lastAssessment: "1 day ago",
      avatar: "/placeholder.svg",
      location: "Hyderabad"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      default: return <div className="h-4 w-4 bg-muted-foreground rounded-full"></div>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-coach">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-secondary" />
            <span>Athlete Management</span>
            <Badge className="bg-secondary text-secondary-foreground">24 Athletes</Badge>
          </CardTitle>
          <CardDescription>
            Monitor and manage your athletes' progress and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search athletes..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {athletes.map((athlete) => (
              <div key={athlete.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={athlete.avatar} />
                    <AvatarFallback>
                      {athlete.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="font-medium">{athlete.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        Level {athlete.level}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{athlete.sport}</span>
                      <span>•</span>
                      <span>{athlete.location}</span>
                      <span>•</span>
                      <span>Last assessment: {athlete.lastAssessment}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold">{athlete.performance}</div>
                    <div className="text-xs text-muted-foreground">Performance</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {getTrendIcon(athlete.trend)}
                    <span className="text-sm capitalize">{athlete.trend}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`h-4 w-4 ${getRiskColor(athlete.riskLevel)}`} />
                    <span className={`text-sm capitalize ${getRiskColor(athlete.riskLevel)}`}>
                      {athlete.riskLevel} Risk
                    </span>
                  </div>

                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AthleteList;