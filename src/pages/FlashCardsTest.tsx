import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Layers, CheckCircle, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { flashCardSets } from '@/data/tests';
import { useProgressStore } from '@/stores/progressStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const FlashCardsTest = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { progress, completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
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
    setKnownCards(new Set());
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnowIt = () => {
    if (currentCard) {
      setKnownCards(prev => new Set([...prev, currentCard.id]));
      completeLesson(`test-flashcards-${currentCard.id}`);
      handleNextCard();
    }
  };

  const handleNextCard = () => {
    if (!currentSet) return;
    
    if (currentCardIndex < currentSet.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setSelectedSet(null);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
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
              <motion.div
                onClick={handleFlip}
                className="relative w-full h-64 cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-kiddykode-purple to-primary rounded-3xl p-8 flex items-center justify-center text-white shadow-xl ${
                    isFlipped ? 'invisible' : ''
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-xl font-semibold text-center">
                    {isFrench ? currentCard.questionFr : currentCard.question}
                  </p>
                </div>

                {/* Back */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br from-kiddykode-green to-kiddykode-blue-light rounded-3xl p-8 flex items-center justify-center text-white shadow-xl ${
                    !isFlipped ? 'invisible' : ''
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <p className="text-2xl font-bold text-center">
                    {isFrench ? currentCard.answerFr : currentCard.answer}
                  </p>
                </div>
              </motion.div>

              <p className="text-center text-muted-foreground text-sm mt-4">
                {isFrench ? 'Clique pour retourner' : 'Click to flip'}
              </p>

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

                {isFlipped && (
                  <Button
                    onClick={handleKnowIt}
                    className="flex-1 bg-kiddykode-green hover:bg-kiddykode-green/90 flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {isFrench ? 'Je sais!' : 'I Know It!'}
                  </Button>
                )}

                <Button
                  onClick={handleNextCard}
                  className="flex items-center gap-2"
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
