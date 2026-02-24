import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  ChevronRight, 
  Lock, 
  Play, 
  CheckCircle2, 
  Clock,
  Unlock,
  Star,
  Award,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRole } from '@/hooks/useRole';

const LearnCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/courses/${courseId}`);
      if (!res.ok) throw new Error('Failed to fetch course');
      return res.json();
    }
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading Course curriculum...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Course Hero Header */}
      <header className="bg-kiddykode-blue-dark text-white py-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-10 left-10 w-64 h-64 border-8 border-white rounded-full" />
           <div className="absolute bottom-10 right-10 w-96 h-96 border-8 border-white rounded-full" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/learn')}
            className="text-white hover:bg-white/10 mb-8 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Catalog
          </Button>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl">
              <span className="bg-kiddykode-blue text-white text-[10px] font-black px-3 py-1 rounded-full uppercase mb-4 inline-block">
                Course Track
              </span>
              <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">{course.title}</h1>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm font-bold">
                 <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl">
                    <Clock className="w-4 h-4 text-kiddykode-blue" />
                    {course.modules?.length || 0} Modules
                 </div>
                 <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl">
                    <Star className="w-4 h-4 text-kiddykode-yellow" />
                    {course.tierRequired}+ 
                 </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 w-full md:w-80">
               <h4 className="font-brand font-black uppercase text-sm mb-4">Your Progress</h4>
               <div className="space-y-4">
                  <Progress value={0} className="h-4 bg-white/10" />
                  <div className="flex justify-between text-xs font-bold text-white/50">
                     <span>0% Complete</span>
                     <span>0/12 Lessons</span>
                  </div>
                  <Button className="w-full h-12 rounded-xl bg-kiddykode-green hover:bg-kiddykode-green/90 font-black uppercase text-xs">
                     Resume Learning
                  </Button>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="space-y-12">
           {course.modules?.map((module: any, modIdx: number) => (
             <section key={module.id} className="relative">
                <div className="flex items-center gap-6 mb-8 group cursor-default">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black transition-all ${module.isLocked ? 'bg-muted text-muted-foreground' : 'bg-kiddykode-blue text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'}`}>
                      {modIdx + 1}
                   </div>
                   <div>
                      <h2 className={`text-2xl font-black uppercase tracking-tight flex items-center gap-3 ${module.isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {module.title}
                        {module.isLocked && <Lock className="w-5 h-5" />}
                        {!module.isLocked && modIdx < 1 && <CheckCircle2 className="w-5 h-5 text-kiddykode-green" />}
                      </h2>
                      <p className="text-muted-foreground text-sm font-medium mt-1">
                        {module.lessons?.length || 0} Lessons in this module
                      </p>
                   </div>
                </div>

                <div className="grid gap-4 pl-10 md:pl-16">
                   {module.lessons?.map((lesson: any, lesIdx: number) => (
                     <motion.div
                       key={lesson.id}
                       whileHover={!module.isLocked ? { x: 10 } : {}}
                       onClick={() => !module.isLocked && navigate(`/learn/${course.id}/lessons/${lesson.id}`)}
                       className={`p-6 rounded-2xl transition-all border-2 flex items-center justify-between group ${
                         module.isLocked 
                         ? 'bg-muted/30 border-transparent opacity-60 cursor-not-allowed' 
                         : 'bg-card border-secondary hover:border-kiddykode-blue cursor-pointer shadow-sm hover:shadow-md'
                       }`}
                     >
                       <div className="flex items-center gap-6">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${module.isLocked ? 'bg-muted text-muted-foreground' : 'bg-secondary text-primary group-hover:bg-kiddykode-blue group-hover:text-white transition-colors'}`}>
                             {module.isLocked ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </div>
                          <div>
                             <h4 className="font-black text-lg">{lesson.title}</h4>
                             <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mt-1">
                                <span className="uppercase tracking-widest text-primary">Mission</span>
                                <span className="opacity-30">•</span>
                                <span>5 Phases</span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-4">
                          {!module.isLocked && (
                             <div className="p-2 rounded-full border group-hover:border-kiddykode-blue">
                               <ChevronRight className={`w-5 h-5 ${module.isLocked ? 'text-muted-foreground' : 'text-kiddykode-blue'}`} />
                             </div>
                          )}
                          {module.isLocked && (
                             <span className="text-[10px] font-black uppercase bg-muted text-muted-foreground px-2 py-1 rounded">
                               Tier Restricted
                             </span>
                          )}
                       </div>
                     </motion.div>
                   ))}
                </div>
                
                {/* Visual Connector Line */}
                {modIdx < (course.modules?.length - 1) && (
                   <div className="absolute left-6 top-16 w-1 h-32 bg-secondary -z-10 hidden md:block" />
                )}
             </section>
           ))}
        </div>

        {/* Upgrade Call-to-action for Explorers */}
        {role === 'EXPLORER' && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="mt-20 bg-gradient-to-br from-kiddykode-purple to-kiddykode-blue rounded-[3rem] p-12 text-center text-white shadow-2xl overflow-hidden relative"
           >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Become a Builder! 🛠️</h3>
              <p className="text-lg opacity-80 max-w-xl mx-auto mb-8">
                Unlock all {course.modules?.length} modules, advanced Python tracks, and exclusive badges by upgrading your tier today.
              </p>
              <Button className="h-14 px-10 rounded-2xl bg-white text-kiddykode-purple hover:bg-white/90 font-black uppercase text-sm shadow-xl">
                 Upgrade Now
              </Button>
           </motion.div>
        )}
      </main>
    </div>
  );
};

export default LearnCourseDetail;
