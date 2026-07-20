import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactLenis } from 'lenis/react';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactLenis root options={{
      // Self-drive the animation loop
      autoRaf: true,

      // Desktop / Laptop settings
      smoothWheel: true,
      duration: 1.2,
      // wheelMultiplier: 0.9 increases the "weight" by 10% (requires more physical movement)
      wheelMultiplier: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      // Touch-only physics
      syncTouch: true,
      syncTouchLerp: 0.15,         // Subtle smooth trailing
      // touchMultiplier: 1.2 reduces the "weight" by 20% (moves further with less effort)
      touchMultiplier: 1.2,
      touchInertiaExponent: 1.55,  // Subtle dampening
    }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ReactLenis>
  </QueryClientProvider>
);

export default App;