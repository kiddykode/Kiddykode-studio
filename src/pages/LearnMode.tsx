import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, Lock, Award, BookOpen, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRole } from '@/hooks/useRole';

const LearnMode = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { role } = useRole();
  const isFrench = i18n.language === 'fr';

  // Fetch Courses
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses', 'LEARN'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/courses?type=LEARN`);
      if (!res.ok) throw new Error('Failed to fetch courses');
      return res.json();
    }
  });

  // Fetch User Badges
  const { data: userBadges } = useQuery({
    queryKey: ['user-badges'],
    queryFn: async () => {
      // Dummy check for now, can be expanded later
      return [];
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-kiddykode-green text-white p-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-3xl font-black font-brand uppercase tracking-tight">
                {t('learnMode')} 📖
              </h1>
              <p className="text-sm opacity-90 font-medium">Master the power of code via structured adventures.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-2xl flex items-center gap-2">
              <Award className="w-5 h-5 text-kiddykode-yellow" />
              <span className="font-bold">{userBadges?.length || 0} Badges Earned</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-kiddykode-green" />
              Your Learning Path
            </h2>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              Level: {role}
            </div>
          </div>

          {coursesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-3xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses?.map((course: any, index: number) => {
                const progress = 0; // Will be calculated from backend progress
                
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={() => navigate(`/learn/${course.id}`)}
                    className="bg-card border-4 border-transparent hover:border-kiddykode-green/30 rounded-[2.5rem] p-8 cursor-pointer shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-16 h-16 bg-kiddykode-green/10 rounded-2xl flex items-center justify-center text-3xl">
                         {course.icon || '🐍'}
                       </div>
                       <div className="bg-kiddykode-green/10 text-kiddykode-green text-[10px] font-black px-3 py-1 rounded-full uppercase">
                         {course.tierRequired}
                       </div>
                    </div>

                    <h3 className="text-2xl font-black text-foreground mb-3">{course.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-6">
                      {course.description || 'Dive into this adventure and master new skills.'}
                    </p>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wide">
                        <span className="text-muted-foreground">{course._count?.modules || 0} Modules</span>
                        <span className="text-kiddykode-green">{progress}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-kiddykode-green rounded-full shadow-[0_0_10px_rgba(62,207,142,0.5)]"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Badges Section */}
        <section className="bg-secondary/30 rounded-[3rem] p-12 border-2 border-dashed">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-foreground mb-4">🏆 Hall of Fame</h2>
            <p className="text-muted-foreground">Complete courses and challenges to earn exclusive badges.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {userBadges?.length === 0 ? (
               [1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="flex flex-col items-center gap-3 opacity-20 grayscale">
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-dashed flex items-center justify-center text-4xl">
                      🔒
                    </div>
                    <span className="text-[10px] font-black uppercase text-muted-foreground">Locked</span>
                 </div>
               ))
            ) : (
                userBadges?.map((userBadge: any) => (
                    <motion.div 
                      key={userBadge.id}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex flex-col items-center gap-3"
                    >
                       <div className="w-24 h-24 rounded-full bg-white border-4 border-kiddykode-yellow shadow-lg flex items-center justify-center text-4xl">
                         {userBadge.badge.icon}
                       </div>
                       <span className="text-[10px] font-black uppercase text-foreground">{userBadge.badge.name}</span>
                    </motion.div>
                ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LearnMode;
