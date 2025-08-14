import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  Download, 
  Users, 
  TrendingUp, 
  Activity,
  Play,
  Pause
} from "lucide-react";
import { mockUser, mockTransfers, formatFileSize, formatSpeed } from "@/lib/mockData";

const Dashboard = () => {
  const activeTransfers = mockTransfers.filter(t => t.status === 'downloading' || t.status === 'uploading');
  const recentTransfers = mockTransfers.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'downloading': return 'bg-primary';
      case 'uploading': return 'bg-secondary';
      case 'failed': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'downloading': return 'Downloading';
      case 'uploading': return 'Uploading';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {mockUser.username}</h1>
            <p className="text-muted-foreground mt-1">Your P2P network dashboard</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Network Status
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card shadow-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Files Shared</CardTitle>
              <Upload className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{mockUser.totalShared}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Files Downloaded</CardTitle>
              <Download className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{mockUser.totalDownloaded}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Trust Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{mockUser.trustScore}%</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Active Peers</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">23</div>
              <p className="text-xs text-muted-foreground">4 online now</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Transfers */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Active Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeTransfers.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No active transfers</p>
              ) : (
                activeTransfers.map((transfer) => (
                  <div key={transfer.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            {transfer.status === 'downloading' || transfer.status === 'uploading' ? (
                              <Pause className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground text-sm">{transfer.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(transfer.size)} • {formatSpeed(transfer.speed)}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(transfer.status)}>
                        {getStatusText(transfer.status)}
                      </Badge>
                    </div>
                    <Progress value={transfer.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{transfer.progress}% complete</span>
                      <span>{formatSpeed(transfer.speed)}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(transfer.status)}`} />
                    <div>
                      <p className="font-medium text-card-foreground text-sm">{transfer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(transfer.size)} • {new Date(transfer.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(transfer.status)}>
                    {getStatusText(transfer.status)}
                  </Badge>
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