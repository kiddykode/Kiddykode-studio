import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { mcqSets, MCQQuestion } from '@/data/mcqData';
import { useProgressStore } from '@/stores/progressStore';
import { Progress } from '@/components/ui/progress';
import MCQSetCard from '@/components/mcq/MCQSetCard';
import MCQQuestionCard from '@/components/mcq/MCQQuestionCard';
import MCQSummary from '@/components/mcq/MCQSummary';

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Shuffle options and update correct index
const shuffleQuestionOptions = (question: MCQQuestion, isFrench: boolean): MCQQuestion => {
  const options = isFrench ? question.optionsFr : question.options;
  const correctAnswer = options[question.correctIndex];
  
  const shuffledOptions = shuffleArray(options);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    ...question,
    options: isFrench ? question.options : shuffledOptions,
    optionsFr: isFrench ? shuffledOptions : question.optionsFr,
    correctIndex: newCorrectIndex,
  };
};

interface Answer {
  questionId: string;
  correct: boolean;
}

const MCQTest = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { progress, completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [selectedSet, setSelectedSet] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const currentSet = mcqSets.find(s => s.id === selectedSet);

  // Shuffle questions and options when set is selected or shuffleKey changes
  const shuffledQuestions = useMemo(() => {
    if (!currentSet) return [];
    const shuffledOrder = shuffleArray(currentSet.questions);
    return shuffledOrder.map(q => shuffleQuestionOptions(q, isFrench));
  }, [selectedSet, shuffleKey, isFrench]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

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
    setAnswers([]);
    setShowSummary(false);
    setShuffleKey(prev => prev + 1);
  };

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctIndex;
    if (isCorrect) {
      completeLesson(`test-mcq-${currentQuestion.id}`);
    }
    
    setAnswers(prev => [...prev, { questionId: currentQuestion.id, correct: isCorrect }]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowSummary(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers([]);
    setShowSummary(false);
    setShuffleKey(prev => prev + 1);
  };

  const handleBack = () => {
    setSelectedSet(null);
    setShowSummary(false);
  };

  // Group sets by difficulty
  const groupedSets = useMemo(() => {
    const groups: Record<string, typeof mcqSets> = {
      beginner: [],
      intermediate: [],
      advanced: [],
    };
    mcqSets.forEach(set => {
      groups[set.difficulty].push(set);
    });
    return groups;
  }, []);

  const difficultyLabels = {
    beginner: isFrench ? '🌱 Débutant' : '🌱 Beginner',
    intermediate: isFrench ? '🌿 Intermédiaire' : '🌿 Intermediate',
    advanced: isFrench ? '🌳 Avancé' : '🌳 Advanced',
  };

  // Set Selection View
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
                {isFrench ? 'Quiz QCM' : 'MCQ Quiz'} 📝
              </h1>
              <p className="text-sm opacity-80">
                {isFrench ? 'Teste tes connaissances avec des questions de code!' : 'Test your knowledge with code-based questions!'}
              </p>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-8">
          {Object.entries(groupedSets).map(([difficulty, sets]) => (
            sets.length > 0 && (
              <div key={difficulty} className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  {difficultyLabels[difficulty as keyof typeof difficultyLabels]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sets.map((set, index) => {
                    const progressPercent = getSetProgress(set.id);
                    return (
                      <MCQSetCard
                        key={set.id}
                        id={set.id}
                        title={isFrench ? set.titleFr : set.title}
                        description={isFrench ? set.descriptionFr : set.description}
                        difficulty={set.difficulty}
                        questionCount={set.questions.length}
                        progressPercent={progressPercent}
                        isComplete={progressPercent === 100}
                        onClick={() => handleStartSet(set.id)}
                        index={index}
                        isFrench={isFrench}
                      />
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </section>
      </div>
    );
  }

  // Summary View
  if (showSummary && currentSet) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-kiddykode-yellow text-kiddykode-blue-dark p-4">
          <div className="container mx-auto flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="p-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-xl font-bold">
                {isFrench ? 'Résultats' : 'Results'}
              </h1>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-8">
          <MCQSummary
            answers={answers}
            totalQuestions={shuffledQuestions.length}
            setTitle={isFrench ? currentSet.titleFr : currentSet.title}
            onRetry={handleRetry}
            onBack={handleBack}
          />
        </section>
      </div>
    );
  }

  // Quiz View
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-kiddykode-yellow text-kiddykode-blue-dark p-4">
        <div className="container mx-auto flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">
              {isFrench ? currentSet?.titleFr : currentSet?.title}
            </h1>
            <Progress
              value={((currentQuestionIndex + 1) / shuffledQuestions.length) * 100}
              className="mt-2 h-2"
            />
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold">
              {currentQuestionIndex + 1} / {shuffledQuestions.length}
            </span>
            <div className="text-xs opacity-70">
              {isFrench ? 'Score:' : 'Score:'} {answers.filter(a => a.correct).length}
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
              <MCQQuestionCard
                question={isFrench ? currentQuestion.questionFr : currentQuestion.question}
                code={currentQuestion.code}
                options={isFrench ? currentQuestion.optionsFr : currentQuestion.options}
                correctIndex={currentQuestion.correctIndex}
                explanation={isFrench ? currentQuestion.explanationFr : currentQuestion.explanation}
                requiresTerminal={currentQuestion.requiresTerminal}
                selectedAnswer={selectedAnswer}
                showResult={showResult}
                onSelectAnswer={handleSelectAnswer}
                onSubmit={handleSubmitAnswer}
                onNext={handleNextQuestion}
                isLastQuestion={currentQuestionIndex === shuffledQuestions.length - 1}
                isFrench={isFrench}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default MCQTest;
