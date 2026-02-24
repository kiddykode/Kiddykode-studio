import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MCQCodeBlock from './MCQCodeBlock';

interface MCQQuestionCardProps {
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  requiresTerminal?: boolean;
  selectedAnswer: number | null;
  showResult: boolean;
  onSelectAnswer: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  isLastQuestion: boolean;
  isFrench: boolean;
}

const MCQQuestionCard = ({
  question,
  code,
  options,
  correctIndex,
  explanation,
  requiresTerminal,
  selectedAnswer,
  showResult,
  onSelectAnswer,
  onSubmit,
  onNext,
  isLastQuestion,
  isFrench,
}: MCQQuestionCardProps) => {
  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'border-primary bg-primary/10'
        : 'border-border hover:border-primary/50 hover:bg-accent/50';
    }

    if (index === correctIndex) {
      return 'border-kiddykode-green bg-kiddykode-green/20';
    }
    if (index === selectedAnswer && index !== correctIndex) {
      return 'border-red-500 bg-red-500/20';
    }
    return 'border-border opacity-50';
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {code && (
          <MCQCodeBlock 
            code={code} 
            requiresTerminal={requiresTerminal} 
            isFrench={isFrench} 
          />
        )}

        <div className="space-y-3">
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
              onClick={() => !showResult && onSelectAnswer(index)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${getOptionStyle(index)}`}
            >
              <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-sm">{option}</span>
              {showResult && index === correctIndex && (
                <CheckCircle className="w-5 h-5 text-kiddykode-green shrink-0" />
              )}
              {showResult && index === selectedAnswer && index !== correctIndex && (
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
              )}
            </motion.div>
          ))}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl ${
              selectedAnswer === correctIndex
                ? 'bg-kiddykode-green/20 border border-kiddykode-green/30'
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <p className="font-semibold mb-1">
              {selectedAnswer === correctIndex
                ? (isFrench ? '🎉 Correct!' : '🎉 Correct!')
                : (isFrench ? '❌ Pas tout à fait...' : '❌ Not quite...')}
            </p>
            <p className="text-sm text-muted-foreground">
              {explanation}
            </p>
          </motion.div>
        )}

        <div className="flex gap-3 pt-2">
          {!showResult && (
            <Button
              onClick={onSubmit}
              disabled={selectedAnswer === null}
              className="flex-1"
              size="lg"
            >
              {isFrench ? 'Vérifier' : 'Check Answer'}
            </Button>
          )}

          {showResult && (
            <Button onClick={onNext} className="flex-1 flex items-center gap-2" size="lg">
              {isLastQuestion
                ? (isFrench ? 'Voir le Score' : 'See Score')
                : (isFrench ? 'Suivant' : 'Next')}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MCQQuestionCard;
