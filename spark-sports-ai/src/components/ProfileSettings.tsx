import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, Target, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useState, useEffect } from "react";

const ProfileSettings = () => {
  const { user } = useAuth();
  const { profile, updateProfile, loading } = useProfile();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    city: "",
    state: "",
    age: "",
    experience: "",
    birthDate: "",
    level: "",
    coach: "",
    club: "",
    shortTermGoal: "",
    longTermGoal: "",
    dreamGoal: "",
    motivation: ""
  });

  // Initialize form data from user/profile data
  useEffect(() => {
    if (user || profile) {
      const userData = profile || user;
      const fullName = userData?.name || "";
      const [firstName, ...rest] = fullName.split(" ");
      const lastName = rest.join(" ");

      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: userData?.email || "",
        phone: userData?.profile?.phone || "",
        bio: userData?.profile?.bio || "",
        city: userData?.profile?.location?.city || "",
        state: userData?.profile?.location?.state || "",
        age: userData?.profile?.age?.toString() || "",
        experience: userData?.profile?.experience?.toString() || "",
        birthDate: userData?.profile?.dateOfBirth || "",
        level: userData?.profile?.level || "",
        coach: userData?.profile?.coach || "",
        club: userData?.profile?.club || "",
        shortTermGoal: userData?.profile?.goals?.shortTerm || "",
        longTermGoal: userData?.profile?.goals?.longTerm || "",
        dreamGoal: userData?.profile?.goals?.dream || "",
        motivation: userData?.profile?.motivation || ""
      });
    }
  }, [user, profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      const profileData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        profile: {
          phone: formData.phone,
          bio: formData.bio,
          location: {
            city: formData.city,
            state: formData.state
          },
          age: parseInt(formData.age) || undefined,
          experience: parseInt(formData.experience) || undefined,
          dateOfBirth: formData.birthDate,
          level: formData.level,
          coach: formData.coach,
          club: formData.club,
          goals: {
            shortTerm: formData.shortTermGoal,
            longTerm: formData.longTermGoal,
            dream: formData.dreamGoal
          },
          motivation: formData.motivation
        }
      };

      await updateProfile(profileData);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const currentSports = profile?.profile?.sports || ["Track & Field", "100m Sprint", "200m Sprint"];
  const availableSports = ["400m Sprint", "Long Jump", "High Jump", "Hurdles", "Javelin", "Shot Put"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <span>Personal Information</span>
          </CardTitle>
          <CardDescription>
            Update your basic profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-secondary" />
            <span>Location & Details</span>
          </CardTitle>
          <CardDescription>
            Specify your location and athletic details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select 
                value={formData.state}
                onValueChange={(value) => handleInputChange('state', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input 
                id="experience" 
                type="number" 
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Input 
              id="birthDate" 
              type="date" 
              value={formData.birthDate}
              onChange={(e) => handleInputChange('birthDate', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Athletic Profile</span>
          </CardTitle>
          <CardDescription>
            Manage your sports and specializations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Current Sports</Label>
            <div className="flex flex-wrap gap-2">
              {currentSports.map((sport, index) => (
                <Badge key={index} className="bg-primary text-primary-foreground">
                  {sport}
                  <button className="ml-2 text-xs">×</button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="addSport">Add Sport</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a sport to add" />
              </SelectTrigger>
              <SelectContent>
                {availableSports.map((sport, index) => (
                  <SelectItem key={index} value={sport.toLowerCase()}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Current Level</Label>
            <Select 
              value={formData.level}
              onValueChange={(value) => handleInputChange('level', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                <SelectItem value="elite">Elite (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coach">Current Coach</Label>
            <Input 
              id="coach" 
              value={formData.coach}
              onChange={(e) => handleInputChange('coach', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="club">Training Club/Academy</Label>
            <Input 
              id="club" 
              value={formData.club}
              onChange={(e) => handleInputChange('club', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-secondary" />
            <span>Goals & Aspirations</span>
          </CardTitle>
          <CardDescription>
            Set your athletic goals and timeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shortTermGoal">Short-term Goal (Next 6 months)</Label>
            <Input 
              id="shortTermGoal" 
              value={formData.shortTermGoal}
              onChange={(e) => handleInputChange('shortTermGoal', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longTermGoal">Long-term Goal (1-2 years)</Label>
            <Input 
              id="longTermGoal" 
              value={formData.longTermGoal}
              onChange={(e) => handleInputChange('longTermGoal', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dreamGoal">Dream Goal</Label>
            <Input 
              id="dreamGoal" 
              value={formData.dreamGoal}
              onChange={(e) => handleInputChange('dreamGoal', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">What motivates you?</Label>
            <Textarea 
              id="motivation" 
              placeholder="Share what drives you to excel..."
              value={formData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button 
          className="shadow-athlete" 
          onClick={handleSave}
          disabled={loading}
        >
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
</div>
);
};

export default ProfileSettings;