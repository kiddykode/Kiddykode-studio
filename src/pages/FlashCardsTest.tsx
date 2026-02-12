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

  const letterColors = [
    'bg-[hsl(0_70%_65%)]',    // A - coral/red
    'bg-kiddykode-green',      // B - green
    'bg-[hsl(200_70%_55%)]',   // C - blue
    'bg-kiddykode-yellow',     // D - yellow
  ];

  const letterTextColors = [
    'text-[hsl(0_70%_65%)]',
    'text-kiddykode-green',
    'text-[hsl(200_70%_55%)]',
    'text-kiddykode-yellow',
  ];

  // Quiz screen
  return (
    <div className="min-h-screen bg-[hsl(0_0%_33%)] flex flex-col">
      {/* Top bar with back + progress */}
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedSet(null)}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </motion.button>
        <div className="flex-1">
          <Progress 
            value={((currentCardIndex + 1) / shuffledCards.length) * 100} 
            className="h-2 bg-white/20"
          />
        </div>
        <span className="text-white/70 text-sm font-bold">
          {currentCardIndex + 1}/{shuffledCards.length}
        </span>
      </div>

      {/* Main content area */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id + shuffleKey}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full flex flex-col items-center"
            >
              {/* Header: Python Quiz / KiddyKode */}
              <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-white">
                  Python <span className="text-kiddykode-yellow">Quiz</span>
                </h1>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="h-[2px] w-8 bg-white/40" />
                  <span className="text-sm font-bold">
                    <span className="text-kiddykode-orange">K</span>
                    <span className="text-[hsl(0_70%_65%)]">i</span>
                    <span className="text-kiddykode-yellow">d</span>
                    <span className="text-[hsl(200_70%_55%)]">d</span>
                    <span className="text-kiddykode-green">y</span>
                    <span className="text-white">K</span>
                    <span className="text-kiddykode-orange">o</span>
                    <span className="text-kiddykode-yellow">d</span>
                    <span className="text-kiddykode-green">e</span>
                  </span>
                  <span className="h-[2px] w-8 bg-white/40" />
                </div>
              </div>

              {/* Question text */}
              <p className="text-white text-xl md:text-2xl font-semibold text-center leading-relaxed mb-8 px-2">
                {isFrench ? currentCard.questionFr : currentCard.question}
              </p>

              {/* Feedback alert */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full mb-4"
                  >
                    <div className={`rounded-2xl p-4 flex items-center gap-3 ${
                      isCorrect 
                        ? 'bg-kiddykode-green/20 border-2 border-kiddykode-green/50' 
                        : 'bg-[hsl(0_70%_65%)]/20 border-2 border-[hsl(0_70%_65%)]/50'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-kiddykode-green shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-[hsl(0_70%_65%)] shrink-0" />
                      )}
                      <p className={`font-bold text-sm ${isCorrect ? 'text-kiddykode-green' : 'text-[hsl(0_70%_65%)]'}`}>
                        {isCorrect 
                          ? (isFrench ? '🎉 Bonne réponse!' : '🎉 Correct!') 
                          : (isFrench 
                              ? `❌ La bonne réponse: ${currentCard.optionsFr[currentCard.correctIndex]}` 
                              : `❌ Correct answer: ${currentCard.options[currentCard.correctIndex]}`)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Options - pill shaped with colored letter circles */}
              <div className="w-full space-y-3">
                {(isFrench ? currentCard.optionsFr : currentCard.options).map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === currentCard.correctIndex;
                  const showResult = selectedAnswer !== null;

                  let pillBg = 'bg-white';
                  let textColor = letterTextColors[index] || 'text-foreground';
                  let ringClass = '';
                  
                  if (showResult) {
                    if (isCorrectOption) {
                      pillBg = 'bg-kiddykode-green/20';
                      ringClass = 'ring-4 ring-kiddykode-green/60';
                      textColor = 'text-kiddykode-green';
                    } else if (isSelected && !isCorrectOption) {
                      pillBg = 'bg-[hsl(0_70%_65%)]/20';
                      ringClass = 'ring-4 ring-[hsl(0_70%_65%)]/60';
                      textColor = 'text-[hsl(0_70%_65%)]';
                    } else {
                      pillBg = 'bg-white/50';
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={selectedAnswer === null ? { scale: 1.03 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
                      onClick={() => handleOptionClick(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full flex items-center gap-4 rounded-full px-3 py-3 md:py-4 transition-all duration-200 ${pillBg} ${ringClass} ${
                        selectedAnswer === null ? 'cursor-pointer hover:shadow-lg' : 'cursor-default'
                      }`}
                    >
                      <span className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${letterColors[index]} flex items-center justify-center text-white font-black text-lg md:text-xl shrink-0`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className={`font-bold text-base md:text-lg ${showResult ? textColor : (letterTextColors[index] || 'text-foreground')}`}>
                        {option}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-8 w-full">
                <Button
                  variant="outline"
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                  className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {isFrench ? 'Précédent' : 'Previous'}
                </Button>

                <Button
                  onClick={handleNextCard}
                  disabled={selectedAnswer === null}
                  className="flex-1 flex items-center justify-center gap-2 bg-kiddykode-yellow text-secondary hover:bg-kiddykode-yellow/90 font-bold"
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
