import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Bug, CheckCircle, XCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { debuggingSets, DebuggingChallenge } from '@/data/tests';
import { useProgressStore } from '@/stores/progressStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DebuggingTest = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { progress, completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

  const currentSet = debuggingSets.find(s => s.id === selectedSet);
  const currentChallenge = currentSet?.challenges[currentChallengeIndex];

  const getSetProgress = (setId: string) => {
    const set = debuggingSets.find(s => s.id === setId);
    if (!set) return 0;
    const completed = set.challenges.filter(c =>
      progress.lessonsCompleted.some(l => l.lessonId === `test-debugging-${c.id}`)
    ).length;
    return Math.round((completed / set.challenges.length) * 100);
  };

  const handleStartSet = (setId: string) => {
    setSelectedSet(setId);
    setCurrentChallengeIndex(0);
    const set = debuggingSets.find(s => s.id === setId);
    if (set && set.challenges[0]) {
      setUserCode(set.challenges[0].buggyCode);
    }
    setShowHint(false);
    setResult(null);
  };

  const handleCheckAnswer = () => {
    if (!currentChallenge) return;
    
    const isCorrect = userCode.trim().replace(/\s+/g, ' ') === 
                      currentChallenge.correctCode.trim().replace(/\s+/g, ' ');
    
    setResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      completeLesson(`test-debugging-${currentChallenge.id}`);
    }
  };

  const handleNextChallenge = () => {
    if (!currentSet) return;
    
    if (currentChallengeIndex < currentSet.challenges.length - 1) {
      const nextIndex = currentChallengeIndex + 1;
      setCurrentChallengeIndex(nextIndex);
      setUserCode(currentSet.challenges[nextIndex].buggyCode);
      setShowHint(false);
      setResult(null);
    } else {
      setSelectedSet(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-kiddykode-green text-white';
      case 'intermediate': return 'bg-kiddykode-yellow text-kiddykode-blue-dark';
      case 'advanced': return 'bg-kiddykode-purple text-white';
      default: return 'bg-muted';
    }
  };

  if (!selectedSet) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-red-500 text-white p-4">
          <div className="container mx-auto flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/test')}
              className="p-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Bug className="w-6 h-6" />
                {isFrench ? 'Chasse aux Bugs' : 'Bug Hunt'} 🐛
              </h1>
              <p className="text-sm opacity-80">
                {isFrench ? 'Trouve et corrige les erreurs!' : 'Find and fix the errors!'}
              </p>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {debuggingSets.map((set, index) => {
              const progressPercent = getSetProgress(set.id);
              const isComplete = progressPercent === 100;

              return (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden"
                    onClick={() => handleStartSet(set.id)}
                  >
                    <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full" />
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-primary transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                    
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          🐛 {isFrench ? set.titleFr : set.title}
                        </CardTitle>
                        {isComplete && <CheckCircle className="w-5 h-5 text-kiddykode-green" />}
                      </div>
                      <Badge className={getDifficultyColor(set.difficulty)}>
                        {set.difficulty}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {isFrench ? set.descriptionFr : set.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span>{set.challenges.length} {isFrench ? 'défis' : 'challenges'}</span>
                        {progressPercent > 0 && (
                          <span className="text-primary font-semibold">{progressPercent}%</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-red-500 text-white p-4">
        <div className="container mx-auto flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedSet(null)}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">
              {isFrench ? currentSet?.titleFr : currentSet?.title}
            </h1>
            <Progress 
              value={((currentChallengeIndex + 1) / (currentSet?.challenges.length || 1)) * 100} 
              className="mt-2 h-2"
            />
          </div>
          <span className="text-sm">
            {currentChallengeIndex + 1} / {currentSet?.challenges.length}
          </span>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {currentChallenge && (
            <motion.div
              key={currentChallenge.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bug className="w-5 h-5 text-red-500" />
                    {isFrench ? currentChallenge.titleFr : currentChallenge.title}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {isFrench ? currentChallenge.descriptionFr : currentChallenge.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {isFrench ? 'Corrige le code:' : 'Fix the code:'}
                    </label>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-32 p-4 font-mono text-sm bg-muted rounded-xl border-2 border-border focus:border-primary outline-none resize-none"
                      disabled={result === 'correct'}
                    />
                  </div>

                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-kiddykode-yellow/20 rounded-xl flex items-start gap-3"
                    >
                      <Lightbulb className="w-5 h-5 text-kiddykode-yellow flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        {isFrench ? currentChallenge.hintFr : currentChallenge.hint}
                      </p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-xl flex items-start gap-3 ${
                        result === 'correct' 
                          ? 'bg-kiddykode-green/20' 
                          : 'bg-red-500/20'
                      }`}
                    >
                      {result === 'correct' ? (
                        <CheckCircle className="w-5 h-5 text-kiddykode-green flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold">
                          {result === 'correct' 
                            ? (isFrench ? 'Correct! 🎉' : 'Correct! 🎉')
                            : (isFrench ? 'Pas tout à fait...' : 'Not quite...')}
                        </p>
                        <p className="text-sm mt-1">
                          {isFrench ? currentChallenge.explanationFr : currentChallenge.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    {!showHint && !result && (
                      <Button
                        variant="outline"
                        onClick={() => setShowHint(true)}
                        className="flex items-center gap-2"
                      >
                        <Lightbulb className="w-4 h-4" />
                        {isFrench ? 'Indice' : 'Hint'}
                      </Button>
                    )}
                    
                    {result !== 'correct' && (
                      <Button onClick={handleCheckAnswer} className="flex-1">
                        {isFrench ? 'Vérifier' : 'Check Answer'}
                      </Button>
                    )}
                    
                    {result === 'correct' && (
                      <Button onClick={handleNextChallenge} className="flex-1 flex items-center gap-2">
                        {currentChallengeIndex < (currentSet?.challenges.length || 1) - 1 
                          ? (isFrench ? 'Suivant' : 'Next')
                          : (isFrench ? 'Terminer' : 'Finish')}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default DebuggingTest;
