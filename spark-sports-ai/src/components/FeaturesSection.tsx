import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  BarChart3, 
  Users, 
  Brain, 
  Trophy, 
  MapPin,
  Video,
  Shield,
  Target
} from "lucide-react";

const features = [
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Remote Talent Discovery",
    description: "Mobile-first, offline-capable AI assessments that work anywhere in India, from rural villages to urban centers.",
    badge: "AI-Powered",
    color: "text-primary"
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Performance Analytics",
    description: "Scientific tracking with predictive insights, injury prevention, and personalized training recommendations.",
    badge: "Data-Driven",
    color: "text-secondary"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Dual Dashboards",
    description: "Separate interfaces for athletes to track progress and coaches to manage multiple talents with advanced analytics.",
    badge: "User-Centric",
    color: "text-success"
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "ML Integration",
    description: "Advanced machine learning for cheat detection, performance benchmarking, and intelligent talent matching.",
    badge: "Smart Tech",
    color: "text-primary"
  },
  {
    icon: <Video className="h-8 w-8" />,
    title: "Video Analysis",
    description: "AI-powered video assessment that provides detailed biomechanical analysis and technique recommendations.",
    badge: "Innovation",
    color: "text-secondary"
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Inclusive Access",
    description: "Specially designed for marginalized communities, tribal youth, and girls with gamification and community support.",
    badge: "Social Impact",
    color: "text-success"
  }
];

const FeaturesSection = () => {
  return (
    <section id="discover" className="py-20 bg-gradient-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Revolutionizing Sports</span>
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">Talent Development</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform bridges the gap between raw talent and professional opportunities, 
            making world-class sports development accessible to every athlete in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${feature.color} p-2 rounded-lg bg-background shadow-sm`}>
                    {feature.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-primary font-medium">
            <Target className="h-5 w-5" />
            <span>Ready to discover your potential?</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;