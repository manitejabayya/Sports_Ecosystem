import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Trophy, Flame, Target, Zap, Shield, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect, useState } from "react";

const AchievementsBadges = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [badges, setBadges] = useState<any[]>([]);

  useEffect(() => {
    // Get achievements from user profile data
    const userAchievements = profile?.profile?.achievements || (user as any)?.athleteData?.achievements || [];
    const userBadges = profile?.profile?.badges || (user as any)?.athleteData?.badges || [];
    
    // Icon mapping
    const iconMap: { [key: string]: any } = {
      'speed': Zap,
      'consistency': Flame,
      'technique': Star,
      'growth': Crown,
      'goal': Target,
      'performance': Trophy,
      'health': Shield,
      'award': Award
    };

    // Transform user achievements to badge format
    const transformedBadges = userBadges.map((badge: any, index: number) => ({
      id: badge.id || index + 1,
      name: badge.name || badge.title || "Achievement",
      description: badge.description || "Achievement earned",
      icon: iconMap[badge.iconType] || iconMap[badge.category?.toLowerCase()] || Award,
      earned: badge.earned || badge.status === 'earned' || false,
      earnedDate: badge.earnedDate || badge.dateEarned || "Recently",
      rarity: badge.rarity || "silver",
      category: badge.category || "General",
      progress: badge.progress || (badge.earned ? 100 : 0)
    }));

    // If no user badges, create default badges based on user data
    if (transformedBadges.length === 0) {
      const defaultBadges = [
        {
          id: 1,
          name: "Getting Started",
          description: "Welcome to your athletic journey",
          icon: Star,
          earned: true,
          earnedDate: "Account Created",
          rarity: "silver",
          category: "Welcome"
        }
      ];

      // Add badges based on user profile data
      if (profile?.profile?.goals?.shortTerm || profile?.profile?.goals?.longTerm) {
        defaultBadges.push({
          id: 2,
          name: "Goal Setter",
          description: "Set your first athletic goal",
          icon: Target,
          earned: true,
          earnedDate: "Profile Updated",
          rarity: "silver",
          category: "Planning"
        });
      }

      if (profile?.profile?.experience && parseInt(profile.profile.experience) > 2) {
        defaultBadges.push({
          id: 3,
          name: "Experienced Athlete",
          description: `${profile.profile.experience}+ years of experience`,
          icon: Crown,
          earned: true,
          earnedDate: "Profile Verified",
          rarity: "gold",
          category: "Experience"
        });
      }

      setBadges(defaultBadges);
    } else {
      setBadges(transformedBadges);
    }
  }, [user, profile]);

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