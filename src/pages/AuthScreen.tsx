import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, Users, Mail, Lock, ArrowRight } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';
import KiddyKodeBrand from '@/components/KiddyKodeBrand';
import mascot from '@/assets/mascot.png';

const AuthScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUserName, setIsGuest } = useProgressStore();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');

  const handleGuestMode = () => {
    setIsGuest(true);
    setUserName('Young Coder');
    navigate('/dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGuest(false);
    setUserName(name || 'Young Coder');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left decorative panel */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-secondary via-kiddykode-blue to-kiddykode-blue-dark items-center justify-center p-12">
        <div className="text-center">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            src={mascot}
            alt="KiddyKode Mascot"
            className="w-48 h-48 mx-auto floating"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <KiddyKodeBrand size="lg" />
            <span className="ml-2 text-xl font-bold text-primary-foreground">Studio</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-primary-foreground/70 mt-2"
          >
            {t('tagline')}
          </motion.p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="md:hidden text-center mb-8">
            <img src={mascot} alt="KiddyKode" className="w-24 h-24 mx-auto" />
            <div className="mt-4">
              <KiddyKodeBrand size="md" />
              <span className="ml-1 text-lg font-bold text-secondary">Studio</span>
            </div>
          </div>

          <div className="kid-card bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              {isLogin ? t('welcomeBack') : t('createAccount')}
            </h2>

            {/* Toggle tabs */}
            <div className="flex bg-muted rounded-2xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  isLogin
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('login')}
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  !isLogin
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('signup')}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t('name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-muted rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder={t('email')}
                  className="w-full pl-12 pr-4 py-4 bg-muted rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder={t('password')}
                  className="w-full pl-12 pr-4 py-4 bg-muted rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-glow-orange flex items-center justify-center gap-2"
              >
                {isLogin ? t('login') : t('signup')}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">or</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGuestMode}
              className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-lg shadow-glow-blue flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              {t('guestMode')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;
