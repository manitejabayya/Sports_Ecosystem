import Navigation from "@/components/Navigation";
import VideoUpload from "@/components/VideoUpload";
import AIAnalysis from "@/components/AIAnalysis";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Video, Upload, Brain, Wifi, WifiOff } from "lucide-react";

const VideoAssessment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Remote Talent Discovery
            </h1>
            <div className="flex items-center space-x-2">
              <WifiOff className="h-4 w-4 text-muted-foreground" />
              <Badge variant="secondary">Offline Mode</Badge>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Upload your performance videos for AI-powered analysis and talent assessment.
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Video</span>
            </TabsTrigger>
            <TabsTrigger value="record" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span>Record Live</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>AI Analysis</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <VideoUpload />
          </TabsContent>

          <TabsContent value="record" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Video className="h-5 w-5 text-primary" />
                  <span>Live Recording</span>
                </CardTitle>
                <CardDescription>
                  Record your performance directly using your device camera
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Video className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Camera access required</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Click to enable camera and start recording
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <AIAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoAssessment;