import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Upload, 
  Download, 
  History, 
  Users, 
  Settings, 
  Star 
} from "lucide-react";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Upload", url: "/upload", icon: Upload },
  { title: "Download", url: "/download", icon: Download },
  { title: "History", url: "/history", icon: History },
  { title: "Private Networks", url: "/private-network", icon: Users },
  { title: "Settings", url: "/profile", icon: Settings },
  { title: "Premium", url: "/leaderboard", icon: Star },
];

export function AppSidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full p-3">
        {/* Logo */}
        <div className="flex items-center gap-3 p-3 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <span 
            className={`font-bold text-lg text-card-foreground transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Torrentium
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={`group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                isActive(item.url)
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span 
                className={`font-medium transition-all duration-300 whitespace-nowrap ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}
              >
                {item.title}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}