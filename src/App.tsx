
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import MyStatus from "./pages/MyStatus";
import EventDetail from "./pages/EventDetail";
import ServiceDetail from "./pages/ServiceDetail";
import AllEvents from "./pages/AllEvents";
import AllServices from "./pages/AllServices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events" element={<ProtectedRoute><AllEvents /></ProtectedRoute>} />
              <Route path="/services" element={<ProtectedRoute><AllServices /></ProtectedRoute>} />
              <Route path="/my-status" element={<ProtectedRoute><MyStatus /></ProtectedRoute>} />
              <Route path="/event/:id" element={<ProtectedRoute><EventDetail /></ProtectedRoute>} />
              <Route path="/service/:id" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
