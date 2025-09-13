import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Download, Trash2, AlertTriangle } from "lucide-react";

const DataPrivacy = () => {
  const privacySettings = [
    {
      id: "profileVisibility",
      title: "Profile Visibility",
      description: "Make your profile visible to other athletes and coaches",
      enabled: true,
      category: "visibility"
    },
    {
      id: "performanceData",
      title: "Performance Data Sharing",
      description: "Allow coaches to view your performance analytics",
      enabled: true,
      category: "data"
    },
    {
      id: "trainingLogs",
      title: "Training Log Privacy",
      description: "Keep your training sessions private",
      enabled: false,
      category: "privacy"
    },
    {
      id: "achievementSharing",
      title: "Achievement Notifications",
      description: "Share your achievements on the community feed",
      enabled: true,
      category: "social"
    },
    {
      id: "locationTracking",
      title: "Location Services",
      description: "Use location for local competitions and events",
      enabled: true,
      category: "location"
    },
    {
      id: "dataAnalytics",
      title: "Anonymous Analytics",
      description: "Help improve the platform with anonymous usage data",
      enabled: true,
      category: "analytics"
    }
  ];

  const dataCategories = [
    {
      name: "Personal Information",
      items: ["Name", "Email", "Phone", "Date of Birth", "Location"],
      retention: "Account lifetime",
      purpose: "Account management and communication"
    },
    {
      name: "Performance Data",
      items: ["Assessment scores", "Training logs", "Progress metrics", "Video analyses"],
      retention: "5 years",
      purpose: "Performance tracking and AI model improvement"
    },
    {
      name: "Social Activity",
      items: ["Posts", "Comments", "Achievements", "Community interactions"],
      retention: "2 years after deletion",
      purpose: "Community engagement and platform improvement"
    },
    {
      name: "Device Information",
      items: ["Device type", "OS version", "App usage patterns", "IP address"],
      retention: "1 year",
      purpose: "Security and platform optimization"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Privacy Controls</span>
          </CardTitle>
          <CardDescription>
            Manage how your data is shared and used across the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {privacySettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Label htmlFor={setting.id} className="font-medium cursor-pointer">
                    {setting.title}
                  </Label>
                  <Badge variant="outline" className="text-xs">
                    {setting.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <Switch
                id={setting.id}
                checked={setting.enabled}
                className="ml-4"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-secondary" />
            <span>Data We Collect</span>
          </CardTitle>
          <CardDescription>
            Understand what data we collect and how it's used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataCategories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-card">
                <h4 className="font-medium mb-2">{category.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">Data Types:</span>
                    <ul className="mt-1 space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-current rounded-full"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-muted-foreground">Retention:</span>
                      <p>{category.retention}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Purpose:</span>
                      <p>{category.purpose}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>Data Rights & Actions</span>
          </CardTitle>
          <CardDescription>
            Exercise your data protection rights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Download className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Export Your Data</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Download a complete copy of your personal data and activity
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Request Data Export
              </Button>
            </div>

            <div className="p-4 rounded-lg border">
              <div className="flex items-center space-x-2 mb-2">
                <Trash2 className="h-4 w-4 text-destructive" />
                <h4 className="font-medium">Delete Account</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive" size="sm" className="w-full">
                Delete My Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-warning/20 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h4 className="font-medium text-warning mb-2">Important Privacy Information</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • Your performance data is used to improve AI models that benefit all athletes
                </p>
                <p>
                  • Video analyses are processed securely and deleted after processing unless saved by you
                </p>
                <p>
                  • Coaches can only see data for athletes they're actively training
                </p>
                <p>
                  • All data is encrypted in transit and at rest using industry-standard security
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataPrivacy;