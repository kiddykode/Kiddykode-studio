import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, HelpCircle, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { mcqSets } from '@/data/tests';
import { useProgressStore } from '@/stores/progressStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const MCQTest = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { progress, completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentSet = mcqSets.find(s => s.id === selectedSet);
  const currentQuestion = currentSet?.questions[currentQuestionIndex];

  const getSetProgress = (setId: string) => {
    const set = mcqSets.find(s => s.id === setId);
    if (!set) return 0;
    const completed = set.questions.filter(q =>
      progress.lessonsCompleted.some(l => l.lessonId === `test-mcq-${q.id}`)
    ).length;
    return Math.round((completed / set.questions.length) * 100);
  };

  const handleStartSet = (setId: string) => {
    setSelectedSet(setId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      completeLesson(`test-mcq-${currentQuestion.id}`);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (!currentSet) return;
    
    if (currentQuestionIndex < currentSet.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
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

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index 
        ? 'border-primary bg-primary/10' 
        : 'border-border hover:border-primary/50';
    }
    
    if (index === currentQuestion?.correctIndex) {
      return 'border-kiddykode-green bg-kiddykode-green/20';
    }
    if (index === selectedAnswer && index !== currentQuestion?.correctIndex) {
      return 'border-red-500 bg-red-500/20';
    }
    return 'border-border opacity-50';
  };

  if (!selectedSet) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-kiddykode-yellow text-kiddykode-blue-dark p-4">
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
                <HelpCircle className="w-6 h-6" />
                {isFrench ? 'Quiz QCM' : 'MCQ Quiz'} ❓
              </h1>
              <p className="text-sm opacity-80">
                {isFrench ? 'Teste tes connaissances!' : 'Test your knowledge!'}
              </p>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcqSets.map((set, index) => {
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
                          ❓ {isFrench ? set.titleFr : set.title}
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
                        <span>{set.questions.length} {isFrench ? 'questions' : 'questions'}</span>
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
      <header className="bg-kiddykode-yellow text-kiddykode-blue-dark p-4">
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
              value={((currentQuestionIndex + 1) / (currentSet?.questions.length || 1)) * 100} 
              className="mt-2 h-2"
            />
          </div>
          <div className="text-right">
            <span className="text-sm">
              {currentQuestionIndex + 1} / {currentSet?.questions.length}
            </span>
            <div className="text-xs opacity-70">
              {isFrench ? 'Score:' : 'Score:'} {score}
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {isFrench ? currentQuestion.questionFr : currentQuestion.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(isFrench ? currentQuestion.optionsFr : currentQuestion.options).map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleSelectAnswer(index)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${getOptionStyle(index)}`}
                    >
                      <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && index === currentQuestion.correctIndex && (
                        <CheckCircle className="w-5 h-5 text-kiddykode-green" />
                      )}
                      {showResult && index === selectedAnswer && index !== currentQuestion.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </motion.div>
                  ))}

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl ${
                        selectedAnswer === currentQuestion.correctIndex
                          ? 'bg-kiddykode-green/20'
                          : 'bg-red-500/20'
                      }`}
                    >
                      <p className="font-semibold mb-1">
                        {selectedAnswer === currentQuestion.correctIndex
                          ? (isFrench ? '🎉 Correct!' : '🎉 Correct!')
                          : (isFrench ? '❌ Pas tout à fait...' : '❌ Not quite...')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isFrench ? currentQuestion.explanationFr : currentQuestion.explanation}
                      </p>
                    </motion.div>
                  )}

                  <div className="flex gap-3 pt-4">
                    {!showResult && (
                      <Button 
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className="flex-1"
                      >
                        {isFrench ? 'Vérifier' : 'Check Answer'}
                      </Button>
                    )}
                    
                    {showResult && (
                      <Button onClick={handleNextQuestion} className="flex-1 flex items-center gap-2">
                        {currentQuestionIndex < (currentSet?.questions.length || 1) - 1 
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

export default MCQTest;
