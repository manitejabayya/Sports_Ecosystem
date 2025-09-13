import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Shield, TrendingUp, AlertTriangle, CheckCircle2, Eye, Download } from "lucide-react";

const AIAnalysis = () => {
  const analysisResults = {
    overallScore: 87,
    cheatDetection: "green",
    movements: [
      { name: "Sprint Start", score: 92, feedback: "Excellent block clearance and acceleration" },
      { name: "Mid-race Form", score: 85, feedback: "Good arm drive, slight improvement needed in stride length" },
      { name: "Finish", score: 83, feedback: "Strong finish, lean could be optimized" }
    ],
    predictions: {
      nextAssessment: 89,
      trend: "improving",
      recommendedFocus: "stride_length"
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-athlete">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Performance Analysis</span>
            <Badge className="bg-success text-success-foreground">Analysis Complete</Badge>
          </CardTitle>
          <CardDescription>
            Advanced AI analysis of your performance video with movement detection and insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-3xl font-bold text-performance-excellent mb-1">{analysisResults.overallScore}</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="flex items-center justify-center mb-2">
                <Shield className={`h-6 w-6 ${
                  analysisResults.cheatDetection === 'green' ? 'text-success' : 
                  analysisResults.cheatDetection === 'yellow' ? 'text-warning' : 'text-destructive'
                }`} />
              </div>
              <div className="text-sm text-muted-foreground">Authenticity Check</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-gradient-card">
              <div className="text-2xl font-bold text-primary mb-1">
                {analysisResults.predictions.nextAssessment}
              </div>
              <div className="text-sm text-muted-foreground">Predicted Next Score</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Movement Analysis</span>
            </h4>
            {analysisResults.movements.map((movement, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{movement.name}</span>
                  <span className="text-sm font-medium">{movement.score}/100</span>
                </div>
                <Progress value={movement.score} className="h-2" />
                <p className="text-sm text-muted-foreground">{movement.feedback}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <span>Predictive Analytics</span>
          </CardTitle>
          <CardDescription>
            AI-powered insights about your future performance trends
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <p className="font-medium">Performance Trend: Improving</p>
              <p className="text-sm text-muted-foreground">
                Based on your last 5 assessments, you're showing consistent improvement
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="font-medium">Focus Area: Stride Length</p>
              <p className="text-sm text-muted-foreground">
                AI recommends focusing on stride length optimization for maximum improvement
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button className="flex-1">
              View Training Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAnalysis;