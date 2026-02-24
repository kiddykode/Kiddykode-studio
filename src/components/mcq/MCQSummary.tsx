import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Trophy, RefreshCw, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Answer {
  questionId: string;
  correct: boolean;
}

interface MCQSummaryProps {
  answers: Answer[];
  totalQuestions: number;
  setTitle: string;
  onRetry: () => void;
  onBack: () => void;
}

const MCQSummary = ({ answers, totalQuestions, setTitle, onRetry, onBack }: MCQSummaryProps) => {
  const { i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';

  const correctCount = answers.filter(a => a.correct).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getMessage = () => {
    if (percentage === 100) return isFrench ? '🏆 Parfait! Tu es un champion!' : '🏆 Perfect! You\'re a champion!';
    if (percentage >= 80) return isFrench ? '🌟 Excellent travail!' : '🌟 Excellent work!';
    if (percentage >= 60) return isFrench ? '👍 Bon travail! Continue!' : '👍 Good job! Keep going!';
    if (percentage >= 40) return isFrench ? '💪 Pas mal! Tu peux t\'améliorer!' : '💪 Not bad! You can improve!';
    return isFrench ? '📚 Continue à pratiquer!' : '📚 Keep practicing!';
  };

  const getColor = () => {
    if (percentage >= 80) return 'text-kiddykode-green';
    if (percentage >= 60) return 'text-kiddykode-yellow';
    return 'text-kiddykode-orange';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      <Card className="text-center">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto"
          >
            <Trophy className={`w-16 h-16 ${getColor()}`} />
          </motion.div>
          <CardTitle className="text-xl">
            {isFrench ? 'Quiz Terminé!' : 'Quiz Complete!'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{setTitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.4 }}
              className={`text-5xl font-bold ${getColor()}`}
            >
              {percentage}%
            </motion.div>
            <p className="text-muted-foreground mt-2">
              {correctCount} / {totalQuestions} {isFrench ? 'correct' : 'correct'}
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg font-semibold"
          >
            {getMessage()}
          </motion.p>

          <div className="flex flex-wrap justify-center gap-2">
            {answers.map((answer, index) => (
              <motion.div
                key={answer.questionId}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  answer.correct 
                    ? 'bg-kiddykode-green/20 text-kiddykode-green' 
                    : 'bg-red-500/20 text-red-500'
                }`}
              >
                {answer.correct ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isFrench ? 'Retour' : 'Back'}
            </Button>
            <Button
              onClick={onRetry}
              className="flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {isFrench ? 'Réessayer' : 'Try Again'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MCQSummary;
