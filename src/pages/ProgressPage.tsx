import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Trophy, BookOpen, Folder, Sparkles, Clock } from 'lucide-react';
import { useProgressStore, BadgeLevel } from '@/stores/progressStore';
import BadgeDisplay from '@/components/BadgeDisplay';

const ProgressPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { progress, userName } = useProgressStore();

  const badges: { level: BadgeLevel; required: number; earned: boolean }[] = [
    { level: 'beginner', required: 0, earned: progress.lessonsCompleted.length >= 0 },
    { level: 'explorer', required: 5, earned: progress.lessonsCompleted.length >= 5 },
    { level: 'creator', required: 10, earned: progress.lessonsCompleted.length >= 10 },
    { level: 'legend', required: 20, earned: progress.lessonsCompleted.length >= 20 },
  ];

  const nextBadge = badges.find(b => !b.earned);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-kiddykode-purple to-secondary text-white p-4">
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
            <h1 className="text-2xl font-bold">{t('yourProgress')} 🏆</h1>
            <p className="text-sm opacity-80">{userName}'s coding journey</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Current Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="kid-card text-center mb-8"
        >
          <h2 className="text-lg text-muted-foreground mb-4">Current Rank</h2>
          <div className="flex justify-center mb-4">
            <BadgeDisplay badge={progress.currentBadge} size="lg" />
          </div>
          {nextBadge && (
            <p className="text-sm text-muted-foreground">
              {nextBadge.required - progress.lessonsCompleted.length} more lessons to become a{' '}
              <span className="font-bold capitalize text-foreground">{t(nextBadge.level)}</span>!
            </p>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="kid-card text-center">
            <BookOpen className="w-8 h-8 text-kiddykode-green mx-auto mb-2" />
            <div className="text-3xl font-black text-foreground">
              {progress.lessonsCompleted.length}
            </div>
            <div className="text-sm text-muted-foreground">{t('lessonsCompleted')}</div>
          </div>

          <div className="kid-card text-center">
            <Folder className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-black text-foreground">
              {progress.projectsCreated.length}
            </div>
            <div className="text-sm text-muted-foreground">{t('projectsCreated')}</div>
          </div>

          <div className="kid-card text-center">
            <Sparkles className="w-8 h-8 text-kiddykode-purple mx-auto mb-2" />
            <div className="text-3xl font-black text-foreground">
              {progress.storiesUnlocked.length}
            </div>
            <div className="text-sm text-muted-foreground">{t('storiesUnlocked')}</div>
          </div>

          <div className="kid-card text-center">
            <Clock className="w-8 h-8 text-kiddykode-cyan mx-auto mb-2" />
            <div className="text-3xl font-black text-foreground">
              {progress.totalTimeSpent}
            </div>
            <div className="text-sm text-muted-foreground">Minutes</div>
          </div>
        </motion.div>

        {/* Badge Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="kid-card mb-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-kiddykode-yellow" />
            {t('badges')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.level}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-4 rounded-2xl text-center transition-all ${
                  badge.earned
                    ? 'bg-muted'
                    : 'bg-muted/50 opacity-50'
                }`}
              >
                <BadgeDisplay badge={badge.level} size="sm" />
                <p className="text-xs text-muted-foreground mt-2">
                  {badge.required} lessons
                </p>
                {badge.earned && (
                  <span className="text-xs text-kiddykode-green font-semibold">✓ Earned</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        {progress.lessonsCompleted.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="kid-card"
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {progress.lessonsCompleted.slice(-5).reverse().map((lesson, index) => (
                <div
                  key={lesson.lessonId}
                  className="flex items-center gap-3 p-3 bg-muted rounded-xl"
                >
                  <span className="text-kiddykode-green">✓</span>
                  <span className="text-foreground font-medium">
                    Completed: {lesson.lessonId}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
