import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  FlaskConical, 
  Zap, 
  Trophy, 
  Terminal, 
  ShieldCheck,
  ChevronRight,
  Timer
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRole } from '@/hooks/useRole';
import { Button } from '@/components/ui/button';
import { getApiUrl } from '@/lib/api';

const ChallengeLab = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { role, can } = useRole();

  // Fetch Challenges
  const { data: challenges, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const res = await fetch(getApiUrl(`/api/courses?type=CHALLENGE`));
      if (!res.ok) throw new Error('Failed to fetch challenges');
      return res.json();
    }
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'EXPLORER': return 'bg-kiddykode-green/20 text-kiddykode-green border-kiddykode-green/50';
      case 'BUILDER': return 'bg-kiddykode-blue/20 text-kiddykode-blue border-kiddykode-blue/50';
      case 'CREATOR_ELITE': return 'bg-kiddykode-purple/20 text-kiddykode-purple border-kiddykode-purple/50';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-kiddykode-blue-dark text-white font-sans selection:bg-kiddykode-green selection:text-black">
      {/* Lab Header */}
      <header className="border-b border-white/10 p-6 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/dashboard')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <FlaskConical className="w-6 h-6 text-kiddykode-green" />
                <h1 className="text-3xl font-black font-brand uppercase tracking-tight">Challenge Lab 🧪</h1>
              </div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-[0.3em]">Authorized Access: {role}</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
             <StatCard icon={<Zap className="w-4 h-4 text-kiddykode-yellow" />} label="Rank" value="Novice" />
             <StatCard icon={<Trophy className="w-4 h-4 text-kiddykode-green" />} label="Points" value="450" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
           <div className="lg:col-span-2">
              <h2 className="text-4xl font-black mb-6 leading-tight uppercase">Apply your knowledge in <span className="text-kiddykode-green">Live Scenarios</span>.</h2>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                Welcome to the proving grounds. Challenge Lab is where we test your structural logic and execution speed. Select a simulation to begin.
              </p>
           </div>
           <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
              <Zap className="absolute -top-4 -right-4 w-24 h-24 text-kiddykode-yellow/10 group-hover:text-kiddykode-yellow/20 transition-all" />
              <h4 className="font-black uppercase text-sm mb-4 text-kiddykode-yellow">Daily Directive</h4>
              <p className="text-sm font-medium mb-6">Complete a Builder Challenge today to earn double XP.</p>
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 h-12 uppercase font-black text-[10px]">
                Accept Directive
              </Button>
           </div>
        </div>

        {/* Challenge Grid */}
        <section className="space-y-12">
           <div className="flex items-center gap-4">
              <Terminal className="w-6 h-6 text-kiddykode-green" />
              <h3 className="text-xl font-black uppercase tracking-widest text-white/80">Available Simulations</h3>
           </div>

           {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-white/5 rounded-[2rem] animate-pulse" />
                ))}
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
                {challenges?.map((challenge: any, idx: number) => {
                  const isLocked = !can(challenge.tierRequired);
                  
                  return (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={!isLocked ? { y: -10 } : {}}
                      onClick={() => !isLocked && navigate(`/challenges/${challenge.id}`)}
                      className={`relative bg-white rounded-[2rem] p-8 shadow-2xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between h-[320px] ${isLocked ? 'grayscale brightness-50 cursor-not-allowed' : 'hover:shadow-kiddykode-green/20'}`}
                    >
                       {/* Blueprint Background Effect */}
                       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                       
                       <div>
                         <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${getTierColor(challenge.tierRequired)}`}>
                               {challenge.tierRequired.replace('_', ' ')}
                            </div>
                            {isLocked ? (
                               <ShieldCheck className="w-6 h-6 text-muted-foreground" />
                            ) : (
                               <ChevronRight className="w-6 h-6 text-kiddykode-green" />
                            )}
                         </div>

                         <h4 className="text-2xl font-black uppercase tracking-tight mb-3 leading-tight leading-snug">
                            {challenge.title}
                         </h4>
                         <p className="text-sm font-medium text-black/60 line-clamp-3 leading-relaxed">
                            {challenge.description}
                         </p>
                       </div>

                       <div className="flex items-center justify-between mt-auto border-t pt-6 relative z-10">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                             <Timer className="w-4 h-4" />
                             {challenge.tierRequired === 'CREATOR_ELITE' ? 'Timed' : 'Open'}
                          </div>
                          {isLocked && (
                             <span className="text-[10px] font-black text-destructive uppercase">Security Lock</span>
                          )}
                       </div>
                    </motion.div>
                  );
                })}
             </div>
           )}
        </section>

        {/* Role Upgrade for Explorers */}
        {role === 'EXPLORER' && (
           <div className="mt-20 p-1 bg-gradient-to-r from-kiddykode-green to-kiddykode-blue rounded-[3rem]">
              <div className="bg-kiddykode-blue-dark rounded-[2.9rem] p-12 text-center relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-kiddykode-green/5 blur-3xl -z-10" />
                 <h3 className="text-3xl font-black uppercase mb-4">Level Up Your Lab Access 🧪</h3>
                 <p className="text-white/60 max-w-xl mx-auto mb-8 font-medium italic">
                   Expert Mode challenges, recursive logic puzzles, and elite coding marathons are reserved for **Builders**. Upgrade to unlock the full laboratory.
                 </p>
                 <Button className="h-14 px-10 rounded-2xl bg-kiddykode-green text-black hover:bg-kiddykode-green/90 font-black uppercase text-sm shadow-xl shadow-kiddykode-green/20">
                    Upgrade Clearance
                 </Button>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
     <div className="p-2 rounded-xl bg-white/5">{icon}</div>
     <div>
        <p className="text-[10px] uppercase font-black text-white/40 tracking-widest">{label}</p>
        <p className="text-sm font-black">{value}</p>
     </div>
  </div>
);

export default ChallengeLab;
