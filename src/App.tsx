import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@/lib/i18n';

import SplashScreen from "./pages/SplashScreen";
import AuthScreen from "./pages/AuthScreen";
import Dashboard from "./pages/Dashboard";
import LearnMode from "./pages/LearnMode";
import TutorialLesson from "./pages/TutorialLesson";
import TestMode from "./pages/TestMode";
import DebuggingTest from "./pages/DebuggingTest";
import FlashCardsTest from "./pages/FlashCardsTest";
import MCQTest from "./pages/MCQTest";
import CreateMode from "./pages/CreateMode";
import StoryMode from "./pages/StoryMode";
import ProgressPage from "./pages/ProgressPage";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<LearnMode />} />
          <Route path="/learn/:tutorialId" element={<TutorialLesson />} />
          <Route path="/test" element={<TestMode />} />
          <Route path="/test/debugging" element={<DebuggingTest />} />
          <Route path="/test/flashcards" element={<FlashCardsTest />} />
          <Route path="/test/mcq" element={<MCQTest />} />
          <Route path="/create" element={<CreateMode />} />
          <Route path="/stories" element={<StoryMode />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
