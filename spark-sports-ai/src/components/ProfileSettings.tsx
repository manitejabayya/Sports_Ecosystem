import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, Target, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ProfileSettings = () => {
  const { user } = useAuth();
  const fullName = user?.name || "";
  const [derivedFirstName, ...rest] = fullName.split(" ");
  const derivedLastName = rest.join(" ");
  const currentSports = ["Track & Field", "100m Sprint", "200m Sprint"];
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
              <Input id="firstName" defaultValue={derivedFirstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={derivedLastName} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user?.email || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              placeholder="Tell us about yourself..."
              defaultValue="Passionate sprint athlete from Delhi, working towards qualifying for national competitions. Love the thrill of speed and always pushing my limits."
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
              <Input id="city" defaultValue="Delhi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select defaultValue="delhi">
                <SelectTrigger>
                  <SelectValue />
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
              <Input id="age" type="number" defaultValue="22" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" defaultValue="5" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Input id="birthDate" type="date" defaultValue="2002-03-15" />
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
            <Select defaultValue="intermediate">
              <SelectTrigger>
                <SelectValue />
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
            <Input id="coach" defaultValue="Coach Rajesh Kumar" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="club">Training Club/Academy</Label>
            <Input id="club" defaultValue="Delhi Athletics Academy" />
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
            <Input id="shortTermGoal" defaultValue="Break 11.5 seconds in 100m sprint" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longTermGoal">Long-term Goal (1-2 years)</Label>
            <Input id="longTermGoal" defaultValue="Qualify for national championships" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dreamGoal">Dream Goal</Label>
            <Input id="dreamGoal" defaultValue="Represent India in international competitions" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">What motivates you?</Label>
            <Textarea 
              id="motivation" 
              placeholder="Share what drives you to excel..."
              defaultValue="I want to inspire young girls from small towns that they can achieve anything with dedication and hard work."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button className="shadow-athlete">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;