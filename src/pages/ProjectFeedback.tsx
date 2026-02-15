import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Heart, Send, Award } from 'lucide-react';
import { useProjectRatingStore, ProjectFeedback as FeedbackType } from '@/stores/projectRatingStore';
import Confetti from 'react-confetti';

const feelings = [
  { emoji: '🤩', label: 'Amazing', labelFr: 'Incroyable' },
  { emoji: '😊', label: 'Happy', labelFr: 'Content' },
  { emoji: '😎', label: 'Cool', labelFr: 'Cool' },
  { emoji: '🤔', label: 'It was okay', labelFr: 'C\'était bien' },
  { emoji: '😅', label: 'A bit hard', labelFr: 'Un peu difficile' },
];

const ProjectFeedback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { i18n } = useTranslation();
  const isFrench = i18n.language === 'fr';
  const { addFeedback } = useProjectRatingStore();

  const projectId = searchParams.get('project') || 'supermarket';
  const projectName = searchParams.get('name') || 'Supermarket Project';

  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = () => {
    if (!childName.trim() || !childAge || !selectedFeeling || stars === 0) return;

    const feedback: FeedbackType = {
      projectId,
      childName: childName.trim(),
      childAge: parseInt(childAge),
      feeling: selectedFeeling,
      stars,
      completedAt: new Date(),
    };

    addFeedback(feedback);
    setSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const isValid = childName.trim() && childAge && selectedFeeling && stars > 0;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900 flex items-center justify-center p-4">
        {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isFrench ? 'Merci, ' : 'Thank you, '}{childName}! 
          </h2>
          <p className="text-muted-foreground mb-6">
            {isFrench 
              ? 'Ton avis nous aide à rendre KiddyKode encore meilleur!' 
              : 'Your feedback helps us make KiddyKode even better!'}
          </p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/project-certificate?project=${projectId}&name=${encodeURIComponent(childName)}&projectName=${encodeURIComponent(projectName)}`)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-bold shadow-lg"
            >
              <Award className="w-5 h-5" />
              {isFrench ? 'Obtenir mon Certificat' : 'Get My Certificate'}
            </motion.button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/create')}
            className="mt-4 text-sm text-muted-foreground underline"
          >
            {isFrench ? 'Retour aux projets' : 'Back to projects'}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🏆</div>
          <h2 className="text-2xl font-bold text-foreground">
            {isFrench ? 'Tu as terminé!' : 'You Did It!'}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            {isFrench 
              ? `Tu as complété "${projectName}"! Dis-nous ce que tu en penses!` 
              : `You completed "${projectName}"! Tell us what you think!`}
          </p>
        </div>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              {isFrench ? 'Ton Prénom' : 'Your Name'} ✏️
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              maxLength={50}
              placeholder={isFrench ? 'Entre ton prénom...' : 'Enter your name...'}
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-gray-700 text-foreground font-medium focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              {isFrench ? 'Ton Âge' : 'Your Age'} 🎂
            </label>
            <input
              type="number"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              min={4}
              max={18}
              placeholder={isFrench ? 'Entre ton âge...' : 'Enter your age...'}
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-gray-700 text-foreground font-medium focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Feelings */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">
              {isFrench ? 'Comment tu te sens?' : 'How do you feel?'} 💭
            </label>
            <div className="flex flex-wrap gap-2">
              {feelings.map((f) => (
                <motion.button
                  key={f.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFeeling(f.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedFeeling === f.label
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-orange-100 dark:bg-gray-700 text-foreground hover:bg-orange-200'
                  }`}
                >
                  <span>{f.emoji}</span>
                  <span>{isFrench ? f.labelFr : f.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Stars */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">
              {isFrench ? 'Donne-nous des étoiles!' : 'Give us stars!'} ⭐
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoveredStar(s)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setStars(s)}
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      s <= (hoveredStar || stars)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={isValid ? { scale: 1.05 } : {}}
            whileTap={isValid ? { scale: 0.95 } : {}}
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
              isValid
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg cursor-pointer'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
            {isFrench ? 'Envoyer mon avis!' : 'Send my feedback!'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectFeedback;
