import Navigation from "@/components/Navigation";
import ProfileSettings from "@/components/ProfileSettings";
import DataPrivacy from "@/components/DataPrivacy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Shield, Settings, Bell, Lock, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const displayName = user?.name || "User";
  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Member";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Card className="shadow-athlete">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={(user as any)?.profile?.avatar || (user as any)?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-bold">{displayName}</h1>
                    <Badge className="bg-primary text-primary-foreground">{roleLabel}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {/* Additional profile summary can be sourced from profile context later */}
                    {user?.email}
                  </p>
                  <div className="flex space-x-2">
                    {/* Example tags; replace with real user profile tags when available */}
                    <Badge variant="secondary">Profile</Badge>
                    <Badge variant="secondary">{roleLabel}</Badge>
                    <Badge className="bg-success text-success-foreground">Active</Badge>
                  </div>
                </div>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="settings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <DataPrivacy />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Performance Updates</h4>
                      <p className="text-sm text-muted-foreground">Get notified about your progress</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Community Activity</h4>
                      <p className="text-sm text-muted-foreground">Posts, comments, and mentions</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Training Reminders</h4>
                      <p className="text-sm text-muted-foreground">Never miss a training session</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your account security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Login Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get alerted of new logins</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Data Export</h4>
                      <p className="text-sm text-muted-foreground">Download your data</p>
                    </div>
                    <Button variant="outline" size="sm">Request</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;