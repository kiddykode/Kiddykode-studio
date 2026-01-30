import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Lock, Star, Unlock } from 'lucide-react';
import { stories } from '@/data/stories';
import { useProgressStore } from '@/stores/progressStore';

const StoryMode = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { progress } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const isStoryUnlocked = (requiredLessons: number) => {
    return progress.lessonsCompleted.length >= requiredLessons;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kiddykode-purple via-secondary to-kiddykode-blue-dark">
      {/* Header */}
      <header className="bg-transparent text-white p-4">
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
            <h1 className="text-2xl font-bold">{t('codeTheLegends')} ✨</h1>
            <p className="text-sm opacity-80">{t('storyModeDesc')}</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            🌍 {t('codeTheLegends')}
          </h2>
          <p className="text-lg text-white/80">
            {isFrench
              ? "Découvre les histoires des légendes africaines à travers le code!"
              : "Discover the stories of African legends through code!"}
          </p>
        </motion.div>
      </section>

      {/* Stories Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => {
            const unlocked = isStoryUnlocked(story.requiredLessons);
            
            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={unlocked ? { scale: 1.03, y: -5 } : {}}
                className={`relative overflow-hidden rounded-3xl p-6 ${
                  unlocked
                    ? 'bg-card cursor-pointer shadow-medium hover:shadow-lg'
                    : 'bg-card/50 cursor-not-allowed'
                }`}
                onClick={() => unlocked && navigate(`/stories/${story.id}`)}
              >
                {/* Lock overlay */}
                {!unlocked && (
                  <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                    <Lock className="w-12 h-12 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground text-center px-4">
                      {t('storyLocked')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ({story.requiredLessons} lessons needed)
                    </p>
                  </div>
                )}

                {/* Story content */}
                <div className="text-6xl mb-4">{story.icon}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {isFrench ? story.titleFr : story.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {isFrench ? story.descriptionFr : story.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-kiddykode-yellow" />
                    {story.chapters.length} chapters
                  </div>
                  {unlocked && (
                    <span className="flex items-center gap-1 text-kiddykode-green text-sm font-semibold">
                      <Unlock className="w-4 h-4" />
                      {t('storyUnlocked')}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-white">
            <Star className="w-5 h-5 text-kiddykode-yellow animate-pulse" />
            <span className="font-semibold">
              {isFrench
                ? "Plus d'histoires arrivent bientôt!"
                : "More stories coming soon!"}
            </span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default StoryMode;
