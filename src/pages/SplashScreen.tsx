import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import mascot from '@/assets/mascot.png';
import KiddyKodeBrand from '@/components/KiddyKodeBrand';
const SplashScreen = () => {
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  return <div className="min-h-screen bg-gradient-to-br from-secondary via-kiddykode-blue to-kiddykode-blue-dark flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => <motion.div key={i} className="absolute text-4xl" initial={{
        opacity: 0
      }} animate={{
        opacity: [0.2, 0.5, 0.2],
        y: [-20, 20, -20],
        x: [-10, 10, -10]
      }} transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }} style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}>
            {['🚀', '⭐', '💡', '🎮', '🔮', '✨', '🌟', '💻', '🎯'][i % 9]}
          </motion.div>)}
      </div>

      {/* Main content */}
      <motion.div initial={{
      scale: 0,
      rotate: -180
    }} animate={{
      scale: 1,
      rotate: 0
    }} transition={{
      type: 'spring',
      duration: 1,
      bounce: 0.5
    }} className="relative z-10">
        
      </motion.div>

      <motion.div initial={{
      y: 50,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.3,
      duration: 0.6
    }} className="mt-8 text-center">
        <KiddyKodeBrand size="xl" />
        <span className="ml-2 text-2xl md:text-3xl font-bold text-primary-foreground font-mono">Studio</span>
      </motion.div>

      <motion.p initial={{
      y: 30,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.5,
      duration: 0.6
    }} className="text-xl md:text-2xl text-primary-foreground/80 mt-4 text-center font-medium">
        {t('tagline')}
      </motion.p>

      <motion.p initial={{
      y: 30,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.7,
      duration: 0.6
    }} className="text-lg text-kiddykode-yellow mt-2 text-center">
        {t('splashSubtitle')}
      </motion.p>

      <motion.button initial={{
      y: 50,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.9,
      duration: 0.6
    }} whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} onClick={() => navigate('/auth')} className="mt-12 px-10 py-5 bg-primary text-primary-foreground rounded-3xl text-xl font-bold shadow-glow-orange hover:bg-kiddykode-orange-light transition-all duration-300">
        {t('getStarted')} 🚀
      </motion.button>

      {/* Decorative waves */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path initial={{
        d: "M0,120 L1440,120 L1440,120 L0,120 Z"
      }} animate={{
        d: "M0,120 L1440,120 L1440,60 Q720,120 0,60 Z"
      }} transition={{
        duration: 1,
        delay: 0.5
      }} fill="hsl(var(--background))" />
      </svg>
    </div>;
};
export default SplashScreen;