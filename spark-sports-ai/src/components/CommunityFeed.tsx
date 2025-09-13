import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Award, TrendingUp, Trophy, Target, Clock } from "lucide-react";

const CommunityFeed = () => {
  const feedPosts = [
    {
      id: 1,
      author: "Priya Singh",
      role: "Athlete",
      avatar: "/placeholder.svg",
      timestamp: "2 hours ago",
      type: "achievement",
      content: "Just broke my personal best in 100m sprint! 11.6 seconds - so close to that sub-11.5 goal! 🏃‍♀️⚡",
      media: null,
      stats: { likes: 24, comments: 8, shares: 3 },
      badges: ["Personal Best", "Sprint Record"],
      liked: true
    },
    {
      id: 2,
      author: "Coach Rajesh",
      role: "Coach",
      avatar: "/placeholder.svg",
      timestamp: "4 hours ago",
      type: "insight",
      content: "Great training session today with the sprint team. Seeing consistent improvement in block starts across all athletes. Remember: consistency beats perfection! 💪",
      media: null,
      stats: { likes: 15, comments: 5, shares: 7 },
      badges: [],
      liked: false
    },
    {
      id: 3,
      author: "Anita Sharma",
      role: "Athlete",
      avatar: "/placeholder.svg",
      timestamp: "6 hours ago",
      type: "milestone",
      content: "30-day training streak complete! 🔥 The consistency challenge really pushed me to show up every day, even when I didn't feel like it.",
      media: null,
      stats: { likes: 32, comments: 12, shares: 5 },
      badges: ["Consistency Champion", "30-Day Streak"],
      liked: true
    },
    {
      id: 4,
      author: "Vikram Patel",
      role: "Athlete",
      avatar: "/placeholder.svg",
      timestamp: "8 hours ago",
      type: "question",
      content: "Any tips for javelin throwing technique? I'm struggling with my release angle and could use some advice from experienced throwers.",
      media: null,
      stats: { likes: 8, comments: 15, shares: 2 },
      badges: [],
      liked: false
    },
    {
      id: 5,
      author: "Sneha Reddy",
      role: "Athlete",
      avatar: "/placeholder.svg",
      timestamp: "1 day ago",
      type: "achievement",
      content: "Qualified for the state-level hurdles championship! All those early morning training sessions are paying off. Thank you Coach Sarah for believing in me! 🏆",
      media: null,
      stats: { likes: 56, comments: 23, shares: 12 },
      badges: ["Qualifier", "State Level"],
      liked: true
    }
  ];

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="h-4 w-4 text-warning" />;
      case 'milestone': return <Target className="h-4 w-4 text-primary" />;
      case 'insight': return <TrendingUp className="h-4 w-4 text-secondary" />;
      default: return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'Coach' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground';
  };

  return (
    <div className="space-y-6">
      {feedPosts.map((post) => (
        <Card key={post.id} className="shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.avatar} />
                <AvatarFallback>
                  {post.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium">{post.author}</h4>
                  <Badge className={getRoleBadgeColor(post.role)} variant="secondary">
                    {post.role}
                  </Badge>
                  {getPostIcon(post.type)}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed">{post.content}</p>

            {post.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.badges.map((badge, index) => (
                  <Badge key={index} className="bg-success text-success-foreground">
                    <Award className="mr-1 h-3 w-3" />
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center space-x-2 ${post.liked ? 'text-destructive' : ''}`}
                >
                  <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                  <span>{post.stats.likes}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.stats.comments}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Share className="h-4 w-4" />
                  <span>{post.stats.shares}</span>
                </Button>
              </div>

              <Button variant="outline" size="sm">
                View Thread
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="bg-gradient-card">
        <CardContent className="text-center py-8">
          <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Join the Conversation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Share your achievements, ask questions, and connect with the community
          </p>
          <Button>Create Your First Post</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityFeed;