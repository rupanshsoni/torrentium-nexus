import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload as UploadIcon, 
  File, 
  X, 
  CheckCircle,
  FolderOpen
} from "lucide-react";
import { formatFileSize } from "@/lib/mockData";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  hash?: string;
}

const Upload = () => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
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
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newUploadFiles: UploadFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'pending'
    }));

    setUploadFiles(prev => [...prev, ...newUploadFiles]);
    
    // Simulate upload for each file
    newUploadFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    setUploadFiles(prev => 
      prev.map(file => 
        file.id === fileId ? { ...file, status: 'uploading' as const } : file
      )
    );

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      
      if (progress >= 100) {
        progress = 100;
        setUploadFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { 
                  ...file, 
                  progress: 100, 
                  status: 'completed' as const,
                  hash: `sha256:${Math.random().toString(36).substr(2, 64)}`
                } 
              : file
          )
        );
        clearInterval(interval);
        
        toast({
          title: "Upload Complete",
          description: "File has been successfully uploaded to the network.",
        });
      } else {
        setUploadFiles(prev => 
          prev.map(file => 
            file.id === fileId ? { ...file, progress } : file
          )
        );
      }
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const clearCompleted = () => {
    setUploadFiles(prev => prev.filter(file => file.status !== 'completed'));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'uploading': return 'text-primary';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'uploading': return <UploadIcon className="h-4 w-4" />;
      case 'error': return <X className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Upload Files</h1>
            <p className="text-muted-foreground mt-1">Share files with the P2P network</p>
          </div>
          {uploadFiles.some(f => f.status === 'completed') && (
            <Button variant="outline" onClick={clearCompleted}>
              Clear Completed
            </Button>
          )}
        </div>

        {/* Upload Zone */}
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                Drop files here or click to browse
              </h3>
              <p className="text-muted-foreground mb-4">
                Supports all file types. Maximum size: 50GB per file
              </p>
              <Input
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Browse Files
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upload Queue */}
        {uploadFiles.length > 0 && (
          <Card className="bg-card shadow-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Upload Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {uploadFiles.map((uploadFile) => (
                <div key={uploadFile.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={getStatusColor(uploadFile.status)}>
                        {getStatusIcon(uploadFile.status)}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground text-sm">
                          {uploadFile.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(uploadFile.file.size)} • {uploadFile.file.type || 'Unknown type'}
                        </p>
                        {uploadFile.hash && (
                          <p className="text-xs text-muted-foreground font-mono">
                            {uploadFile.hash}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(uploadFile.status)}>
                        {uploadFile.status.charAt(0).toUpperCase() + uploadFile.status.slice(1)}
                      </Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(uploadFile.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  {uploadFile.status === 'uploading' && (
                    <>
                      <Progress value={uploadFile.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{Math.round(uploadFile.progress)}% complete</span>
                        <span>Uploading...</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Upload Tips */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Upload Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-card-foreground">
              • <strong>File Types:</strong> All file formats are supported
            </p>
            <p className="text-sm text-card-foreground">
              • <strong>File Size:</strong> Maximum 50GB per file
            </p>
            <p className="text-sm text-card-foreground">
              • <strong>Security:</strong> Files are automatically hashed for integrity verification
            </p>
            <p className="text-sm text-card-foreground">
              • <strong>Sharing:</strong> Files become available to trusted peers in your network
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;