import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Trophy, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';
import BadgeDisplay from '@/components/BadgeDisplay';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { progress, userName } = useProgressStore();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground p-4">
        <div className="container mx-auto flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">{t('parentDashboard')} 👨‍👩‍👧</h1>
            <p className="text-sm opacity-80">Monitor {userName}'s learning progress</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-6 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-kiddykode-green/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-kiddykode-green" />
              </div>
              <span className="text-sm text-muted-foreground">{t('lessonsCompleted')}</span>
            </div>
            <div className="text-3xl font-black text-foreground">
              {progress.lessonsCompleted.length}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Current Rank</span>
            </div>
            <BadgeDisplay badge={progress.currentBadge} size="md" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-kiddykode-cyan/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-kiddykode-cyan" />
              </div>
              <span className="text-sm text-muted-foreground">{t('timeSpent')}</span>
            </div>
            <div className="text-3xl font-black text-foreground">
              {progress.totalTimeSpent}
              <span className="text-lg font-normal text-muted-foreground"> min</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-6 shadow-soft"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-kiddykode-purple/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-kiddykode-purple" />
              </div>
              <span className="text-sm text-muted-foreground">Projects</span>
            </div>
            <div className="text-3xl font-black text-foreground">
              {progress.projectsCreated.length}
            </div>
          </motion.div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-2xl p-6 shadow-soft"
          >
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {t('recentActivity')}
            </h3>
            
            {progress.lessonsCompleted.length > 0 ? (
              <div className="space-y-3">
                {progress.lessonsCompleted.slice(-5).reverse().map((lesson, index) => (
                  <div
                    key={`${lesson.lessonId}-${index}`}
                    className="flex items-center justify-between p-3 bg-muted rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-kiddykode-green/20 rounded-full flex items-center justify-center text-kiddykode-green">
                        ✓
                      </span>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Completed lesson
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {lesson.lessonId}
                        </p>
                      </div>
                    </div>
                    {lesson.completedAt && (
                      <span className="text-xs text-muted-foreground">
                        {formatDate(lesson.completedAt)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No activity yet. Encourage your child to start learning!
              </p>
            )}
          </motion.div>

          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-6 shadow-soft"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">
              Skills Development
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Basics', emoji: '📝', lessons: 2, color: 'bg-kiddykode-green' },
                { name: 'Variables', emoji: '📦', lessons: 2, color: 'bg-kiddykode-yellow' },
                { name: 'Loops', emoji: '🔄', lessons: 2, color: 'bg-kiddykode-cyan' },
                { name: 'Conditionals', emoji: '🔀', lessons: 1, color: 'bg-kiddykode-purple' },
                { name: 'Turtle Graphics', emoji: '🐢', lessons: 2, color: 'bg-primary' },
              ].map((skill) => {
                const completed = progress.lessonsCompleted.filter(l => 
                  l.lessonId.toLowerCase().includes(skill.name.toLowerCase().slice(0, 4))
                ).length;
                const percentage = Math.min((completed / skill.lessons) * 100, 100);
                
                return (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        <span>{skill.emoji}</span>
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className={`h-full ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Safety Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-kiddykode-green/10 rounded-2xl p-6 border border-kiddykode-green/20"
        >
          <h3 className="font-bold text-kiddykode-green mb-2 flex items-center gap-2">
            🛡️ Child Safety Features Active
          </h3>
          <p className="text-sm text-foreground">
            KiddyKode Studio is designed with child safety in mind. No ads, no external links, 
            no chat features, and all content is age-appropriate. Your child's learning journey 
            is 100% safe and secure.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ParentDashboard;
