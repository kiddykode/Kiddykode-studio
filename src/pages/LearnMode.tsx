import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import { tutorials } from '@/data/tutorials';
import { useProgressStore } from '@/stores/progressStore';

const LearnMode = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { progress } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-kiddykode-green text-white';
      case 'intermediate':
        return 'bg-kiddykode-yellow text-kiddykode-blue-dark';
      case 'advanced':
        return 'bg-kiddykode-purple text-white';
      default:
        return 'bg-muted text-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basics':
        return '📝';
      case 'variables':
        return '📦';
      case 'loops':
        return '🔄';
      case 'conditionals':
        return '🔀';
      case 'turtle':
        return '🐢';
      case 'functions':
        return '⚡';
      default:
        return '📚';
    }
  };

  const getTutorialProgress = (tutorialId: string) => {
    const tutorial = tutorials.find(t => t.id === tutorialId);
    if (!tutorial) return 0;
    
    const completedLessons = tutorial.lessons.filter(lesson =>
      progress.lessonsCompleted.some(l => l.lessonId === lesson.id)
    );
    
    return Math.round((completedLessons.length / tutorial.lessons.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-kiddykode-green text-white p-4">
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
            <h1 className="text-2xl font-bold">{t('learnMode')} 📚</h1>
            <p className="text-sm opacity-80">{t('learnModeDesc')}</p>
          </div>
        </div>
      </header>

      {/* Tutorials Grid */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tutorials.map((tutorial, index) => {
            const progressPercent = getTutorialProgress(tutorial.id);
            const isComplete = progressPercent === 100;

            return (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => navigate(`/learn/${tutorial.id}`)}
                className="kid-card cursor-pointer group relative overflow-hidden"
              >
                {/* Progress bar background */}
                <div
                  className="absolute bottom-0 left-0 h-1 bg-primary/30 transition-all"
                  style={{ width: '100%' }}
                />
                <div
                  className="absolute bottom-0 left-0 h-1 bg-primary transition-all"
                  style={{ width: `${progressPercent}%` }}
                />

                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{getCategoryIcon(tutorial.category)}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                      {tutorial.difficulty}
                    </span>
                    {isComplete && (
                      <CheckCircle className="w-5 h-5 text-kiddykode-green" />
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {isFrench ? tutorial.titleFr : tutorial.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {isFrench ? tutorial.descriptionFr : tutorial.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {tutorial.lessons.length} {t('lesson')}{tutorial.lessons.length > 1 ? 's' : ''}
                  </span>
                  {progressPercent > 0 && (
                    <span className="text-primary font-semibold">
                      {progressPercent}%
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};

export default LearnMode;
