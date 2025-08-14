import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Trophy, 
  Medal, 
  Award,
  Crown,
  Star,
  TrendingUp,
  Shield
} from "lucide-react";
import { mockLeaderboard, mockUser } from "@/lib/mockData";

const Leaderboard = () => {
  const [sortBy, setSortBy] = useState("badges");
  const [timeframe, setTimeframe] = useState("all-time");

  const sortedUsers = [...mockLeaderboard].sort((a, b) => {
    switch (sortBy) {
      case 'badges':
        return b.badges.length - a.badges.length;
      case 'trust':
        return b.trustScore - a.trustScore;
      case 'shared':
        return b.totalShared - a.totalShared;
      case 'downloaded':
        return b.totalDownloaded - a.totalDownloaded;
      default:
        return b.badges.length - a.badges.length;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500 text-white';
      case 2:
        return 'bg-gray-400 text-white';
      case 3:
        return 'bg-amber-600 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const isCurrentUser = (username: string) => username === mockUser.username;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Top performers in the Torrentium network</p>
        </div>

        {/* Filters */}
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-card-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="badges">Badges</SelectItem>
                    <SelectItem value="trust">Trust Score</SelectItem>
                    <SelectItem value="shared">Files Shared</SelectItem>
                    <SelectItem value="downloaded">Files Downloaded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-card-foreground">Period:</span>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {sortedUsers.slice(0, 3).map((user, index) => {
            const rank = index + 1;
            return (
              <Card key={user.username} className={`bg-card shadow-card border-border ${
                rank === 1 ? 'ring-2 ring-yellow-500/50' : 
                rank === 2 ? 'ring-2 ring-gray-400/50' :
                'ring-2 ring-amber-600/50'
              }`}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {getRankIcon(rank)}
                  </div>
                  
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="text-lg">
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="font-bold text-card-foreground mb-2">
                    {user.username}
                    {isCurrentUser(user.username) && (
                      <span className="ml-2 text-primary text-sm">(You)</span>
                    )}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm text-card-foreground">{user.badges.length} badges</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Shield className={`h-4 w-4 ${getTrustScoreColor(user.trustScore)}`} />
                      <span className={`text-sm ${getTrustScoreColor(user.trustScore)}`}>
                        {user.trustScore}% trust
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm text-card-foreground">
                        {user.totalShared + user.totalDownloaded} files
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Full Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sortedUsers.map((user, index) => {
                const rank = index + 1;
                const isUser = isCurrentUser(user.username);
                
                return (
                  <div
                    key={user.username}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      isUser 
                        ? 'border-primary bg-primary/5 shadow-glow' 
                        : 'border-border'
                    }`}
                  >
                    <div className="flex items-center justify-center w-12">
                      {rank <= 3 ? (
                        getRankIcon(rank)
                      ) : (
                        <Badge variant="outline" className={getRankBadgeColor(rank)}>
                          #{rank}
                        </Badge>
                      )}
                    </div>
                    
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-card-foreground">
                          {user.username}
                        </h3>
                        {isUser && (
                          <Badge variant="outline" className="bg-primary text-white">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{user.badges.length} badges</span>
                        <span className={getTrustScoreColor(user.trustScore)}>
                          {user.trustScore}% trust
                        </span>
                        <span>{user.totalShared} shared</span>
                        <span>{user.totalDownloaded} downloaded</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 max-w-40">
                      {user.badges.slice(0, 3).map((badge, badgeIndex) => (
                        <Badge
                          key={badge}
                          variant="outline"
                          className="text-xs bg-primary/10 border-primary/30"
                        >
                          {badge}
                        </Badge>
                      ))}
                      {user.badges.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.badges.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Categories */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Achievement Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-card-foreground">Speed Demon</h4>
                <p className="text-sm text-muted-foreground">High-speed transfers</p>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Shield className="h-8 w-8 mx-auto mb-2 text-success" />
                <h4 className="font-semibold text-card-foreground">Trusted Peer</h4>
                <p className="text-sm text-muted-foreground">High trust score</p>
              </div>
              <div className="text-center p-4 bg-muted/20 rounded-lg">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-warning" />
                <h4 className="font-semibold text-card-foreground">Data Guardian</h4>
                <p className="text-sm text-muted-foreground">Large file shares</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;