import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProjectFeedback {
  projectId: string;
  childName: string;
  childAge: number;
  feeling: string;
  stars: number;
  completedAt: Date;
}

interface ProjectRatingStore {
  feedbacks: ProjectFeedback[];
  // Saved progress for guided projects
  savedProgress: Record<string, {
    currentStepIndex: number;
    completedSteps: string[];
    completedCodes: Record<string, string>;
    inputValues: Record<string, string>;
  }>;

  addFeedback: (feedback: ProjectFeedback) => void;
  getProjectRatings: (projectId: string) => { average: number; count: number };
  getAllRatings: () => Record<string, { average: number; count: number }>;
  getFeedback: (projectId: string, childName: string) => ProjectFeedback | undefined;

  saveProgress: (projectId: string, data: {
    currentStepIndex: number;
    completedSteps: string[];
    completedCodes: Record<string, string>;
    inputValues: Record<string, string>;
  }) => void;
  getProgress: (projectId: string) => {
    currentStepIndex: number;
    completedSteps: string[];
    completedCodes: Record<string, string>;
    inputValues: Record<string, string>;
  } | undefined;
  clearProgress: (projectId: string) => void;
}

export const useProjectRatingStore = create<ProjectRatingStore>()(
  persist(
    (set, get) => ({
      feedbacks: [],
      savedProgress: {},

      addFeedback: (feedback) => {
        set((state) => ({
          feedbacks: [...state.feedbacks, feedback],
        }));
      },

      getProjectRatings: (projectId) => {
        const feedbacks = get().feedbacks.filter(f => f.projectId === projectId);
        if (feedbacks.length === 0) return { average: 0, count: 0 };
        const total = feedbacks.reduce((sum, f) => sum + f.stars, 0);
        return { average: total / feedbacks.length, count: feedbacks.length };
      },

      getAllRatings: () => {
        const feedbacks = get().feedbacks;
        const ratings: Record<string, { average: number; count: number }> = {};
        const grouped: Record<string, number[]> = {};
        for (const f of feedbacks) {
          if (!grouped[f.projectId]) grouped[f.projectId] = [];
          grouped[f.projectId].push(f.stars);
        }
        for (const [id, stars] of Object.entries(grouped)) {
          const total = stars.reduce((s, v) => s + v, 0);
          ratings[id] = { average: total / stars.length, count: stars.length };
        }
        return ratings;
      },

      getFeedback: (projectId, childName) => {
        return get().feedbacks.find(f => f.projectId === projectId && f.childName === childName);
      },

      saveProgress: (projectId, data) => {
        set((state) => ({
          savedProgress: { ...state.savedProgress, [projectId]: data },
        }));
      },

      getProgress: (projectId) => {
        return get().savedProgress[projectId];
      },

      clearProgress: (projectId) => {
        set((state) => {
          const { [projectId]: _, ...rest } = state.savedProgress;
          return { savedProgress: rest };
        });
      },
    }),
    {
      name: 'kiddykode-project-ratings',
    }
  )
);
