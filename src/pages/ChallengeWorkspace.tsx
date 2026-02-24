import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Terminal, 
  FileText, 
  Code2, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Timer,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRole } from '@/hooks/useRole';
import { toast } from 'sonner';

const ChallengeWorkspace = () => {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Fetch Challenge Data
  const { data: challenge, isLoading } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/courses/${challengeId}`);
      if (!res.ok) throw new Error('Failed to fetch challenge');
      return res.json();
    }
  });

  // Flattened phases from all modules/lessons (Challenges usually have 1 module/lesson)
  const phases = challenge?.modules?.[0]?.lessons?.[0]?.phases || [];
  const currentPhase = phases[currentPhaseIdx];
  const totalPhases = phases.length;

  useEffect(() => {
    if (currentPhase?.content?.timeLimit && timeLeft === null) {
      setTimeLeft(currentPhase.content.timeLimit);
    }
  }, [currentPhase, timeLeft]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => (prev !== null ? prev - 1 : null)), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const submitChallenge = useMutation({
    mutationFn: async (content: any) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phaseId: currentPhase.id, content })
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Phase submitted!');
      if (currentPhaseIdx < totalPhases - 1) {
        setCurrentPhaseIdx(prev => prev + 1);
      } else {
        navigate('/challenges');
      }
    }
  });

  if (isLoading) return <div className="min-h-screen bg-kiddykode-blue-dark flex items-center justify-center"><Loader2 className="animate-spin text-kiddykode-green" /></div>;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-kiddykode-blue-dark text-white flex flex-col font-sans selection:bg-kiddykode-green selection:text-black">
      {/* Workspace Header */}
      <header className="border-b border-white/10 bg-black/40 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={() => navigate('/challenges')} className="text-white hover:bg-white/10 rounded-xl">
                <ArrowLeft className="w-5 h-5" />
             </Button>
             <div>
                <h1 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                   <Terminal className="w-4 h-4 text-kiddykode-green" />
                   {challenge.title}
                </h1>
                <div className="flex items-center gap-3">
                   <div className="h-1.5 w-32 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-kiddykode-green transition-all" style={{ width: `${((currentPhaseIdx + 1) / totalPhases) * 100}%` }} />
                   </div>
                   <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">
                      Step {currentPhaseIdx + 1} of {totalPhases}
                   </span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             {timeLeft !== null && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${timeLeft < 30 ? 'border-destructive text-destructive bg-destructive/10 bg-destructive/5' : 'border-kiddykode-yellow/50 text-kiddykode-yellow bg-kiddykode-yellow/5'}`}>
                   <Timer className="w-4 h-4" />
                   <span className="font-mono font-black">{formatTime(timeLeft)}</span>
                </div>
             )}
             <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-black uppercase tracking-widest">
                Tier: {role}
             </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 h-full">
           
           {/* Left Pane: Documentation/Instructions */}
           <div className="bg-kiddykode-blue-dark p-12 overflow-y-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhaseIdx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                   <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-kiddykode-green/10 text-kiddykode-green text-[10px] font-black uppercase tracking-widest border border-kiddykode-green/30">
                      {currentPhase.type}
                   </div>
                   
                   <h2 className="text-4xl font-black uppercase tracking-tighter leading-[0.9]">{currentPhase.title}</h2>
                   
                   <div className="prose prose-invert max-w-none">
                      <p className="text-xl text-white/60 leading-relaxed font-medium italic">
                        {currentPhase.content?.instructions || "Review the requirements carefully before proceeding to the code phase."}
                      </p>
                   </div>

                   {currentPhase.content?.objectives && (
                      <div className="space-y-4 pt-8 border-t border-white/10">
                         <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Critical Objectives</h4>
                         <ul className="grid gap-3">
                            {currentPhase.content.objectives.map((obj: string, i: number) => (
                               <li key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold">
                                  <div className="w-6 h-6 rounded-lg bg-kiddykode-green text-black flex items-center justify-center text-[10px] shrink-0">
                                    {i+1}
                                  </div>
                                  {obj}
                               </li>
                            ))}
                         </ul>
                      </div>
                   )}
                </motion.div>
              </AnimatePresence>
           </div>

           {/* Right Pane: Interaction Area (Editor / Quiz) */}
           <div className="bg-black/20 p-12 overflow-y-auto">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={currentPhaseIdx}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="h-full flex flex-col"
                 >
                    {currentPhase.type === 'CHALLENGE_EDITOR' ? (
                       <div className="flex-1 flex flex-col gap-6">
                          <div className="bg-[#1e1e1e] rounded-3xl border-4 border-[#333] overflow-hidden flex flex-col shadow-2xl h-[400px]">
                             <div className="bg-[#333] px-6 py-3 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">integrated_editor_v1.0</span>
                                <div className="flex gap-1.5">
                                   <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                                   <div className="w-2.5 h-2.5 rounded-full bg-kiddykode-yellow/50" />
                                   <div className="w-2.5 h-2.5 rounded-full bg-kiddykode-green/50" />
                                </div>
                             </div>
                             <textarea 
                                className="flex-1 bg-transparent p-8 font-mono text-sm resize-none focus:outline-none text-kiddykode-green leading-relaxed"
                                defaultValue={currentPhase.content?.starterCode || '# Your code here\n'}
                                spellCheck={false}
                             />
                          </div>
                          
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                             <h4 className="text-[10px] font-black uppercase text-white/40 mb-3 tracking-widest italic">Terminal Output</h4>
                             <div className="font-mono text-[10px] text-white/30 italic">
                                Ready for deployment...
                             </div>
                          </div>
                       </div>
                    ) : currentPhase.type === 'SCENARIO' && currentPhase.content?.videoUrl ? (
                         <div className="flex-1 flex items-center justify-center">
                            <motion.div 
                              whileHover={{ scale: 1.05 }}
                              className="aspect-video w-full bg-black rounded-3xl shadow-2xl flex items-center justify-center group cursor-pointer border-4 border-white/5"
                            >
                               <Play className="w-20 h-20 text-kiddykode-green opacity-20 group-hover:opacity-100 transition-all fill-current" />
                            </motion.div>
                         </div>
                    ) : (
                       <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                          <div className="w-24 h-24 rounded-[2rem] bg-kiddykode-green/10 flex items-center justify-center border border-kiddykode-green/20">
                             <FileText className="w-10 h-10 text-kiddykode-green" />
                          </div>
                          <h3 className="text-2xl font-black uppercase">Information Review Phase</h3>
                          <p className="max-w-xs text-white/40 font-medium">Verify the objectives on the left panel before submitting this phase.</p>
                       </div>
                    )}

                    <div className="mt-12 flex gap-4">
                       <Button 
                         variant="ghost" 
                         disabled={currentPhaseIdx === 0}
                         onClick={() => setCurrentPhaseIdx(prev => prev - 1)}
                         className="h-14 px-8 rounded-2xl bg-white/5 border border-white/10 uppercase font-black text-xs hover:bg-white/10"
                       >
                          <ChevronLeft className="w-4 h-4 mr-2" /> Back
                       </Button>
                       <Button 
                         onClick={() => submitChallenge.mutate({ timestamp: new Date() })}
                         disabled={submitChallenge.isPending}
                         className="flex-1 h-14 rounded-2xl bg-kiddykode-green text-black hover:bg-kiddykode-green/90 font-black uppercase text-xs shadow-xl shadow-kiddykode-green/20"
                       >
                          {submitChallenge.isPending ? <Loader2 className="animate-spin" /> : (
                             currentPhaseIdx === totalPhases - 1 ? "Complete Challenge" : (
                                <>Next Phase <ChevronRight className="w-4 h-4 ml-2" /></>
                             )
                          )}
                       </Button>
                    </div>
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-4 bg-black/60 border-t border-white/5 flex justify-center">
         <div className="text-[9px] font-black uppercase text-white/20 tracking-[0.5em]">
            KiddyKode Challenge Lab © 2026 // Simulation System Verified
         </div>
      </footer>
    </div>
  );
};

export default ChallengeWorkspace;
