import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Rocket, 
  Sparkles, 
  ChevronRight, 
  Lock, 
  Star,
  Layers,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRole } from '@/hooks/useRole';
import { Button } from '@/components/ui/button';
import { getApiUrl } from '@/lib/api';

const CreateMode = () => {
  const navigate = useNavigate();
  const { role, can } = useRole();

  // Fetch Create Mode Projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['create-projects'],
    queryFn: async () => {
      const res = await fetch(getApiUrl(`/api/courses?type=CREATE`));
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    }
  });

  const isPremiumUser = can('BUILDER');

  return (
    <div className="min-h-screen bg-[#050510] text-white font-sans overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Premium Header */}
      <header className="border-b border-white/5 p-8 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/dashboard')}
              className="p-4 rounded-3xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            >
              <ArrowLeft className="w-8 h-8" />
            </motion.button>
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-primary/20 rounded-2xl">
                   <Rocket className="w-8 h-8 text-primary shadow-[0_0_20px_rgba(var(--primary),0.5)]" />
                </div>
                <h1 className="text-4xl font-black font-brand uppercase tracking-tighter">Create Mode <span className="text-white/20">/</span> <span className="text-primary italic">Capstone</span></h1>
              </div>
              <p className="text-xs font-black text-white/40 uppercase tracking-[0.5em]">Transformation Layer // Level: {role}</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
             <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-kiddykode-yellow" />
                <span className="text-sm font-black uppercase tracking-widest">Premium Core</span>
             </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        {/* Intro Hero */}
        <div className="relative mb-24">
           <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
           <div className="absolute top-0 right-0 w-64 h-64 bg-kiddykode-purple/10 blur-[100px] rounded-full pointer-events-none" />
           
           <div className="max-w-4xl relative z-10">
              <h2 className="text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
                Build what matters. <br />
                <span className="text-white/30">Your vision. Our architecture.</span>
              </h2>
              <p className="text-2xl text-white/50 leading-relaxed max-w-2xl font-medium">
                Create Mode is where tutorials end and engineering begins. Take your idea from a simple proposal to a live, scalable application.
              </p>
           </div>
        </div>

        {/* Project Selection */}
        <section className="space-y-12">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <Layers className="w-6 h-6 text-primary" />
                 <h3 className="text-xl font-black uppercase tracking-widest">Professional Tracks</h3>
              </div>
              {!isPremiumUser && (
                 <div className="bg-destructive/10 text-destructive border border-destructive/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-3 h-3" /> Builder Clearance Required
                 </div>
              )}
           </div>

           {isLoading ? (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[1, 2].map(i => (
                  <div key={i} className="h-80 bg-white/5 rounded-[3rem] animate-pulse" />
                ))}
             </div>
           ) : (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {projects?.map((project: any, idx: number) => {
                  const isLocked = !isPremiumUser;
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      onClick={() => !isLocked && navigate(`/create/${project.id}`)}
                      className={`group relative bg-[#0a0a15] rounded-[3.5rem] p-12 border-2 transition-all cursor-pointer overflow-hidden ${isLocked ? 'border-white/5 grayscale brightness-50 opacity-40' : 'border-white/10 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(var(--primary),0.1)]'}`}
                    >
                       {/* Abstract Background */}
                       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
                       
                       <div className="relative z-10 h-full flex flex-col">
                          <div className="flex justify-between items-start mb-12">
                             <div className="p-5 bg-white/5 rounded-3xl border border-white/10 group-hover:border-primary/30 transition-all">
                                <Star className="w-8 h-8 text-kiddykode-yellow group-hover:scale-110 transition-all" />
                             </div>
                             {isLocked ? (
                                <Lock className="w-8 h-8 text-white/20" />
                             ) : (
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Active Strategy</div>
                             )}
                          </div>

                          <h4 className="text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
                             {project.title}
                          </h4>
                          <p className="text-lg text-white/40 font-medium mb-12 line-clamp-2">
                             {project.description}
                          </p>

                          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-8">
                             <div className="flex gap-4">
                                <TrackStat icon={<CheckCircle2 className="w-4 h-4" />} label="Steps" value="7 Phases" />
                                <TrackStat icon={<Clock className="w-4 h-4" />} label="Duration" value="4-6 Weeks" />
                             </div>
                             <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/25">
                                <ChevronRight className="w-6 h-6" />
                             </div>
                          </div>
                       </div>
                    </motion.div>
                  );
                })}

                {/* Explorer Call to Action Card */}
                {!isPremiumUser && (
                   <div className="bg-gradient-to-br from-primary/20 to-kiddykode-purple/20 rounded-[3.5rem] p-12 border-2 border-primary/30 flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-20 h-20 rounded-3xl bg-black flex items-center justify-center border border-white/10">
                         <Star className="w-10 h-10 text-kiddykode-yellow animate-pulse" />
                      </div>
                      <h4 className="text-3xl font-black uppercase tracking-tight">Become a Builder</h4>
                      <p className="text-white/60 font-medium max-w-sm">
                        Create Mode is the professional layer of KiddyKode. Upgrade your clearance to start your Capstone project.
                      </p>
                      <Button className="h-14 px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-black uppercase text-sm shadow-2xl shadow-primary/30">
                         Unlock Advanced Clearance
                      </Button>
                   </div>
                )}
             </div>
           )}
        </section>
      </main>
    </div>
  );
};

const TrackStat = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="space-y-1">
     <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-white/20 tracking-widest">
        {icon} {label}
     </div>
     <div className="text-xs font-black uppercase">{value}</div>
  </div>
);

export default CreateMode;
