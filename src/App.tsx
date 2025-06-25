import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import MyStatus from "./pages/MyStatus";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <QueryClient>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MyStatus />} />
            <Route path="/my-status" element={<MyStatus />} />
          </Routes>
        </div>
      </QueryClient>
    </BrowserRouter>
  );
}

export default App;
