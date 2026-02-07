import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MCQSetCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionCount: number;
  progressPercent: number;
  isComplete: boolean;
  onClick: () => void;
  index: number;
  isFrench: boolean;
}

const MCQSetCard = ({
  title,
  description,
  difficulty,
  questionCount,
  progressPercent,
  isComplete,
  onClick,
  index,
  isFrench,
}: MCQSetCardProps) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-kiddykode-green text-white';
      case 'intermediate':
        return 'bg-kiddykode-yellow text-kiddykode-blue-dark';
      case 'advanced':
        return 'bg-kiddykode-purple text-white';
      default:
        return 'bg-muted';
    }
  };

  const getDifficultyLabel = () => {
    if (isFrench) {
      switch (difficulty) {
        case 'beginner': return 'Débutant';
        case 'intermediate': return 'Intermédiaire';
        case 'advanced': return 'Avancé';
      }
    }
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] relative overflow-hidden group"
        onClick={onClick}
      >
        <div className="absolute bottom-0 left-0 h-1 bg-primary/30 w-full" />
        <div
          className="absolute bottom-0 left-0 h-1 bg-primary transition-all"
          style={{ width: `${progressPercent}%` }}
        />

        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
              📝 {title}
            </CardTitle>
            {isComplete && <CheckCircle className="w-5 h-5 text-kiddykode-green" />}
          </div>
          <Badge className={getDifficultyColor()}>
            {getDifficultyLabel()}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {questionCount} {isFrench ? 'questions' : 'questions'}
            </span>
            {progressPercent > 0 && (
              <span className="text-primary font-semibold">{progressPercent}%</span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MCQSetCard;
