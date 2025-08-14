import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter,
  Pause,
  Play,
  X,
  Download,
  Upload
} from "lucide-react";
import { mockTransfers, formatFileSize, formatSpeed, formatDate } from "@/lib/mockData";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [transfers, setTransfers] = useState(mockTransfers);

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || transfer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-white';
      case 'downloading': return 'bg-primary text-white';
      case 'uploading': return 'bg-secondary text-white';
      case 'failed': return 'bg-destructive text-white';
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

  const toggleTransfer = (transferId: string) => {
    setTransfers(prev =>
      prev.map(transfer => {
        if (transfer.id === transferId) {
          if (transfer.status === 'downloading' || transfer.status === 'uploading') {
            return { ...transfer, status: 'completed' as const, speed: 0 };
          }
        }
        return transfer;
      })
    );
  };

  const removeTransfer = (transferId: string) => {
    setTransfers(prev => prev.filter(t => t.id !== transferId));
  };

  const getTypeIcon = (status: string) => {
    return status === 'uploading' ? (
      <Upload className="h-4 w-4" />
    ) : (
      <Download className="h-4 w-4" />
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transfer History</h1>
          <p className="text-muted-foreground mt-1">View and manage your upload and download history</p>
        </div>

        {/* Filters */}
        <Card className="bg-card shadow-card border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="downloading">Downloading</SelectItem>
                    <SelectItem value="uploading">Uploading</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">
                  {transfers.filter(t => t.status === 'completed').length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">
                  {transfers.filter(t => t.status === 'downloading' || t.status === 'uploading').length}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">
                  {transfers.filter(t => t.status === 'failed').length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card shadow-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">
                  {formatFileSize(transfers.reduce((acc, t) => acc + t.size, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Data</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer Table */}
        <Card className="bg-card shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Transfers ({filteredTransfers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-card-foreground">Type</TableHead>
                    <TableHead className="text-card-foreground">Name</TableHead>
                    <TableHead className="text-card-foreground">Size</TableHead>
                    <TableHead className="text-card-foreground">Status</TableHead>
                    <TableHead className="text-card-foreground">Speed</TableHead>
                    <TableHead className="text-card-foreground">Date</TableHead>
                    <TableHead className="text-card-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransfers.map((transfer) => (
                    <TableRow key={transfer.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getTypeIcon(transfer.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-card-foreground text-sm">
                            {transfer.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transfer.type}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-card-foreground">
                          {formatFileSize(transfer.size)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(transfer.status)}>
                          {getStatusText(transfer.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-card-foreground">
                          {transfer.speed > 0 ? formatSpeed(transfer.speed) : '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-card-foreground text-sm">
                          {formatDate(transfer.date)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {(transfer.status === 'downloading' || transfer.status === 'uploading') && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleTransfer(transfer.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Pause className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTransfer(transfer.id)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredTransfers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transfers found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default History;