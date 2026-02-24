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
import StoryMission from "./pages/StoryMission";
import ProgressPage from "./pages/ProgressPage";
import ParentDashboard from "./pages/ParentDashboard";
import NotFound from "./pages/NotFound";
import LearnCourseDetail from "./pages/LearnCourseDetail";
import ChallengeLab from "./pages/ChallengeLab";
import ChallengeWorkspace from "./pages/ChallengeWorkspace";
import CreateProjectWorkspace from "./pages/CreateProjectWorkspace";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DevIdentitySwitcher } from "./components/auth/DevIdentitySwitcher";

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
          
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/learn" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <LearnMode />
            </ProtectedRoute>
          } />
          
          <Route path="/learn/:courseId" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <LearnCourseDetail />
            </ProtectedRoute>
          } />

          <Route path="/learn/:courseId/lessons/:lessonId" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <StoryMission />
            </ProtectedRoute>
          } />

          <Route path="/challenges" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <ChallengeLab />
            </ProtectedRoute>
          } />

          <Route path="/challenges/:challengeId" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <ChallengeWorkspace />
            </ProtectedRoute>
          } />

          <Route path="/create" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <CreateMode />
            </ProtectedRoute>
          } />

          <Route path="/create/:projectId" element={
            <ProtectedRoute requiredRole="BUILDER">
              <CreateProjectWorkspace />
            </ProtectedRoute>
          } />
          
          <Route path="/stories" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <StoryMode />
            </ProtectedRoute>
          } />
          
          <Route path="/stories/:storyId/lessons/:lessonId" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <StoryMission />
            </ProtectedRoute>
          } />
          
          <Route path="/progress" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <ProgressPage />
            </ProtectedRoute>
          } />
          
          <Route path="/parent" element={
            <ProtectedRoute requiredRole="EXPLORER">
              <ParentDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <DevIdentitySwitcher />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
