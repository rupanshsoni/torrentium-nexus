export interface UserProfile {
  username: string;
  peerId: string;
  avatar: string;
  trustScore: number;
  totalShared: number;
  totalDownloaded: number;
  badges: string[];
}

export interface FileTransfer {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'completed' | 'downloading' | 'uploading' | 'failed';
  progress: number;
  speed: number;
  date: string;
  hash?: string;
}

export interface Peer {
  id: string;
  username: string;
  avatar: string;
  trustScore: number;
  lastSeen: string;
  isOnline: boolean;
  isBlocked: boolean;
}

export const mockUser: UserProfile = {
  username: "TorrentMaster",
  peerId: "TM_7a8b9c2d1e3f4567890abcdef123456789",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TorrentMaster",
  trustScore: 89,
  totalShared: 45,
  totalDownloaded: 128,
  badges: ["Speed Demon", "Trusted Peer", "Data Guardian", "Community Hero"]
};

export const mockTransfers: FileTransfer[] = [
  {
    id: "1",
    name: "Ubuntu-22.04.3-desktop-amd64.iso",
    size: 4700000000,
    type: "ISO",
    status: "completed",
    progress: 100,
    speed: 0,
    date: "2024-01-15T10:30:00Z",
    hash: "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456"
  },
  {
    id: "2",
    name: "Latest_Movies_Collection.zip",
    size: 15600000000,
    type: "ZIP",
    status: "downloading",
    progress: 67,
    speed: 8500000,
    date: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    name: "Open_Source_Games.tar.gz",
    size: 2300000000,
    type: "TAR",
    status: "uploading",
    progress: 34,
    speed: 5200000,
    date: "2024-01-14T12:20:00Z"
  },
  {
    id: "4",
    name: "Programming_Ebooks.pdf",
    size: 890000000,
    type: "PDF",
    status: "failed",
    progress: 23,
    speed: 0,
    date: "2024-01-13T09:15:00Z"
  },
  {
    id: "5",
    name: "Music_Album_FLAC.zip",
    size: 1200000000,
    type: "ZIP",
    status: "completed",
    progress: 100,
    speed: 0,
    date: "2024-01-12T18:00:00Z"
  }
];

export const mockPeers: Peer[] = [
  {
    id: "1",
    username: "CryptoSeed",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoSeed",
    trustScore: 95,
    lastSeen: "2 minutes ago",
    isOnline: true,
    isBlocked: false
  },
  {
    id: "2",
    username: "DataVault",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DataVault",
    trustScore: 87,
    lastSeen: "1 hour ago",
    isOnline: true,
    isBlocked: false
  },
  {
    id: "3",
    username: "P2PLegend",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=P2PLegend",
    trustScore: 92,
    lastSeen: "3 hours ago",
    isOnline: false,
    isBlocked: false
  },
  {
    id: "4",
    username: "ShareMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ShareMaster",
    trustScore: 76,
    lastSeen: "1 day ago",
    isOnline: false,
    isBlocked: true
  }
];

export const mockLeaderboard: UserProfile[] = [
  {
    username: "DataKing",
    peerId: "DK_123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DataKing",
    trustScore: 98,
    totalShared: 234,
    totalDownloaded: 567,
    badges: ["Ultimate Sharer", "Speed Demon", "Trusted Peer", "Data Guardian", "Community Hero", "Elite Member"]
  },
  {
    username: "TorrentGod",
    peerId: "TG_456",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TorrentGod",
    trustScore: 96,
    totalShared: 198,
    totalDownloaded: 445,
    badges: ["Speed Demon", "Trusted Peer", "Data Guardian", "Community Hero", "Elite Member"]
  },
  {
    username: "SeedLord",
    peerId: "SL_789",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SeedLord",
    trustScore: 94,
    totalShared: 176,
    totalDownloaded: 389,
    badges: ["Trusted Peer", "Data Guardian", "Community Hero", "Elite Member"]
  },
  mockUser,
  {
    username: "FileSharer",
    peerId: "FS_321",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FileSharer",
    trustScore: 85,
    totalShared: 87,
    totalDownloaded: 234,
    badges: ["Trusted Peer", "Data Guardian", "Community Hero"]
  }
];

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatSpeed = (bytesPerSecond: number): string => {
  return formatFileSize(bytesPerSecond) + '/s';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
};