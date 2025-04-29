
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { DocumentProvider } from "./contexts/DocumentContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Categories from "./pages/Categories";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DocumentProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/search" 
                  element={
                    <ProtectedRoute>
                      <Search />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/upload" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Upload />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/categories" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Categories />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </div>
        </DocumentProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
