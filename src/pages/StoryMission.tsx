import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  Code, 
  PlusCircle, 
  Send,
  Lock,
  CheckCircle2,
  Loader2,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useRole } from '@/hooks/useRole';
import { toast } from 'sonner';
import { getApiUrl } from '@/lib/api';

const StoryMission = () => {
  const { storyId, courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { role, can, user } = useRole();
  const [activeTab, setActiveTab] = useState('STORY');
  const queryClient = useQueryClient();

  // Fetch Lesson Data
  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: async () => {
      const res = await fetch(getApiUrl(`/api/lessons/${lessonId}`));
      if (!res.ok) throw new Error('Failed to fetch lesson');
      return res.json();
    }
  });

  // Fetch Course/Story Context for titles
  const { data: context } = useQuery({
    queryKey: ['course-context', storyId || courseId],
    queryFn: async () => {
      const id = storyId || courseId;
      const res = await fetch(getApiUrl(`/api/courses/${id}`));
      return res.json();
    },
    enabled: !!(storyId || courseId)
  });

  const submitPhase = useMutation({
    mutationFn: async ({ phaseId, content }: { phaseId: string, content: any }) => {
      const res = await fetch(getApiUrl(`/api/submissions`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phaseId, content })
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Phase submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
    }
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /> Loading Mission...</div>;

  const phases = lesson?.phases || [];
  const currentPhase = phases.find((p: any) => p.type === activeTab);
  const totalPhases = phases.length;
  const completedPhases = phases.filter((p: any) => p.submissions?.length > 0).length;
  const progressPercent = totalPhases > 0 ? (completedPhases / totalPhases) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Narrative Header */}
      <header className="bg-card border-b p-4 sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                Mission: {lesson?.title} 🚀
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={progressPercent} className="w-32 h-2" />
                <span className="text-xs font-medium text-muted-foreground">
                  {Math.round(progressPercent)}% Complete
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
             <div className="px-3 py-1 rounded-full bg-secondary text-xs font-bold text-secondary-foreground border">
               {context?.title || 'MISSION'}
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid h-auto grid-cols-5 p-1 bg-secondary/50 rounded-2xl w-full max-w-3xl">
              {['STORY', 'LOGIC', 'BUILD', 'IMPROVE', 'PRESENT'].map((type) => {
                const phase = phases.find((p: any) => p.type === type);
                const isLocked = !phase; // If phase doesn't exist for this lesson
                const isCompleted = phase?.submissions?.length > 0;
                
                return (
                  <TabsTrigger 
                    key={type} 
                    value={type}
                    disabled={isLocked}
                    className="flex flex-col gap-1 py-3 rounded-xl transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm relative overflow-hidden"
                  >
                    <PhaseIcon type={type} />
                    <span className="text-[10px] uppercase font-black font-brand">
                      {type}
                    </span>
                    {isLocked && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                        <Lock className="w-3 h-3 text-muted-foreground" />
                      </div>
                    )}
                    {isCompleted && (
                       <div className="absolute top-1 right-1">
                          <CheckCircle2 className="w-3 h-3 text-kiddykode-green" />
                       </div>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentPhase && (
                <PhaseContent 
                  phase={currentPhase}
                  onComplete={(content) => submitPhase.mutate({ phaseId: currentPhase.id, content })}
                  isSubmitting={submitPhase.isPending}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  );
};

const PhaseIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'STORY': return <Play className="w-5 h-5" />;
    case 'LOGIC': return <FileText className="w-5 h-5" />;
    case 'BUILD': return <Code className="w-5 h-5" />;
    case 'IMPROVE': return <PlusCircle className="w-5 h-5" />;
    case 'PRESENT': return <Send className="w-5 h-5" />;
    default: return <BookOpen className="w-5 h-5" />;
  }
};

const PhaseContent = ({ phase, onComplete, isSubmitting }: { phase: any, onComplete: (c: any) => void, isSubmitting: boolean }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer relative">
          {phase.content?.videoUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
              >
                <Play className="w-8 h-8 fill-current" />
              </motion.div>
            </div>
          ) : (
             <div className="text-white text-center">
                <Code className="w-16 h-16 mx-auto opacity-20 mb-4" />
                <p className="font-bold text-xl uppercase tracking-widest">{phase.title}</p>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
             <div className="text-white">
                <h3 className="text-2xl font-black uppercase tracking-tight">{phase.title}</h3>
                <p className="opacity-80">Phase {phase.order} of the KiddyKode Method™</p>
             </div>
          </div>
        </div>

        <div className="bg-card border-4 border-secondary rounded-3xl p-8 shadow-sm">
           <h4 className="text-lg font-black uppercase tracking-tight mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Guidelines
           </h4>
           <p className="text-muted-foreground leading-relaxed">
             {phase.content?.instructions || "Follow the mission objectives to proceed to the next phase. Accuracy and creativity are key!"}
           </p>
        </div>
      </div>

      <div className="space-y-6">
         <div className="bg-primary/5 border-2 border-primary/20 rounded-[2rem] p-6">
            <h4 className="font-black uppercase tracking-tight flex items-center gap-2 text-primary mb-6">
               <CheckCircle2 className="w-5 h-5" />
               Objectives
            </h4>
            <ul className="space-y-4">
               {(phase.content?.objectives || ["Complete the core task", "Submit your work", "Review the next steps"]).map((obj: string, i: number) => (
                 <li key={i} className="flex gap-4 text-sm font-medium text-muted-foreground leading-snug items-start">
                   <div className="w-6 h-6 rounded-full bg-white border-2 border-primary/20 shrink-0 flex items-center justify-center text-[10px] font-black text-primary">
                     {i + 1}
                   </div>
                   {obj}
                 </li>
               ))}
            </ul>
         </div>

         <div className="bg-card border-4 border-secondary rounded-[2rem] p-8 shadow-sm">
            <h4 className="font-black uppercase tracking-tight mb-4">Finalize Phase</h4>
            <Button 
              onClick={() => onComplete({ timestamp: new Date() })}
              disabled={isSubmitting || phase.submissions?.length > 0}
              className="w-full h-14 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-primary/90 text-xs shadow-lg"
            >
               {isSubmitting ? <Loader2 className="animate-spin" /> : (phase.submissions?.length > 0 ? "Completed ✅" : "Mark as Complete")}
            </Button>
            {phase.type === 'LOGIC' && !phase.submissions?.length && (
               <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest font-black">
                  Requires PDF Upload
               </p>
            )}
         </div>
      </div>
    </div>
  );
};

export default StoryMission;
