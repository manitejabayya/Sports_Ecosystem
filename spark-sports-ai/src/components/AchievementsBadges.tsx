import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Trophy, Flame, Target, Zap, Shield, Crown } from "lucide-react";

const AchievementsBadges = () => {
  const badges = [
    {
      id: 1,
      name: "Speed Demon",
      description: "Achieved sub-12 second 100m sprint",
      icon: Zap,
      earned: true,
      earnedDate: "Nov 15, 2024",
      rarity: "gold",
      category: "Performance"
    },
    {
      id: 2,
      name: "Consistency Champion",
      description: "30 consecutive training days",
      icon: Flame,
      earned: true,
      earnedDate: "Nov 10, 2024",
      rarity: "silver",
      category: "Dedication"
    },
    {
      id: 3,
      name: "Technique Master",
      description: "Scored 90+ in technique assessment",
      icon: Star,
      earned: true,
      earnedDate: "Oct 28, 2024",
      rarity: "gold",
      category: "Skill"
    },
    {
      id: 4,
      name: "Rising Star",
      description: "Top 10% improvement in 3 months",
      icon: Crown,
      earned: true,
      earnedDate: "Oct 15, 2024",
      rarity: "platinum",
      category: "Growth"
    },
    {
      id: 5,
      name: "Goal Crusher",
      description: "Complete 5 athletic goals",
      icon: Target,
      earned: false,
      progress: 80,
      rarity: "gold",
      category: "Achievement"
    },
    {
      id: 6,
      name: "Elite Performer",
      description: "Achieve 95+ overall score",
      icon: Trophy,
      earned: false,
      progress: 65,
      rarity: "platinum",
      category: "Performance"
    },
    {
      id: 7,
      name: "Guardian",
      description: "Zero injuries for 6 months",
      icon: Shield,
      earned: false,
      progress: 40,
      rarity: "silver",
      category: "Health"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'platinum': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'gold': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'silver': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      default: return 'bg-gradient-to-r from-blue-500 to-blue-600';
    }
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="space-y-6">
      <Card className="shadow-athlete">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Earned Badges</span>
            <Badge className="bg-success text-success-foreground">{earnedBadges.length}</Badge>
          </CardTitle>
          <CardDescription>
            Celebrate your achievements and milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div key={badge.id} className="relative overflow-hidden rounded-lg border bg-gradient-card p-4">
                  <div className={`absolute inset-0 opacity-10 ${getRarityColor(badge.rarity)}`}></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-full ${getRarityColor(badge.rarity)}`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{badge.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {badge.rarity}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    <p className="text-xs text-muted-foreground">Earned: {badge.earnedDate}</p>
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
            <Target className="h-5 w-5 text-secondary" />
            <span>In Progress</span>
            <Badge variant="secondary">{inProgressBadges.length}</Badge>
          </CardTitle>
          <CardDescription>
            Badges you're currently working towards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inProgressBadges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div key={badge.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                  <div className="p-2 rounded-full bg-muted">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{badge.name}</h4>
                      <Badge variant="outline">{badge.rarity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
                    {badge.progress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{badge.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${badge.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsBadges;