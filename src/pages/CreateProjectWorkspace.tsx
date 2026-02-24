import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Rocket, 
  FileText, 
  MessageSquare, 
  Target, 
  Code2, 
  Send, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Zap,
  Upload,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRole } from '@/hooks/useRole';
import { toast } from 'sonner';

const CreateProjectWorkspace = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const [currentPhaseIdx, setCurrentPhaseIdx] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const queryClient = useQueryClient();

  // Fetch Project Data
  const { data: project, isLoading } = useQuery({
    queryKey: ['create-project', projectId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/courses/${projectId}`);
      if (!res.ok) throw new Error('Failed to fetch project');
      return res.json();
    }
  });

  const phases = project?.modules?.[0]?.lessons?.[0]?.phases || [];
  const currentPhase = phases[currentPhaseIdx];
  const totalPhases = phases.length;

  const submitPhase = useMutation({
    mutationFn: async (content: any) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phaseId: currentPhase.id, content })
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success('Strategy phase synchronized! ✅');
      if (currentPhaseIdx < totalPhases - 1) {
        setCurrentPhaseIdx(prev => prev + 1);
      } else {
        navigate('/create');
      }
    }
  });

  if (isLoading) return <div className="min-h-screen bg-[#050510] flex items-center justify-center"><Loader2 className="animate-spin text-primary w-12 h-12" /></div>;

  const renderPhaseUI = () => {
    switch (currentPhase.type) {
      case 'PROPOSAL':
        return (
          <div className="space-y-8">
             <div className="grid grid-cols-1 gap-6">
                {currentPhase.content?.fields?.map((field: any, i: number) => (
                  <div key={i} className="space-y-3">
                     <label className="text-xs font-black uppercase text-white/40 tracking-widest">{field.label}</label>
                     {field.type === 'textarea' ? (
                        <textarea 
                           className="w-full bg-white/5 border-2 border-white/10 rounded-3xl p-6 text-lg font-medium focus:border-primary focus:outline-none transition-all h-32"
                           onChange={(e) => setFormData({...formData, [field.label]: e.target.value})}
                           value={formData[field.label] || ''}
                           placeholder={`Enter ${field.label}...`}
                        />
                     ) : (
                        <input 
                           type="text"
                           className="w-full bg-white/5 border-2 border-white/10 rounded-3xl p-6 text-lg font-medium focus:border-primary focus:outline-none transition-all"
                           onChange={(e) => setFormData({...formData, [field.label]: e.target.value})}
                           value={formData[field.label] || ''}
                           placeholder={field.placeholder || `Enter ${field.label}...`}
                        />
                     )}
                  </div>
                ))}
             </div>
          </div>
        );
      case 'FACILITATOR_REVIEW':
        return (
          <div className="flex flex-col items-center justify-center text-center py-20 space-y-8 bg-primary/5 rounded-[4rem] border-2 border-white/5">
             <div className="relative">
                <ShieldCheck className="w-24 h-24 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
             </div>
             <div className="space-y-4 max-w-sm">
                <h3 className="text-3xl font-black uppercase tracking-tight">Strategy Audit</h3>
                <p className="text-white/40 font-medium leading-relaxed">
                   {currentPhase.content?.instructions || "Your proposal is being reviewed by a KiddyKode facilitator. This ensures your project logic is sound before you start building."}
                </p>
             </div>
             <div className="px-6 py-3 bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Status: Awaiting Approval
             </div>
          </div>
        );
      case 'MILESTONE':
      case 'FINAL_SUBMISSION':
        return (
          <div className="space-y-12">
             <div className="bg-[#0a0a15] rounded-[3rem] p-12 border-2 border-white/10 relative overflow-hidden group">
                <Zap className="absolute -top-6 -right-6 w-32 h-32 text-primary/5 group-hover:text-primary/10 transition-all" />
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-primary mb-6">Technical Objectives</h4>
                <ul className="space-y-6">
                   {currentPhase.content?.objectives?.map((obj: string, i: number) => (
                      <li key={i} className="flex gap-6 items-start">
                         <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                            <span className="text-xs font-black text-primary">{i+1}</span>
                         </div>
                         <p className="text-lg font-bold text-white/80">{obj}</p>
                      </li>
                   ))}
                </ul>
             </div>

             <div className="bg-white/5 rounded-[3rem] p-12 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center space-y-6 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer">
                <div className="p-6 bg-primary/20 rounded-3xl">
                   <Upload className="w-10 h-10 text-primary" />
                </div>
                <div>
                   <h5 className="text-xl font-black uppercase mb-1">Upload Work Artifacts</h5>
                   <p className="text-white/40 text-sm font-medium">Drag & drop your code exports or documentation here.</p>
                </div>
             </div>
          </div>
        );
      case 'FEEDBACK':
        return (
          <div className="space-y-8">
             <div className="bg-kiddykode-purple/10 border-2 border-kiddykode-purple/30 rounded-[3rem] p-12">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-3 bg-kiddykode-purple/20 rounded-2xl">
                      <MessageSquare className="w-6 h-6 text-kiddykode-purple" />
                   </div>
                   <h4 className="text-xl font-black uppercase tracking-tight text-kiddykode-purple">Facilitator Insights</h4>
                </div>
                <div className="space-y-6 text-lg font-medium text-white/70 leading-relaxed italic">
                   "Great start on the architectural plan. I recommend normalizing the user settings table to handle dynamic roles more effectively in Milestone 2. Focus on the query efficiency for the dashboard."
                </div>
             </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-20 grayscale opacity-20">
             <Rocket className="w-20 h-20 mx-auto mb-6" />
             <p className="font-black uppercase tracking-widest">Phase Logic Initializing...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Premium Workspace Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl p-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
             <Button variant="ghost" size="icon" onClick={() => navigate('/create')} className="text-white hover:bg-white/10 rounded-2xl p-6">
                <ArrowLeft className="w-6 h-6" />
             </Button>
             <div>
                <div className="flex items-center gap-3 mb-1">
                   <Target className="w-5 h-5 text-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                   <h1 className="text-xl font-black uppercase tracking-tight">{project.title}</h1>
                </div>
                <div className="flex items-center gap-4">
                   <div className="h-2 w-48 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentPhaseIdx + 1) / totalPhases) * 100}%` }}
                        className="h-full bg-primary" 
                      />
                   </div>
                   <span className="text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">Strategy Phase {currentPhaseIdx + 1}/{totalPhases}</span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-kiddykode-yellow" />
                <span className="text-[10px] font-black uppercase tracking-widest italic">{role} Clearance</span>
             </div>
          </div>
        </div>
      </header>

      {/* Modern Two-Pane Layout */}
      <main className="flex-1 container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 px-6 overflow-hidden">
         
         {/* Instruction Pane */}
         <div className="lg:col-span-5 space-y-8 overflow-y-auto pr-4 custom-scrollbar">
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentPhaseIdx}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 className="space-y-8"
               >
                  <div className="inline-flex items-center gap-4 px-6 py-2 rounded-2xl bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20">
                     Phase: {currentPhase.type.replace('_', ' ')}
                  </div>
                  
                  <h2 className="text-6xl font-black uppercase tracking-tighter leading-[0.9]">{currentPhase.title}</h2>
                  
                  <div className="text-xl text-white/50 leading-relaxed font-medium">
                     {currentPhase.content?.instructions || "Execute the defined objectives to progress through the capstone lifecycle."}
                  </div>

                  {currentPhase.content?.requirements && (
                     <div className="pt-12 border-t border-white/5 space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">Technical Requirements</h4>
                        <div className="grid gap-4">
                           {currentPhase.content.requirements.map((req: string, i: number) => (
                              <div key={i} className="flex items-center gap-4 text-sm font-bold text-white/80">
                                 <div className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
                                    <ChevronRight className="w-4 h-4" />
                                 </div>
                                 {req}
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </motion.div>
            </AnimatePresence>
         </div>

         {/* Interaction Pane */}
         <div className="lg:col-span-7 h-full flex flex-col justify-center">
            <div className="relative">
               {/* Decorative bloom */}
               <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
               
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhaseIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative z-10"
                  >
                     {renderPhaseUI()}

                     <div className="mt-16 flex gap-6">
                        <Button 
                          variant="ghost" 
                          disabled={currentPhaseIdx === 0}
                          onClick={() => setCurrentPhaseIdx(prev => prev - 1)}
                          className="h-16 px-10 rounded-[2rem] bg-white/5 border border-white/10 uppercase font-black text-[10px] tracking-widest hover:bg-white/10 transition-all"
                        >
                           <ChevronLeft className="w-4 h-4 mr-3" /> Rollback
                        </Button>
                        <Button 
                          onClick={() => submitPhase.mutate(formData)}
                          disabled={submitPhase.isPending || currentPhase.type === 'FACILITATOR_REVIEW'}
                          className="flex-1 h-16 rounded-[2rem] bg-primary text-white hover:bg-primary/90 font-black uppercase text-[10px] tracking-[0.3em] shadow-[0_20px_40px_rgba(var(--primary),0.2)] transition-all"
                        >
                           {submitPhase.isPending ? <Loader2 className="animate-spin" /> : (
                              currentPhaseIdx === totalPhases - 1 ? "Finalize Strategy" : (
                                 currentPhase.type === 'FACILITATOR_REVIEW' ? "Awaiting Signal" : (
                                    <>Synchronize Phase <ChevronRight className="w-4 h-4 ml-3" /></>
                                 )
                              )
                           )}
                        </Button>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </main>

      {/* Footer System Status */}
      <footer className="p-8 bg-black/40 border-t border-white/5">
         <div className="container mx-auto flex justify-between items-center">
            <div className="text-[10px] font-black uppercase text-white/10 tracking-[1em]">
               KiddyKode // Capstone Simulation Framework v2.4
            </div>
            <div className="flex gap-4">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
               <div className="w-2 h-2 rounded-full bg-white/10" />
               <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
         </div>
      </footer>
    </div>
  );
};

export default CreateProjectWorkspace;
