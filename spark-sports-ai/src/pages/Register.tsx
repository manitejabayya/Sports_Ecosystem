import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Eye, EyeOff, Mail, Lock, User, MapPin, Phone, Calendar,
  Trophy, Users, Target, Shield, ArrowRight, CheckCircle 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  state: string;
  district: string;
  sport: string;
  specialization: string;
  experience: string;
  bio: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingOptIn: boolean;
};

type RegisterFormErrors = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  state: string;
  district: string;
  sport: string;
  specialization: string;
  experience: string;
  bio: string;
  termsAccepted: string;
  privacyAccepted: string;
  marketingOptIn: string;
}>;

const Register = () => {
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    
    // Profile Info
    dateOfBirth: "",
    gender: "",
    location: "",
    state: "",
    district: "",
    
    // Role-specific Info
    sport: "",
    specialization: "",
    experience: "",
    bio: "",
    
    // Agreements
    termsAccepted: false,
    privacyAccepted: false,
    marketingOptIn: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    { value: "athlete", label: "Athlete", icon: Trophy, desc: "Track your performance and compete" },
    { value: "coach", label: "Coach", icon: Users, desc: "Train and mentor athletes" },
    { value: "scout", label: "Scout", icon: Target, desc: "Discover new talent" },
    { value: "parent", label: "Parent/Guardian", icon: Shield, desc: "Support your child's journey" }
  ];

  const sports = [
    "Track & Field", "Swimming", "Basketball", "Football", "Cricket", 
    "Tennis", "Badminton", "Hockey", "Boxing", "Wrestling", 
    "Weightlifting", "Cycling", "Gymnastics", "Other"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear related errors
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number): RegisterFormErrors => {
    const newErrors: RegisterFormErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      if (!formData.role) newErrors.role = 'Please select a role';
      if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    if (step === 2) {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.location) newErrors.location = 'Location is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.district) newErrors.district = 'District is required';
    }
    
    if (step === 3) {
      if (formData.role === 'athlete' && !formData.sport) {
        newErrors.sport = 'Sport is required for athletes';
      }
      if (formData.role === 'coach' && !formData.experience) {
        newErrors.experience = 'Experience is required for coaches';
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'You must accept the terms and conditions';
      }
      if (!formData.privacyAccepted) {
        newErrors.privacyAccepted = 'You must accept the privacy policy';
      }
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length === 0) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    // Validate all steps before submission
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Final validation before submission
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "Passwords do not match"
      }));
      return;
    }

    if (!formData.termsAccepted || !formData.privacyAccepted) {
      toast({
        variant: "destructive",
        title: "Accept terms and conditions",
        description: "You must accept the terms and conditions and privacy policy to continue.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the data for registration
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        profile: {
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          location: formData.location,
          state: formData.state,
          district: formData.district,
          sport: formData.sport,
          specialization: formData.specialization,
          experience: formData.experience,
          bio: formData.bio,
        },
      };

      // Call the register function from AuthContext with the correct number of arguments
      await register(
        userData.name,
        userData.email,
        userData.password,
        userData.role as 'athlete' | 'coach' | 'scout',
        userData.profile
      );

      toast({
        title: "Registration successful!",
        description: "Your account has been created successfully.",
      });

      // Redirect to dashboard based on role
      const redirectPath = formData.role === 'athlete' ? '/athlete-dashboard' : '/coach-dashboard';
      navigate(redirectPath, { replace: true });
    } catch (error: any) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "An error occurred during registration. Please try again.";
      
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Priya"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Singh"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="priya@example.com"
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+91 9876543210"
                  className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label>I am a...</Label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <div
                      key={role.value}
                      onClick={() => handleSelectChange("role", role.value)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        formData.role === role.value 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <IconComponent className={`h-5 w-5 mt-0.5 ${
                          formData.role === role.value ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{role.label}</p>
                          <p className="text-xs text-muted-foreground">{role.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {errors.role && <p className="text-sm text-destructive">{errors.role}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className={`pl-10 ${errors.dateOfBirth ? "border-destructive" : ""}`}
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => handleSelectChange("gender", value)} value={formData.gender}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select onValueChange={(value) => handleSelectChange("state", value)} value={formData.state}>
                <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="Enter your district"
                  value={formData.district}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">City/Village</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter your location"
                    className={`pl-10 ${errors.location ? "border-destructive" : ""}`}
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {formData.role === "athlete" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="sport">Primary Sport</Label>
                  <Select onValueChange={(value) => handleSelectChange("sport", value)} value={formData.sport}>
                    <SelectTrigger className={errors.sport ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select your sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sport && <p className="text-sm text-destructive">{errors.sport}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    placeholder="e.g., 100m Sprint, Long Jump"
                    value={formData.specialization}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {formData.role === "coach" && (
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select onValueChange={(value) => handleSelectChange("experience", value)} value={formData.experience}>
                  <SelectTrigger className={errors.experience ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experience && <p className="text-sm text-destructive">{errors.experience}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself and your sports journey..."
                className="min-h-[100px]"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleSelectChange("termsAccepted", checked)}
                  className={errors.termsAccepted ? "border-destructive" : ""}
                />
                <div className="text-sm">
                  <label htmlFor="termsAccepted" className="cursor-pointer">
                    I accept the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                  {errors.termsAccepted && <p className="text-destructive mt-1">{errors.termsAccepted}</p>}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => handleSelectChange("privacyAccepted", checked)}
                  className={errors.privacyAccepted ? "border-destructive" : ""}
                />
                <div className="text-sm">
                  <label htmlFor="privacyAccepted" className="cursor-pointer">
                    I accept the{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.privacyAccepted && <p className="text-destructive mt-1">{errors.privacyAccepted}</p>}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketingOptIn"
                  checked={formData.marketingOptIn}
                  onCheckedChange={(checked) => handleSelectChange("marketingOptIn", checked)}
                />
                <div className="text-sm">
                  <label htmlFor="marketingOptIn" className="cursor-pointer">
                    I would like to receive updates about new features, events, and opportunities
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Join Sports Talent Hub
          </h1>
          <p className="text-muted-foreground">
            Start your sports journey with AI-powered talent discovery
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="shadow-athlete">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step < currentStep
                        ? "bg-primary text-primary-foreground"
                        : step === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-1 w-16 sm:w-24 ml-2 ${
                        step < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Basic Info</span>
              <span>Profile</span>
              <span>Complete</span>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card className="shadow-athlete">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Profile Details"}
              {currentStep === 3 && "Complete Registration"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Let's start with your basic information"}
              {currentStep === 2 && "Tell us more about yourself"}
              {currentStep === 3 && "Finish setting up your profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
              {renderStepContent()}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isLoading}
                  >
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Create Account</span>
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium">AI Video Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Get instant feedback on your performance with our AI-powered video analysis
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium">Performance Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  Track your progress with scientific metrics and personalized insights
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium">Connect & Compete</h4>
                <p className="text-sm text-muted-foreground">
                  Join a community of athletes, coaches, and scouts across India
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inclusivity Message */}
        <Card className="bg-gradient-to-r from-success/5 to-primary/5 border-success/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <Badge className="bg-success text-success-foreground mb-2">
                Inclusive Sports Development
              </Badge>
              <p className="text-sm text-muted-foreground">
                Supporting athletes from all backgrounds, including rural areas, tribal communities, 
                and underrepresented regions across India
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;