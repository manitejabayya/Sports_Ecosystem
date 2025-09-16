import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Target, BarChart3, Users, Home, Video, User, Award, Activity, Settings, ChevronDown, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { isAuthenticated, logout, user } = useAuth();

  const navItems = (() => {
    const items: any[] = [
      { name: 'Home', href: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    ];

    // Show Athlete section unless the user is a coach
    if (user?.role !== 'coach') {
      items.push({ 
        name: 'Athlete', 
        icon: <Activity className="h-4 w-4 mr-2" />,
        items: [
          { name: 'Dashboard', href: '/athlete-dashboard' },
          { name: 'Performance', href: '/athlete-dashboard#performance' },
          { name: 'Goals', href: '/athlete-dashboard#goals' },
          { name: 'Training Logs', href: '/athlete-dashboard#training' },
        ]
      });
    }

    // Show Coach section only if user is a coach (hide for athletes)
    if (user?.role === 'coach') {
      items.push({ 
        name: 'Coach', 
        icon: <Users className="h-4 w-4 mr-2" />,
        items: [
          { name: 'Dashboard', href: '/coach-dashboard' },
          { name: 'Athlete List', href: '/coach-dashboard#athletes' },
          { name: 'Analytics', href: '/coach-dashboard#analytics' },
          { name: 'Training Plans', href: '/coach-dashboard#training-plans' },
        ]
      });
    }

    items.push({ 
      name: 'Analyze', 
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      items: [
        { name: 'Video Assessment', href: '/video-assessment' },
        { name: 'Performance Charts', href: '/athlete-dashboard#performance' },
      ]
    });

    items.push({ 
      name: 'Community', 
      icon: <Users className="h-4 w-4 mr-2" />,
      href: '/community'
    });

    if (isAuthenticated) {
      items.push({ 
        name: 'Profile', 
        icon: <User className="h-4 w-4 mr-2" />,
        items: [
          { name: 'My Profile', href: '/profile' },
          { name: 'Settings', href: '/profile#settings' },
          { name: 'Data Privacy', href: '/profile#privacy' },
          { 
            name: 'Logout', 
            onClick: logout,
            isButton: true
          },
        ]
      });
    }

    return items;
  })();

  const renderNavItem = (item: any, mobile = false) => {
    if (item.items) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1">
              {item.icon}
              <span>{item.name}</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[200px]">
            {item.items.map((subItem: any) => (
              subItem.isButton ? (
                <DropdownMenuItem 
                  key={subItem.name} 
                  className="cursor-pointer"
                  onClick={subItem.onClick}
                >
                  {subItem.name}
                </DropdownMenuItem>
              ) : (
                <Link key={subItem.name} to={subItem.href}>
                  <DropdownMenuItem className="cursor-pointer">
                    {subItem.name}
                  </DropdownMenuItem>
                </Link>
              )
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    
    return (
      <a 
        href={item.href} 
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
          mobile ? 'block w-full text-left' : ''
        }`}
      >
        {item.icon}
        <span className={mobile ? 'ml-3' : 'ml-2'}>{item.name}</span>
      </a>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar when at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsScrolled(false);
        return;
      }
      
      // Set scrolled state for styling
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide/show navbar logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={cn(
        "bg-background/95 backdrop-blur-sm border-b border-border fixed w-full z-50 transition-transform duration-300 ease-in-out",
        isScrolled ? "shadow-md" : "shadow-none",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                TalentSport India
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {renderNavItem(item)}
              </div>
            ))}
            {!isAuthenticated && (
              <Link to="/login">
                <Button variant="default" className="ml-2">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/profile" className="ml-2 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={(user as any)?.profile?.avatar || (user as any)?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{(user?.name || "U").slice(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden lg:inline">{user?.name}</span>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
            {navItems.map((item) => (
              <div key={item.name} className="w-full">
                {renderNavItem(item, true)}
              </div>
            ))}
            {!isAuthenticated && (
              <Link to="/login" className="w-full">
                <Button variant="default" className="w-full mt-2">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;