import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Edit, 
  Save,
  Shield,
  Award,
  Upload,
  Download,
  TrendingUp,
  Camera
} from "lucide-react";
import { mockUser, formatFileSize } from "@/lib/mockData";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(mockUser.username);
  const [user] = useState(mockUser);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const calculateDataTransferred = () => {
    // Mock calculation - in real app this would come from the backend
    return (user.totalShared + user.totalDownloaded) * 1024 * 1024 * 1024; // Convert to bytes
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const badgeColors = [
    'bg-primary text-white',
    'bg-success text-white', 
    'bg-secondary text-white',
    'bg-accent text-white'
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account and view your statistics</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="lg:col-span-2 bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={username} />
                    <AvatarFallback className="text-2xl">
                      {username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                        {isEditing ? (
                          <Button onClick={handleSave} size="icon">
                            <Save className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button onClick={() => setIsEditing(true)} size="icon" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="peer-id">Peer ID</Label>
                      <Input
                        id="peer-id"
                        value={user.peerId}
                        disabled
                        className="bg-muted font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Score */}
              <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className={`h-8 w-8 ${getTrustScoreColor(user.trustScore)}`} />
                  <div>
                    <h3 className="font-semibold text-card-foreground">Trust Score</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your network activity and peer feedback
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getTrustScoreColor(user.trustScore)}`}>
                    {user.trustScore}%
                  </div>
                  <p className="text-sm text-muted-foreground">Excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <span className="text-sm text-card-foreground">Files Shared</span>
                  </div>
                  <span className="font-semibold text-card-foreground">{user.totalShared}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-card-foreground">Files Downloaded</span>
                  </div>
                  <span className="font-semibold text-card-foreground">{user.totalDownloaded}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-sm text-card-foreground">Data Transferred</span>
                  </div>
                  <span className="font-semibold text-card-foreground">
                    {formatFileSize(calculateDataTransferred())}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements ({user.badges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {user.badges.map((badge, index) => (
                <div
                  key={badge}
                  className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${badgeColors[index % badgeColors.length]}`}>
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground text-sm">{badge}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                </div>
              ))}
            </div>
            
            {user.badges.length === 0 && (
              <div className="text-center py-8">
                <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No achievements yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start sharing files to earn your first badge!
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Account Security
              </Button>
            </div>
            
            <div className="pt-4 border-t border-border">
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;