import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BadgeLevel } from '@/stores/progressStore';
import { Star, Compass, Lightbulb, Crown } from 'lucide-react';

interface BadgeDisplayProps {
  badge: BadgeLevel;
  size?: 'sm' | 'md' | 'lg';
}

const badgeConfig: Record<BadgeLevel, {
  icon: typeof Star;
  color: string;
  bgColor: string;
  glowColor: string;
}> = {
  beginner: {
    icon: Star,
    color: 'text-badge-beginner',
    bgColor: 'bg-badge-beginner/20',
    glowColor: 'shadow-[0_0_20px_hsl(var(--badge-beginner)/0.5)]',
  },
  explorer: {
    icon: Compass,
    color: 'text-badge-explorer',
    bgColor: 'bg-badge-explorer/20',
    glowColor: 'shadow-[0_0_20px_hsl(var(--badge-explorer)/0.5)]',
  },
  creator: {
    icon: Lightbulb,
    color: 'text-badge-creator',
    bgColor: 'bg-badge-creator/20',
    glowColor: 'shadow-[0_0_20px_hsl(var(--badge-creator)/0.5)]',
  },
  legend: {
    icon: Crown,
    color: 'text-badge-legend',
    bgColor: 'bg-badge-legend/20',
    glowColor: 'shadow-[0_0_20px_hsl(var(--badge-legend)/0.5)]',
  },
};

const sizeClasses = {
  sm: {
    container: 'px-3 py-2',
    icon: 'w-4 h-4',
    text: 'text-sm',
  },
  md: {
    container: 'px-4 py-3',
    icon: 'w-5 h-5',
    text: 'text-base',
  },
  lg: {
    container: 'px-6 py-4',
    icon: 'w-7 h-7',
    text: 'text-lg',
  },
};

const BadgeDisplay = ({ badge, size = 'md' }: BadgeDisplayProps) => {
  const { t } = useTranslation();
  const config = badgeConfig[badge];
  const sizes = sizeClasses[size];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      className={`inline-flex items-center gap-2 ${sizes.container} ${config.bgColor} ${config.glowColor} rounded-2xl`}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className={`${sizes.icon} ${config.color}`} />
      </motion.div>
      <span className={`${sizes.text} font-bold ${config.color} capitalize`}>
        {t(badge)}
      </span>
    </motion.div>
  );
};

export default BadgeDisplay;
