import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-sports.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // If user is authenticated, navigate to video assessment
      navigate('/video-assessment');
    } else {
      // If not authenticated, navigate to register page
      navigate('/register');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Young Indian athletes showcasing diverse sports talents"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Discover India's
            </span>
            <br />
            <span className="text-foreground">Hidden Sports Talent</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Democratizing sports talent discovery with AI-powered assessments, 
            scientific performance tracking, and inclusive development programs 
            for athletes across rural and urban India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 shadow-athlete hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Start Discovery Assessment' : 'Get Started'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 bg-background/50 backdrop-blur-sm hover:bg-background/70"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-muted-foreground">Athletes Assessed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">1,200+</div>
              <div className="text-muted-foreground">Coaches Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-success mb-2">85%</div>
              <div className="text-muted-foreground">Performance Improvement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;