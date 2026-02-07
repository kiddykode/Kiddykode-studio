import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Layers, CheckCircle, XCircle, ChevronRight, ChevronLeft, RotateCcw, Trophy } from 'lucide-react';
import { flashCardSets } from '@/data/tests';
import { useProgressStore } from '@/stores/progressStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ShuffledCard {
  id: string;
  question: string;
  questionFr: string;
  answer: string;
  answerFr: string;
  options: string[];
  optionsFr: string[];
  correctIndex: number;
}

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Shuffle options and update correct index
const shuffleCardOptions = (card: typeof flashCardSets[0]['cards'][0]): ShuffledCard => {
  const indices = [0, 1, 2, 3];
  const shuffledIndices = shuffleArray(indices);
  
  const newOptions = shuffledIndices.map(i => card.options[i]);
  const newOptionsFr = shuffledIndices.map(i => card.optionsFr[i]);
  const newCorrectIndex = shuffledIndices.indexOf(card.correctIndex);
  
  return {
    ...card,
    options: newOptions,
    optionsFr: newOptionsFr,
    correctIndex: newCorrectIndex,
  };
};

const FlashCardsTest = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { progress, completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answers, setAnswers] = useState<{ cardId: string; correct: boolean }[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0); // Used to trigger re-shuffle

  // Shuffle cards when set is selected or shuffleKey changes
  const shuffledCards = useMemo(() => {
    const set = flashCardSets.find(s => s.id === selectedSet);
    if (!set) return [];
    
    // Shuffle card order and shuffle options within each card
    const shuffledOrder = shuffleArray(set.cards);
    return shuffledOrder.map(card => shuffleCardOptions(card));
  }, [selectedSet, shuffleKey]);

  const currentSet = flashCardSets.find(s => s.id === selectedSet);
  const currentCard = shuffledCards[currentCardIndex];

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
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswers([]);
    setShowSummary(false);
    setShuffleKey(prev => prev + 1); // Trigger new shuffle
  };

  const handleRetry = () => {
    setCurrentCardIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswers([]);
    setShowSummary(false);
    setShuffleKey(prev => prev + 1); // Trigger new shuffle with different order
  };

  const handleOptionClick = (optionIndex: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    setSelectedAnswer(optionIndex);
    const correct = optionIndex === currentCard?.correctIndex;
    setIsCorrect(correct);
    
    if (currentCard) {
      setAnswers(prev => [...prev, { cardId: currentCard.id, correct }]);
      if (correct) {
        completeLesson(`test-flashcards-${currentCard.id}`);
      }
    }
  };

  const handleNextCard = () => {
    if (!currentSet || selectedAnswer === null) return;
    
    if (currentCardIndex < shuffledCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Show summary at the end
      setShowSummary(true);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      // Show the previous answer state
      const prevAnswer = answers[currentCardIndex - 1];
      if (prevAnswer) {
        const prevCard = shuffledCards[currentCardIndex - 1];
        setSelectedAnswer(prevCard.correctIndex);
        setIsCorrect(prevAnswer.correct);
      }
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

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return isFrench ? '🏆 Parfait! Tu es un génie!' : '🏆 Perfect! You\'re a genius!';
    if (percentage >= 80) return isFrench ? '🌟 Excellent travail!' : '🌟 Excellent work!';
    if (percentage >= 60) return isFrench ? '👍 Bon travail! Continue!' : '👍 Good job! Keep going!';
    if (percentage >= 40) return isFrench ? '💪 Pas mal! Tu peux faire mieux!' : '💪 Not bad! You can do better!';
    return isFrench ? '📚 Continue à pratiquer!' : '📚 Keep practicing!';
  };

  // Set selection screen
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

  // Summary screen
  if (showSummary) {
    const correctCount = answers.filter(a => a.correct).length;
    const totalCount = answers.length;
    const percentage = Math.round((correctCount / totalCount) * 100);

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
            <div>
              <h1 className="text-xl font-bold">
                {isFrench ? 'Résultats' : 'Results'} - {isFrench ? currentSet?.titleFr : currentSet?.title}
              </h1>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="text-center overflow-hidden">
              <div className={`p-6 ${percentage >= 60 ? 'bg-gradient-to-br from-kiddykode-green to-kiddykode-blue-light' : 'bg-gradient-to-br from-kiddykode-yellow to-kiddykode-orange'}`}>
                <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 60 ? 'text-white' : 'text-kiddykode-blue-dark'}`} />
                <h2 className={`text-4xl font-bold ${percentage >= 60 ? 'text-white' : 'text-kiddykode-blue-dark'}`}>
                  {correctCount} / {totalCount}
                </h2>
                <p className={`text-lg mt-2 ${percentage >= 60 ? 'text-white/90' : 'text-kiddykode-blue-dark/80'}`}>
                  {percentage}% {isFrench ? 'correct' : 'correct'}
                </p>
              </div>
              
              <CardContent className="p-6">
                <p className="text-xl font-semibold mb-6">
                  {getScoreMessage(correctCount, totalCount)}
                </p>
                
                {/* Answer breakdown */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {answers.map((answer, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        answer.correct ? 'bg-kiddykode-green' : 'bg-red-500'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={handleRetry}
                    className="flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {isFrench ? 'Réessayer' : 'Try Again'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSet(null)}
                  >
                    {isFrench ? 'Choisir un autre sujet' : 'Choose Another Topic'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    );
  }

  // Quiz screen
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
              value={((currentCardIndex + 1) / shuffledCards.length) * 100} 
              className="mt-2 h-2"
            />
          </div>
          <span className="text-sm">
            {currentCardIndex + 1} / {shuffledCards.length}
          </span>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id + shuffleKey}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
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
                            : (isFrench ? `❌ Mauvaise réponse! La bonne réponse est: ${currentCard.optionsFr[currentCard.correctIndex]}` : `❌ Wrong! The correct answer is: ${currentCard.options[currentCard.correctIndex]}`)}
                        </AlertDescription>
                      </div>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Question Card */}
              <div className="bg-gradient-to-br from-kiddykode-purple to-primary rounded-3xl p-6 text-white shadow-xl">
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
                    if (showResult) {
                      if (isCorrectOption) {
                        optionClass = 'bg-green-500 border-green-300 ring-2 ring-green-300';
                      } else if (isSelected && !isCorrectOption) {
                        optionClass = 'bg-red-500 border-red-300 ring-2 ring-red-300';
                      }
                    }
                    
                    return (
                      <motion.button
                        key={index}
                        whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                        onClick={() => handleOptionClick(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 ${optionClass} ${
                          selectedAnswer === null ? 'cursor-pointer' : 'cursor-default'
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
                  disabled={selectedAnswer === null}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  {currentCardIndex < shuffledCards.length - 1 
                    ? (isFrench ? 'Suivant' : 'Next')
                    : (isFrench ? 'Voir les résultats' : 'See Results')}
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
