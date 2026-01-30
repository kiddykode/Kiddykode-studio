import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BadgeLevel = 'beginner' | 'explorer' | 'creator' | 'legend';

export interface Project {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
}

export interface UserProgress {
  lessonsCompleted: LessonProgress[];
  projectsCreated: Project[];
  storiesUnlocked: string[];
  currentBadge: BadgeLevel;
  totalTimeSpent: number; // in minutes
  lastActive: Date;
}

interface ProgressStore {
  progress: UserProgress;
  isGuest: boolean;
  userName: string;
  
  // Actions
  completeLesson: (lessonId: string) => void;
  saveProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  unlockStory: (storyId: string) => void;
  updateTimeSpent: (minutes: number) => void;
  setUserName: (name: string) => void;
  setIsGuest: (guest: boolean) => void;
  getBadgeLevel: () => BadgeLevel;
  reset: () => void;
}

const initialProgress: UserProgress = {
  lessonsCompleted: [],
  projectsCreated: [],
  storiesUnlocked: [],
  currentBadge: 'beginner',
  totalTimeSpent: 0,
  lastActive: new Date(),
};

const calculateBadge = (lessonsCompleted: number): BadgeLevel => {
  if (lessonsCompleted >= 20) return 'legend';
  if (lessonsCompleted >= 10) return 'creator';
  if (lessonsCompleted >= 5) return 'explorer';
  return 'beginner';
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      progress: initialProgress,
      isGuest: true,
      userName: 'Young Coder',
      
      completeLesson: (lessonId: string) => {
        set((state) => {
          const exists = state.progress.lessonsCompleted.find(l => l.lessonId === lessonId);
          if (exists) return state;
          
          const newLessons = [
            ...state.progress.lessonsCompleted,
            { lessonId, completed: true, completedAt: new Date() },
          ];
          
          return {
            progress: {
              ...state.progress,
              lessonsCompleted: newLessons,
              currentBadge: calculateBadge(newLessons.length),
              lastActive: new Date(),
            },
          };
        });
      },
      
      saveProject: (project) => {
        const newProject: Project = {
          ...project,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          progress: {
            ...state.progress,
            projectsCreated: [...state.progress.projectsCreated, newProject],
            lastActive: new Date(),
          },
        }));
      },
      
      unlockStory: (storyId: string) => {
        set((state) => {
          if (state.progress.storiesUnlocked.includes(storyId)) return state;
          
          return {
            progress: {
              ...state.progress,
              storiesUnlocked: [...state.progress.storiesUnlocked, storyId],
              lastActive: new Date(),
            },
          };
        });
      },
      
      updateTimeSpent: (minutes: number) => {
        set((state) => ({
          progress: {
            ...state.progress,
            totalTimeSpent: state.progress.totalTimeSpent + minutes,
            lastActive: new Date(),
          },
        }));
      },
      
      setUserName: (name: string) => set({ userName: name }),
      
      setIsGuest: (guest: boolean) => set({ isGuest: guest }),
      
      getBadgeLevel: () => get().progress.currentBadge,
      
      reset: () => set({ progress: initialProgress, isGuest: true, userName: 'Young Coder' }),
    }),
    {
      name: 'kiddykode-progress',
    }
  )
);
