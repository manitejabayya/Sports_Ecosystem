import Navigation from "@/components/Navigation";
import CommunityFeed from "@/components/CommunityFeed";
import Leaderboards from "@/components/Leaderboards";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Trophy, Users, Plus, Flame, Star } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Community Hub
            </h1>
            <Button className="shadow-athlete">
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
          <p className="text-lg text-muted-foreground">
            Connect with athletes and coaches, share achievements, and inspire each other.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">2,847</div>
              <p className="text-sm text-muted-foreground">Active this month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-secondary" />
                <span>Posts Today</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary mb-2">156</div>
              <p className="text-sm text-muted-foreground">+24% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Flame className="h-5 w-5 text-destructive" />
                <span>Streak</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive mb-2">15</div>
              <p className="text-sm text-muted-foreground">Days active</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Star className="h-5 w-5 text-warning" />
                <span>Your Rank</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning mb-2">#47</div>
              <Badge className="bg-success text-success-foreground">+12 this week</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="feed" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Community Feed</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboards" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Leaderboards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <CommunityFeed />
          </TabsContent>

          <TabsContent value="leaderboards" className="space-y-6">
            <Leaderboards />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;