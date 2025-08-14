import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserPlus, 
  Shield, 
  ShieldCheck,
  Clock,
  Ban,
  Copy,
  Settings
} from "lucide-react";
import { mockPeers } from "@/lib/mockData";

const PrivateNetwork = () => {
  const [peers, setPeers] = useState(mockPeers);
  const [inviteCode, setInviteCode] = useState("TOR-INVITE-7A8B9C2D");
  const [networkSettings, setNetworkSettings] = useState({
    autoAcceptTrusted: true,
    requireInvitation: false,
    shareWithPublic: false
  });
  const { toast } = useToast();

  const togglePeerBlock = (peerId: string) => {
    setPeers(prev =>
      prev.map(peer =>
        peer.id === peerId
          ? { ...peer, isBlocked: !peer.isBlocked }
          : peer
      )
    );

    const peer = peers.find(p => p.id === peerId);
    if (peer) {
      toast({
        title: peer.isBlocked ? "Peer Unblocked" : "Peer Blocked",
        description: `${peer.username} has been ${peer.isBlocked ? 'unblocked' : 'blocked'}.`,
      });
    }
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({
      title: "Invite Code Copied",
      description: "The invite code has been copied to your clipboard.",
    });
  };

  const generateNewInviteCode = () => {
    const newCode = `TOR-INVITE-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setInviteCode(newCode);
    toast({
      title: "New Invite Code Generated",
      description: "A new invite code has been generated.",
    });
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getTrustBadgeVariant = (score: number) => {
    if (score >= 90) return 'bg-success text-white';
    if (score >= 70) return 'bg-primary text-white';
    if (score >= 50) return 'bg-warning text-white';
    return 'bg-destructive text-white';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Private Network</h1>
          <p className="text-muted-foreground mt-1">Manage your trusted peers and network settings</p>
        </div>

        {/* Network Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-card-foreground">
                    {peers.filter(p => !p.isBlocked).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Trusted Peers</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-success" />
                <div>
                  <div className="text-2xl font-bold text-card-foreground">
                    {peers.filter(p => p.isOnline && !p.isBlocked).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Online Now</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Ban className="h-8 w-8 text-destructive" />
                <div>
                  <div className="text-2xl font-bold text-card-foreground">
                    {peers.filter(p => p.isBlocked).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Blocked</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Peer Invitation */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Invite Peers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="invite-code">Invitation Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="invite-code"
                    value={inviteCode}
                    readOnly
                    className="font-mono"
                  />
                  <Button variant="outline" size="icon" onClick={copyInviteCode}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={generateNewInviteCode} className="flex-1">
                  Generate New Code
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Share this code with trusted users to invite them to your private network.
                This code expires in 7 days.
              </div>
            </CardContent>
          </Card>

          {/* Network Settings */}
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Network Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-accept">Auto-accept from trusted peers</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically accept downloads from high-trust peers
                  </p>
                </div>
                <Switch
                  id="auto-accept"
                  checked={networkSettings.autoAcceptTrusted}
                  onCheckedChange={(checked) =>
                    setNetworkSettings(prev => ({ ...prev, autoAcceptTrusted: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-invite">Require invitation</Label>
                  <p className="text-sm text-muted-foreground">
                    Only allow invited users to connect
                  </p>
                </div>
                <Switch
                  id="require-invite"
                  checked={networkSettings.requireInvitation}
                  onCheckedChange={(checked) =>
                    setNetworkSettings(prev => ({ ...prev, requireInvitation: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="public-share">Share with public network</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow public users to download your files
                  </p>
                </div>
                <Switch
                  id="public-share"
                  checked={networkSettings.shareWithPublic}
                  onCheckedChange={(checked) =>
                    setNetworkSettings(prev => ({ ...prev, shareWithPublic: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Peers List */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Connected Peers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {peers.map((peer) => (
                <div key={peer.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={peer.avatar} alt={peer.username} />
                      <AvatarFallback>{peer.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-card-foreground">{peer.username}</h3>
                        {peer.isOnline && !peer.isBlocked ? (
                          <div className="w-2 h-2 bg-success rounded-full" />
                        ) : (
                          <div className="w-2 h-2 bg-muted rounded-full" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className={getTrustBadgeVariant(peer.trustScore)}>
                          <Shield className="h-3 w-3 mr-1" />
                          {peer.trustScore}% Trust
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {peer.lastSeen}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {peer.isBlocked && (
                      <Badge variant="outline" className="bg-destructive text-white">
                        Blocked
                      </Badge>
                    )}
                    <Button
                      variant={peer.isBlocked ? "default" : "destructive"}
                      size="sm"
                      onClick={() => togglePeerBlock(peer.id)}
                    >
                      {peer.isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {peers.length === 0 && (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No peers connected yet.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your invite code to start building your network.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivateNetwork;