
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Search,
  Upload,
  FolderOpen,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigationItems = [
    {
      name: "Documents",
      path: "/",
      icon: FileText,
      allowedRoles: ["admin", "user"],
    },
    {
      name: "Search",
      path: "/search",
      icon: Search,
      allowedRoles: ["admin", "user"],
    },
    {
      name: "Upload",
      path: "/upload",
      icon: Upload,
      allowedRoles: ["admin"],
    },
    {
      name: "Categories",
      path: "/categories",
      icon: FolderOpen,
      allowedRoles: ["admin"],
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
      allowedRoles: ["admin"],
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      allowedRoles: ["admin"],
    },
  ];

  const filteredNavigation = navigationItems.filter((item) => {
    return item.allowedRoles.includes(user?.role || "");
  });

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-muted flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full bg-background shadow-md"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 bg-primary transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-center h-16 px-4 border-b border-primary-700">
          <Link to="/" className="flex items-center">
            <FileText className="h-6 w-6 text-white mr-2" />
            <h1 className="font-bold text-xl text-white">eSPMI Repository</h1>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
                  isActiveRoute(item.path)
                    ? "bg-primary-700 text-white"
                    : "text-gray-300 hover:bg-primary-700 hover:text-white"
                )}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-primary-700">
          <div className="flex items-center mb-4">
            <div className="bg-primary-400 p-2 rounded-full">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-300">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
