
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user roles
export type UserRole = "admin" | "user";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAdmin: () => false,
});

// Sample users for demo
const DEMO_USERS: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - in a real app, this would verify against a backend
    const foundUser = DEMO_USERS.find((u) => u.email === email);
    
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }
    
    // In a real app, we would verify the password here
    // For demo purposes, we'll accept any password
    
    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
