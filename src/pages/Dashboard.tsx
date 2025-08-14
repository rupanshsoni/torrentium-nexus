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
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center animate-scale-in">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent text-center flex-1">
            Torrentium
          </h1>
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigate("/leaderboard")}
              className="flex items-center gap-2 bg-gradient-to-r from-secondary to-primary hover:from-primary hover:to-secondary transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              <User className="h-4 w-4" />
              My Profile
            </Button>
          </div>
        </div>

        {/* Main Content Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Uploads - Highlighted with Blue Border */}
          <Card className="bg-gradient-surface shadow-2xl border-2 border-primary animate-glow-pulse hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2 text-lg font-bold">
                <Upload className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                Uploads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUploads.map((transfer, index) => (
                <div 
                  key={transfer.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-card/60 hover:bg-card/80 transition-all duration-200 hover:scale-[1.02] border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-primary/20">
                      <Upload className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{transfer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(transfer.size)} • {new Date(transfer.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(transfer.status)} text-white border-none shadow-sm`}
                  >
                    {transfer.status === 'completed' ? 'completed' : 'uploading'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Downloads */}
          <Card className="bg-gradient-surface shadow-xl border-border hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-secondary flex items-center gap-2 text-lg font-bold">
                <Download className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform duration-200" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentDownloads.map((transfer, index) => (
                <div 
                  key={transfer.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-card/60 hover:bg-card/80 transition-all duration-200 hover:scale-[1.02] border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-secondary/20">
                      <Download className="h-3 w-3 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{transfer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(transfer.size)} • {new Date(transfer.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(transfer.status)} text-white border-none shadow-sm`}
                  >
                    {transfer.status === 'completed' ? 'completed' : 'downloading'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-gradient-surface shadow-xl border-border hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-success flex items-center gap-2 text-lg font-bold">
                <TrendingUp className="h-5 w-5 text-success group-hover:scale-110 transition-transform duration-200" />
                Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/40 border border-border/50">
                <span className="text-muted-foreground font-medium">Trust Score</span>
                <span className="text-3xl font-bold text-success">{mockUser.trustScore}%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/40 border border-border/50">
                <span className="text-muted-foreground font-medium">Files Shared</span>
                <span className="text-xl font-bold text-primary">{mockUser.totalShared.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/40 border border-border/50">
                <span className="text-muted-foreground font-medium">Downloaded</span>
                <span className="text-xl font-bold text-secondary">{mockUser.totalDownloaded.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-card/40 border border-border/50">
                <span className="text-muted-foreground font-medium">Data Transferred</span>
                <span className="text-xl font-bold text-accent">2.4 TB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search */}
          <Card className="bg-gradient-surface shadow-xl border-border hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-warning flex items-center gap-2 text-lg font-bold">
                <Search className="h-5 w-5 text-warning group-hover:scale-110 transition-transform duration-200" />
                Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search files, torrents, or users..." 
                  className="pl-10 bg-card/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12"
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Search across the network for files, torrents, and trusted peers
              </p>
            </CardContent>
          </Card>

          {/* Quick Access Private Networks */}
          <Card className="bg-gradient-surface shadow-xl border-border hover:-translate-y-1 transition-all duration-300 group">
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-2 text-lg font-bold">
                <Users className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-200" />
                Quick Access Private Networks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {privateNetworks.map((network, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg bg-card/60 hover:bg-card/80 transition-all duration-200 hover:scale-[1.02] border border-border/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${network.status === 'connected' ? 'bg-success animate-pulse' : 'bg-muted'} shadow-lg`} />
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{network.name}</p>
                      <p className="text-xs text-muted-foreground">{network.members} members</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={network.status === 'connected' ? 'secondary' : 'outline'}
                    className={`text-xs transition-all duration-300 hover:scale-105 ${
                      network.status === 'connected' 
                        ? 'bg-success text-white hover:bg-success/90' 
                        : 'border-primary/50 hover:border-primary hover:bg-primary/10'
                    }`}
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