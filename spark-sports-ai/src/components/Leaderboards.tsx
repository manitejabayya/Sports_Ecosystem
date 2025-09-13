import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Award, TrendingUp, Crown, Star, Flame } from "lucide-react";

const Leaderboards = () => {
  const performanceLeaderboard = [
    {
      rank: 1,
      name: "Priya Singh",
      score: 94,
      sport: "Track & Field",
      location: "Delhi",
      avatar: "/placeholder.svg",
      trend: "up",
      change: "+3"
    },
    {
      rank: 2,
      name: "Anita Sharma",
      score: 92,
      sport: "Long Jump",
      location: "Bangalore",
      avatar: "/placeholder.svg",
      trend: "up",
      change: "+2"
    },
    {
      rank: 3,
      name: "Sneha Reddy",
      score: 89,
      sport: "Hurdles",
      location: "Hyderabad",
      avatar: "/placeholder.svg",
      trend: "stable",
      change: "0"
    },
    {
      rank: 4,
      name: "Rahul Kumar",
      score: 87,
      sport: "Sprint",
      location: "Mumbai",
      avatar: "/placeholder.svg",
      trend: "down",
      change: "-1"
    },
    {
      rank: 5,
      name: "Vikram Patel",
      score: 85,
      sport: "Javelin",
      location: "Pune",
      avatar: "/placeholder.svg",
      trend: "up",
      change: "+4"
    }
  ];

  const consistencyLeaderboard = [
    {
      rank: 1,
      name: "Anita Sharma",
      streak: 45,
      sport: "Long Jump",
      location: "Bangalore",
      avatar: "/placeholder.svg"
    },
    {
      rank: 2,
      name: "Sneha Reddy",
      streak: 38,
      sport: "Hurdles",
      location: "Hyderabad",
      avatar: "/placeholder.svg"
    },
    {
      rank: 3,
      name: "Priya Singh",
      streak: 32,
      sport: "Track & Field",
      location: "Delhi",
      avatar: "/placeholder.svg"
    }
  ];

  const improvementLeaderboard = [
    {
      rank: 1,
      name: "Vikram Patel",
      improvement: 18,
      sport: "Javelin",
      location: "Pune",
      avatar: "/placeholder.svg",
      timeframe: "3 months"
    },
    {
      rank: 2,
      name: "Rahul Kumar",
      improvement: 15,
      sport: "Sprint",
      location: "Mumbai",
      avatar: "/placeholder.svg",
      timeframe: "2 months"
    },
    {
      rank: 3,
      name: "Priya Singh",
      improvement: 12,
      sport: "Track & Field",
      location: "Delhi",
      avatar: "/placeholder.svg",
      timeframe: "1 month"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-warning" />;
      case 2: return <Medal className="h-5 w-5 text-muted-foreground" />;
      case 3: return <Award className="h-5 w-5 text-orange-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case 2: return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      case 3: return "bg-gradient-to-r from-orange-600 to-red-600 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string, change: string) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
    return <div className="h-4 w-4 bg-muted-foreground rounded-full"></div>;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <Trophy className="h-4 w-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="consistency" className="flex items-center space-x-2">
            <Flame className="h-4 w-4" />
            <span>Consistency</span>
          </TabsTrigger>
          <TabsTrigger value="improvement" className="flex items-center space-x-2">
            <Star className="h-4 w-4" />
            <span>Most Improved</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card className="shadow-athlete">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-warning" />
                <span>Performance Leaderboard</span>
              </CardTitle>
              <CardDescription>
                Top performers based on overall assessment scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceLeaderboard.map((athlete) => (
                  <div key={athlete.rank} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(athlete.rank)}`}>
                        {athlete.rank <= 3 ? getRankIcon(athlete.rank) : athlete.rank}
                      </div>
                      
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={athlete.avatar} />
                        <AvatarFallback>
                          {athlete.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-medium">{athlete.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{athlete.sport}</span>
                          <span>•</span>
                          <span>{athlete.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{athlete.score}</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(athlete.trend, athlete.change)}
                        <span className={`text-sm font-medium ${
                          athlete.trend === 'up' ? 'text-success' : 
                          athlete.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                        }`}>
                          {athlete.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consistency" className="space-y-4">
          <Card className="shadow-athlete">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-destructive" />
                <span>Consistency Champions</span>
              </CardTitle>
              <CardDescription>
                Athletes with the longest training streaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consistencyLeaderboard.map((athlete) => (
                  <div key={athlete.rank} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(athlete.rank)}`}>
                        {athlete.rank <= 3 ? getRankIcon(athlete.rank) : athlete.rank}
                      </div>
                      
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={athlete.avatar} />
                        <AvatarFallback>
                          {athlete.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-medium">{athlete.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{athlete.sport}</span>
                          <span>•</span>
                          <span>{athlete.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">{athlete.streak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="improvement" className="space-y-4">
          <Card className="shadow-athlete">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-primary" />
                <span>Most Improved Athletes</span>
              </CardTitle>
              <CardDescription>
                Athletes showing the highest performance gains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {improvementLeaderboard.map((athlete) => (
                  <div key={athlete.rank} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(athlete.rank)}`}>
                        {athlete.rank <= 3 ? getRankIcon(athlete.rank) : athlete.rank}
                      </div>
                      
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={athlete.avatar} />
                        <AvatarFallback>
                          {athlete.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h4 className="font-medium">{athlete.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{athlete.sport}</span>
                          <span>•</span>
                          <span>{athlete.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">+{athlete.improvement}%</div>
                      <div className="text-xs text-muted-foreground">in {athlete.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboards;