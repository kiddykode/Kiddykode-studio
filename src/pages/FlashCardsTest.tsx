import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Layers, CheckCircle, XCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { flashCardSets } from '@/data/tests';
import { useProgressStore } from '@/stores/progressStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FlashCardsTest = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { progress, completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());

  const currentSet = flashCardSets.find(s => s.id === selectedSet);
  const currentCard = currentSet?.cards[currentCardIndex];

  const getSetProgress = (setId: string) => {
    const set = flashCardSets.find(s => s.id === setId);
    if (!set) return 0;
    const completed = set.cards.filter(c =>
      progress.lessonsCompleted.some(l => l.lessonId === `test-flashcards-${c.id}`)
    ).length;
    return Math.round((completed / set.cards.length) * 100);
  };

  const handleStartSet = (setId: string) => {
    setSelectedSet(setId);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setKnownCards(new Set());
  };

  const handleOptionClick = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === currentCard?.correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      // Flip to show answer after a brief delay
      setTimeout(() => {
        setIsFlipped(true);
        if (currentCard) {
          setKnownCards(prev => new Set([...prev, currentCard.id]));
          completeLesson(`test-flashcards-${currentCard.id}`);
        }
      }, 800);
    }
  };

  const handleNextCard = () => {
    if (!currentSet) return;
    
    if (currentCardIndex < currentSet.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setSelectedSet(null);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
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
        <header className="bg-kiddykode-purple text-white p-4">
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
                <Layers className="w-6 h-6" />
                {isFrench ? 'Cartes Flash' : 'Flash Cards'} 🃏
              </h1>
              <p className="text-sm opacity-80">
                {isFrench ? 'Mémorise les concepts clés!' : 'Memorize key concepts!'}
              </p>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashCardSets.map((set, index) => {
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
                          🃏 {isFrench ? set.titleFr : set.title}
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
                        <span>{set.cards.length} {isFrench ? 'cartes' : 'cards'}</span>
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
      <header className="bg-kiddykode-purple text-white p-4">
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
              value={((currentCardIndex + 1) / (currentSet?.cards.length || 1)) * 100} 
              className="mt-2 h-2"
            />
          </div>
          <span className="text-sm">
            {currentCardIndex + 1} / {currentSet?.cards.length}
          </span>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="perspective-1000"
            >
              {/* Alert for feedback */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-4"
                  >
                    <Alert className={`border-2 ${isCorrect 
                      ? 'bg-green-50 border-green-500 dark:bg-green-950/50' 
                      : 'bg-red-50 border-red-500 dark:bg-red-950/50'}`}
                    >
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <AlertDescription className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                          {isCorrect 
                            ? (isFrench ? '🎉 Bonne réponse!' : '🎉 Correct Answer!') 
                            : (isFrench ? '❌ Mauvaise réponse, essaie encore!' : '❌ Wrong Answer, try again!')}
                        </AlertDescription>
                      </div>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="relative w-full min-h-64"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front - Question with MCQ options */}
                <div 
                  className={`bg-gradient-to-br from-kiddykode-purple to-primary rounded-3xl p-6 text-white shadow-xl ${
                    isFlipped ? 'invisible absolute inset-0' : ''
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-xl font-semibold text-center mb-6">
                    {isFrench ? currentCard.questionFr : currentCard.question}
                  </p>
                  
                  {/* MCQ Options */}
                  <div className="grid gap-3">
                    {(isFrench ? currentCard.optionsFr : currentCard.options).map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrectOption = index === currentCard.correctIndex;
                      const showResult = selectedAnswer !== null;
                      
                      let optionClass = 'bg-white/20 hover:bg-white/30 border-transparent';
                      if (showResult && isSelected) {
                        optionClass = isCorrectOption 
                          ? 'bg-green-500 border-green-300 ring-2 ring-green-300' 
                          : 'bg-red-500 border-red-300 ring-2 ring-red-300 animate-shake';
                      } else if (showResult && isCorrectOption && !isCorrect) {
                        optionClass = 'bg-green-500/50 border-green-300';
                      }
                      
                      return (
                        <motion.button
                          key={index}
                          whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                          whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                          onClick={() => handleOptionClick(index)}
                          disabled={selectedAnswer !== null && isCorrect}
                          className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ${optionClass} ${
                            selectedAnswer === null ? 'cursor-pointer' : isCorrect ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center font-bold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Back - Answer */}
                <div 
                  className={`bg-gradient-to-br from-kiddykode-green to-kiddykode-blue-light rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-xl min-h-64 ${
                    !isFlipped ? 'invisible absolute inset-0' : ''
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <CheckCircle className="w-16 h-16 mb-4 text-white/90" />
                  <p className="text-2xl font-bold text-center">
                    {isFrench ? currentCard.answerFr : currentCard.answer}
                  </p>
                  <p className="text-white/80 mt-2">
                    {isFrench ? '🎉 Excellent travail!' : '🎉 Great job!'}
                  </p>
                </div>
              </motion.div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {isFrench ? 'Précédent' : 'Previous'}
                </Button>

                <Button
                  onClick={handleNextCard}
                  disabled={!isFlipped}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  {currentCardIndex < (currentSet?.cards.length || 1) - 1 
                    ? (isFrench ? 'Suivant' : 'Next')
                    : (isFrench ? 'Terminer' : 'Finish')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default FlashCardsTest;
