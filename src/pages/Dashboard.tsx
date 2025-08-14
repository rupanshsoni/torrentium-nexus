import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Download, 
  TrendingUp, 
  Search,
  Users,
  UserCheck,
  Trophy,
  User
} from "lucide-react";
import { mockUser, mockTransfers, formatFileSize } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const recentUploads = mockTransfers.filter(t => t.status === 'uploading' || t.status === 'completed').slice(0, 4);
  const recentDownloads = mockTransfers.filter(t => t.status === 'downloading' || t.status === 'completed').slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'downloading': return 'bg-primary';
      case 'uploading': return 'bg-secondary';
      case 'failed': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const privateNetworks = [
    { name: "Developer Team", members: 12, status: "connected" },
    { name: "Movie Archive", members: 45, status: "connect" },
    { name: "Music Collection", members: 8, status: "connected" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold text-foreground text-center flex-1">Torrentium</h1>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate("/leaderboard")}
              className="flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              My Profile
            </Button>
          </div>
        </div>

        {/* Main Content Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Uploads - Highlighted with Blue Border */}
          <Card className="bg-card shadow-card border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Uploads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUploads.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{transfer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(transfer.size)} • {new Date(transfer.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(transfer.status)} text-white border-none`}
                  >
                    {transfer.status === 'completed' ? 'completed' : 'uploading'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Downloads */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Download className="h-5 w-5 text-secondary" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDownloads.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-secondary" />
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{transfer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(transfer.size)} • {new Date(transfer.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(transfer.status)} text-white border-none`}
                  >
                    {transfer.status === 'completed' ? 'completed' : 'downloading'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Trust Score</span>
                <span className="text-2xl font-bold text-success">{mockUser.trustScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Files Shared</span>
                <span className="text-xl font-semibold text-card-foreground">{mockUser.totalShared.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Downloaded</span>
                <span className="text-xl font-semibold text-card-foreground">{mockUser.totalDownloaded.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Data Transferred</span>
                <span className="text-xl font-semibold text-card-foreground">2.4 TB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Search className="h-5 w-5 text-warning" />
                Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search files, torrents, or users..." 
                  className="pl-10 bg-muted/20 border-border focus:border-primary"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Search across the network for files, torrents, and trusted peers
              </p>
            </CardContent>
          </Card>

          {/* Quick Access Private Networks */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Quick Access Private Networks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {privateNetworks.map((network, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${network.status === 'connected' ? 'bg-success' : 'bg-muted'}`} />
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{network.name}</p>
                      <p className="text-xs text-muted-foreground">{network.members} members</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={network.status === 'connected' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {network.status === 'connected' ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;