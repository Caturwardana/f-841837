
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types/user";
import { toast } from "sonner";

// Define context type
interface AuthContextType {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  // User management functions
  addUser: (user: Omit<User, "id">) => void;
  deleteUser: (id: string) => void;
  updateUser: (user: User) => void;
  resetPassword: (id: string, newPassword: string) => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  users: [],
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAdmin: () => false,
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  resetPassword: () => {},
});

// Sample users for demo
const DEMO_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    lastLogin: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    lastLogin: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(DEMO_USERS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth in localStorage
    const storedUser = localStorage.getItem("user");
    const storedUsers = localStorage.getItem("users");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch {
        setUsers(DEMO_USERS);
      }
    } else {
      setUsers(DEMO_USERS);
    }
    
    setIsLoading(false);
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users, isLoading]);

  const login = async (email: string, password: string) => {
    // Find the user in our users array
    const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }
    
    // In a real app, we would verify the password here
    // For demo purposes, we'll accept any password
    
    // Update last login time
    const updatedUser = {
      ...foundUser,
      lastLogin: new Date().toISOString(),
    };
    
    // Update the user in the users array
    setUsers(users.map((u) => (u.id === foundUser.id ? updatedUser : u)));
    
    // Set as current user
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  // User management functions
  const addUser = (newUser: Omit<User, "id">) => {
    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      toast.error("A user with this email already exists");
      return;
    }
    
    const userToAdd = {
      ...newUser,
      id: Date.now().toString(),
    };
    
    setUsers([...users, userToAdd]);
    toast.success("User added successfully");
  };

  const deleteUser = (id: string) => {
    // Don't allow deleting the current user
    if (user?.id === id) {
      toast.error("You cannot delete your own account");
      return;
    }
    
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted successfully");
  };

  const updateUser = (updatedUser: User) => {
    // Check if email already exists for another user
    if (users.some((u) => u.id !== updatedUser.id && u.email.toLowerCase() === updatedUser.email.toLowerCase())) {
      toast.error("A user with this email already exists");
      return;
    }
    
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    
    // If updating the current user, update the current user state as well
    if (user && user.id === updatedUser.id) {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    
    toast.success("User updated successfully");
  };

  const resetPassword = (id: string, newPassword: string) => {
    // In a real app, this would hash the password and store it
    // For our demo, we're just showing the functionality
    toast.success("Password reset successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        isAdmin,
        addUser,
        deleteUser,
        updateUser,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
