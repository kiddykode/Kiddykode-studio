import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bug, Layers, HelpCircle } from 'lucide-react';
import { useProgressStore } from '@/stores/progressStore';
import { debuggingSets, flashCardSets, mcqSets } from '@/data/tests';

const TestMode = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { progress } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const testTypes = [
    {
      id: 'debugging',
      title: isFrench ? 'Débogage' : 'Debugging',
      description: isFrench ? 'Trouve et corrige les bugs!' : 'Find and fix the bugs!',
      icon: Bug,
      color: 'bg-red-500',
      path: '/test/debugging',
      emoji: '🐛',
      count: debuggingSets.length,
    },
    {
      id: 'flashcards',
      title: isFrench ? 'Cartes Flash' : 'Flash Cards',
      description: isFrench ? 'Mémorise les concepts clés!' : 'Memorize key concepts!',
      icon: Layers,
      color: 'bg-kiddykode-purple',
      path: '/test/flashcards',
      emoji: '🃏',
      count: flashCardSets.length,
    },
    {
      id: 'mcq',
      title: isFrench ? 'QCM' : 'MCQs',
      description: isFrench ? 'Teste tes connaissances!' : 'Test your knowledge!',
      icon: HelpCircle,
      color: 'bg-kiddykode-yellow',
      path: '/test/mcq',
      emoji: '❓',
      count: mcqSets.length,
    },
  ];

  const getTestProgress = (testType: string) => {
    const completedTests = progress.lessonsCompleted.filter(l => 
      l.lessonId.startsWith(`test-${testType}`)
    );
    
    let totalItems = 0;
    if (testType === 'debugging') {
      totalItems = debuggingSets.reduce((acc, set) => acc + set.challenges.length, 0);
    } else if (testType === 'flashcards') {
      totalItems = flashCardSets.reduce((acc, set) => acc + set.cards.length, 0);
    } else if (testType === 'mcq') {
      totalItems = mcqSets.reduce((acc, set) => acc + set.questions.length, 0);
    }
    
    return totalItems > 0 ? Math.round((completedTests.length / totalItems) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
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
            <h1 className="text-2xl font-bold">
              {isFrench ? 'Mode Test' : 'Test Mode'} 🧪
            </h1>
            <p className="text-sm opacity-80">
              {isFrench ? 'Mets tes compétences à l\'épreuve!' : 'Put your skills to the test!'}
            </p>
          </div>
        </div>
      </header>

      {/* Test Types Grid */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testTypes.map((test, index) => {
            const progressPercent = getTestProgress(test.id);

            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(test.path)}
                className="kid-card cursor-pointer group relative overflow-hidden"
              >
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full" />
                <div
                  className="absolute bottom-0 left-0 h-1 bg-primary transition-all"
                  style={{ width: `${progressPercent}%` }}
                />

                <div className={`w-16 h-16 ${test.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <test.icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  {test.title}
                  <span className="text-2xl">{test.emoji}</span>
                </h3>
                <p className="text-muted-foreground mt-2">{test.description}</p>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {test.count} {isFrench ? 'ensembles' : 'sets'}
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

export default TestMode;
