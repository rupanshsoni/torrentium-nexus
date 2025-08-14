import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Download as DownloadIcon, 
  File, 
  Folder,
  Users,
  Pause,
  Play,
  X,
  CheckCircle
} from "lucide-react";
import { formatFileSize, formatSpeed } from "@/lib/mockData";

interface DownloadItem {
  id: string;
  name: string;
  size: number;
  progress: number;
  speed: number;
  peers: number;
  status: 'pending' | 'downloading' | 'paused' | 'completed' | 'error';
  downloadPath: string;
}

const Download = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    {
      id: "1",
      name: "Latest_Movies_Collection.zip",
      size: 15600000000,
      progress: 67,
      speed: 8500000,
      peers: 12,
      status: 'downloading',
      downloadPath: "/Downloads/Movies"
    },
    {
      id: "2",
      name: "Open_Source_Games.tar.gz",
      size: 2300000000,
      progress: 100,
      speed: 0,
      peers: 0,
      status: 'completed',
      downloadPath: "/Downloads/Games"
    }
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [downloadPath, setDownloadPath] = useState("/Downloads");
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.torrent')) {
        handleTorrentFile(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload a .torrent file.",
          variant: "destructive"
        });
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.torrent')) {
        handleTorrentFile(file);
      } else {
        toast({
          title: "Invalid File",
          description: "Please upload a .torrent file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleTorrentFile = (file: File) => {
    // Simulate parsing torrent file
    const newDownload: DownloadItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name.replace('.torrent', ''),
      size: Math.random() * 10000000000 + 1000000000, // Random size between 1-10GB
      progress: 0,
      speed: 0,
      peers: Math.floor(Math.random() * 20) + 1,
      status: 'pending',
      downloadPath: downloadPath
    };

    setDownloads(prev => [...prev, newDownload]);
    
    toast({
      title: "Torrent Added",
      description: `${newDownload.name} has been added to the download queue.`,
    });

    // Start download simulation
    setTimeout(() => startDownload(newDownload.id), 1000);
  };

  const startDownload = (downloadId: string) => {
    setDownloads(prev =>
      prev.map(download =>
        download.id === downloadId
          ? { ...download, status: 'downloading' as const, speed: Math.random() * 10000000 + 1000000 }
          : download
      )
    );

    const interval = setInterval(() => {
      setDownloads(prev => {
        const download = prev.find(d => d.id === downloadId);
        if (!download || download.status !== 'downloading') {
          clearInterval(interval);
          return prev;
        }

        const newProgress = Math.min(download.progress + Math.random() * 5, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          toast({
            title: "Download Complete",
            description: `${download.name} has finished downloading.`,
          });
          return prev.map(d =>
            d.id === downloadId
              ? { ...d, progress: 100, status: 'completed' as const, speed: 0 }
              : d
          );
        }

        return prev.map(d =>
          d.id === downloadId
            ? { ...d, progress: newProgress, speed: Math.random() * 10000000 + 1000000 }
            : d
        );
      });
    }, 1000);
  };

  const toggleDownload = (downloadId: string) => {
    setDownloads(prev =>
      prev.map(download => {
        if (download.id === downloadId) {
          if (download.status === 'downloading') {
            return { ...download, status: 'paused' as const, speed: 0 };
          } else if (download.status === 'paused') {
            startDownload(downloadId);
            return download;
          }
        }
        return download;
      })
    );
  };

  const removeDownload = (downloadId: string) => {
    setDownloads(prev => prev.filter(d => d.id !== downloadId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'downloading': return 'text-primary';
      case 'paused': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'downloading': return <DownloadIcon className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'error': return <X className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Download Files</h1>
          <p className="text-muted-foreground mt-1">Download torrents from the P2P network</p>
        </div>

        {/* Torrent Upload Zone */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Add Torrent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <File className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-card-foreground mb-1">
                Drop .torrent file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports .torrent files only
              </p>
              <Input
                type="file"
                accept=".torrent"
                onChange={handleFileSelect}
                className="hidden"
                id="torrent-upload"
              />
              <Button asChild variant="outline" className="mt-2">
                <label htmlFor="torrent-upload" className="cursor-pointer">
                  Browse Files
                </label>
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="download-path">Download Location</Label>
              <div className="flex gap-2">
                <Input
                  id="download-path"
                  value={downloadPath}
                  onChange={(e) => setDownloadPath(e.target.value)}
                  placeholder="/Downloads"
                />
                <Button variant="outline" size="icon">
                  <Folder className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Downloads */}
        {downloads.length > 0 && (
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Downloads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {downloads.map((download) => (
                <div key={download.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={getStatusColor(download.status)}>
                        {getStatusIcon(download.status)}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground text-sm">
                          {download.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(download.size)} • {download.downloadPath}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {download.peers}
                      </div>
                      <Badge variant="outline" className={getStatusColor(download.status)}>
                        {download.status.charAt(0).toUpperCase() + download.status.slice(1)}
                      </Badge>
                      {(download.status === 'downloading' || download.status === 'paused') && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleDownload(download.id)}
                          className="h-6 w-6 p-0"
                        >
                          {download.status === 'downloading' ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3" />
                          )}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeDownload(download.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {download.status !== 'completed' && (
                    <>
                      <Progress value={download.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.round(download.progress)}% complete</span>
                        <span>{download.speed > 0 ? formatSpeed(download.speed) : 'Paused'}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Download Tips */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Download Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-card-foreground">
              • <strong>Torrent Files:</strong> Only .torrent files are supported for downloads
            </p>
            <p className="text-sm text-card-foreground">
              • <strong>Peer Connections:</strong> More peers typically mean faster download speeds
            </p>
            <p className="text-sm text-card-foreground">
              • <strong>Download Location:</strong> Choose a folder with sufficient free space
            </p>
            <p className="text-sm text-card-foreground">
              • <strong>Pause/Resume:</strong> Downloads can be paused and resumed at any time
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Download;