import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, File, CheckCircle, AlertCircle, Clock, WifiOff } from "lucide-react";
import { useState } from "react";

const VideoUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'complete' | 'failed' | 'queued'>('idle');

  const uploadQueue = [
    { name: "sprint_assessment_1.mp4", size: "23.4 MB", status: "complete" },
    { name: "endurance_test_2.mp4", size: "18.7 MB", status: "uploading" },
    { name: "flexibility_demo.mp4", size: "15.2 MB", status: "queued" },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-athlete">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5 text-primary" />
            <span>Upload Assessment Video</span>
          </CardTitle>
          <CardDescription>
            Upload your performance videos for AI-powered analysis. Supported formats: MP4, MOV, AVI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">Drop your video here or click to browse</p>
            <p className="text-sm text-muted-foreground mb-4">Maximum file size: 100MB</p>
            <Button>Select Video File</Button>
          </div>

          {uploadStatus === 'uploading' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading video...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <WifiOff className="h-5 w-5 text-secondary" />
            <span>Upload Queue</span>
            <Badge variant="secondary">Offline-First</Badge>
          </CardTitle>
          <CardDescription>
            Videos are queued for upload when connection is available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {uploadQueue.map((video, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center space-x-3">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{video.name}</p>
                    <p className="text-sm text-muted-foreground">{video.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {video.status === 'complete' && (
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Complete
                    </Badge>
                  )}
                  {video.status === 'uploading' && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Uploading
                    </Badge>
                  )}
                  {video.status === 'queued' && (
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" />
                      Queued
                    </Badge>
                  )}
                  {video.status === 'failed' && (
                    <Badge variant="destructive">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Failed
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUpload;