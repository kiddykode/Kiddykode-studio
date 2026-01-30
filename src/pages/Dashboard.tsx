import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, Rocket, Sparkles, Trophy, Settings, Users, FlaskConical } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BadgeDisplay from '@/components/BadgeDisplay';
import KiddyKodeBrand from '@/components/KiddyKodeBrand';
import mascot from '@/assets/mascot.png';
import heroBanner from '@/assets/hero-banner.png';
const Dashboard = () => {
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  const {
    userName,
    progress
  } = useProgressStore();
  const modes = [{
    id: 'learn',
    title: t('learnMode'),
    description: t('learnModeDesc'),
    icon: BookOpen,
    color: 'bg-kiddykode-green',
    path: '/learn',
    emoji: '📚'
  }, {
    id: 'test',
    title: t('testMode', 'Test Mode'),
    description: t('testModeDesc', 'Put your skills to the test!'),
    icon: FlaskConical,
    color: 'bg-red-500',
    path: '/test',
    emoji: '🧪'
  }, {
    id: 'create',
    title: t('createMode'),
    description: t('createModeDesc'),
    icon: Rocket,
    color: 'bg-primary',
    path: '/create',
    emoji: '🚀'
  }, {
    id: 'stories',
    title: t('storyMode'),
    description: t('storyModeDesc'),
    icon: Sparkles,
    color: 'bg-kiddykode-purple',
    path: '/stories',
    emoji: '✨'
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={mascot} alt="KiddyKode" className="w-10 h-10" />
            <div>
              <KiddyKodeBrand size="sm" />
              <p className="text-xs text-secondary-foreground/70">{t('tagline')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button onClick={() => navigate('/progress')} className="p-2 rounded-xl hover:bg-sidebar-accent transition-colors">
              <Trophy className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/parent')} className="p-2 rounded-xl hover:bg-sidebar-accent transition-colors">
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
        backgroundImage: `url(${heroBanner})`
      }} />
        <div className="relative container mx-auto px-4 py-8 md:py-12">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              👋 Hello, <span className="text-primary">{userName}</span>!
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mt-2 font-sans text-center">
              {t('dashboardTitle')}
            </p>
          </motion.div>

          {/* Badge Display */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2
        }} className="flex justify-center mt-6">
            <BadgeDisplay badge={progress.currentBadge} size="lg" />
          </motion.div>
        </div>
      </section>

      {/* Mode Cards */}
      <section className="container mx-auto px-4 py-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modes.map(mode => <motion.div key={mode.id} variants={itemVariants} whileHover={{
          scale: 1.03,
          y: -5
        }} whileTap={{
          scale: 0.98
        }} onClick={() => navigate(mode.path)} className="kid-card cursor-pointer group">
              <div className={`w-16 h-16 ${mode.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <mode.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                {mode.title}
                <span className="text-2xl">{mode.emoji}</span>
              </h3>
              <p className="text-muted-foreground mt-2">{mode.description}</p>
            </motion.div>)}
        </motion.div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 pb-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="bg-gradient-to-r from-secondary to-kiddykode-blue-light rounded-3xl p-6 text-secondary-foreground">
          <h3 className="text-lg font-bold mb-4">{t('yourProgress')}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-kiddykode-yellow">
                {progress.lessonsCompleted.length}
              </div>
              <div className="text-sm opacity-80">{t('lessonsCompleted')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-kiddykode-green">
                {progress.projectsCreated.length}
              </div>
              <div className="text-sm opacity-80">{t('projectsCreated')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-kiddykode-purple">
                {progress.storiesUnlocked.length}
              </div>
              <div className="text-sm opacity-80">{t('storiesUnlocked')}</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>;
};
export default Dashboard;