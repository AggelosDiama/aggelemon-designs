import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AITutor from "./pages/projects/AITutor";
import TravelApp from "./pages/projects/TravelApp";
import MakeDisCount from "./pages/projects/MakeDisCount";
import TeamWebsite from "./pages/projects/TeamWebsite";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/ai-tutor" element={<AITutor />} />
          <Route path="/projects/travel-app" element={<TravelApp />} />
          <Route path="/projects/makediscount" element={<MakeDisCount />} />
          <Route path="/projects/team-website" element={<TeamWebsite />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
