import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Brand
      appName: "KiddyKode Studio",
      tagline: "Code Early. Build Tomorrow.",
      
      // Navigation
      home: "Home",
      learn: "Learn",
      create: "Create",
      stories: "Stories",
      progress: "Progress",
      settings: "Settings",
      parent: "Parent Dashboard",
      
      // Auth
      login: "Login",
      signup: "Sign Up",
      guestMode: "Continue as Guest",
      welcomeBack: "Welcome Back!",
      createAccount: "Create Account",
      email: "Email",
      password: "Password",
      name: "Name",
      age: "Age",
      
      // Splash
      splashWelcome: "Welcome to KiddyKode Studio",
      splashSubtitle: "Where coding meets creativity!",
      getStarted: "Get Started",
      
      // Dashboard
      dashboardTitle: "What do you want to do today?",
      learnMode: "Learn Mode",
      learnModeDesc: "Follow fun tutorials and learn step by step",
      testMode: "Test Mode",
      testModeDesc: "Put your skills to the test!",
      createMode: "Create Mode",
      createModeDesc: "Build your own amazing projects",
      storyMode: "Story Mode",
      storyModeDesc: "Unlock stories by solving coding challenges",
      
      // Editor
      runCode: "Run Code",
      clearOutput: "Clear",
      output: "Output",
      tutorial: "Tutorial",
      saveProject: "Save Project",
      loadProject: "Load Project",
      
      // Tutorials
      lesson: "Lesson",
      nextLesson: "Next Lesson",
      previousLesson: "Previous",
      tryIt: "Try It!",
      hint: "Need a hint?",
      
      // Progress
      yourProgress: "Your Progress",
      badges: "Badges",
      beginner: "Beginner",
      explorer: "Explorer",
      creator: "Creator",
      legend: "Legend",
      lessonsCompleted: "Lessons Completed",
      projectsCreated: "Projects Created",
      storiesUnlocked: "Stories Unlocked",
      
      // Stories
      codeTheLegends: "Code the Legends",
      storyLocked: "Complete more lessons to unlock",
      storyUnlocked: "Ready to play!",
      
      // Parent Dashboard
      parentDashboard: "Parent Dashboard",
      childProgress: "Child's Progress",
      timeSpent: "Time Spent",
      achievements: "Achievements",
      recentActivity: "Recent Activity",
      
      // Misc
      loading: "Loading...",
      error: "Oops! Something went wrong",
      success: "Great job!",
      back: "Back",
      continue: "Continue",
      skip: "Skip",
      
      // Sample Projects
      helloWorld: "Hello World",
      funWithVariables: "Fun with Variables",
      loopingFun: "Looping Fun",
      turtleArt: "Turtle Art",
    },
  },
  fr: {
    translation: {
      // Brand
      appName: "KiddyKode Studio",
      tagline: "Codez tôt. Construisez demain.",
      
      // Navigation
      home: "Accueil",
      learn: "Apprendre",
      create: "Créer",
      stories: "Histoires",
      progress: "Progrès",
      settings: "Paramètres",
      parent: "Tableau de Bord Parent",
      
      // Auth
      login: "Connexion",
      signup: "S'inscrire",
      guestMode: "Continuer en invité",
      welcomeBack: "Bon retour!",
      createAccount: "Créer un compte",
      email: "E-mail",
      password: "Mot de passe",
      name: "Nom",
      age: "Âge",
      
      // Splash
      splashWelcome: "Bienvenue à KiddyKode Studio",
      splashSubtitle: "Là où le codage rencontre la créativité!",
      getStarted: "Commencer",
      
      // Dashboard
      dashboardTitle: "Que veux-tu faire aujourd'hui?",
      learnMode: "Mode Apprentissage",
      learnModeDesc: "Suis des tutoriels amusants et apprends étape par étape",
      testMode: "Mode Test",
      testModeDesc: "Mets tes compétences à l'épreuve!",
      createMode: "Mode Création",
      createModeDesc: "Construis tes propres projets incroyables",
      storyMode: "Mode Histoire",
      storyModeDesc: "Débloquez des histoires en résolvant des défis de codage",
      
      // Editor
      runCode: "Exécuter",
      clearOutput: "Effacer",
      output: "Sortie",
      tutorial: "Tutoriel",
      saveProject: "Sauvegarder",
      loadProject: "Charger",
      
      // Tutorials
      lesson: "Leçon",
      nextLesson: "Suivant",
      previousLesson: "Précédent",
      tryIt: "Essaie!",
      hint: "Besoin d'un indice?",
      
      // Progress
      yourProgress: "Tes Progrès",
      badges: "Badges",
      beginner: "Débutant",
      explorer: "Explorateur",
      creator: "Créateur",
      legend: "Légende",
      lessonsCompleted: "Leçons Terminées",
      projectsCreated: "Projets Créés",
      storiesUnlocked: "Histoires Débloquées",
      
      // Stories
      codeTheLegends: "Code les Légendes",
      storyLocked: "Complète plus de leçons pour débloquer",
      storyUnlocked: "Prêt à jouer!",
      
      // Parent Dashboard
      parentDashboard: "Tableau de Bord Parent",
      childProgress: "Progrès de l'Enfant",
      timeSpent: "Temps Passé",
      achievements: "Réalisations",
      recentActivity: "Activité Récente",
      
      // Misc
      loading: "Chargement...",
      error: "Oups! Quelque chose s'est mal passé",
      success: "Excellent travail!",
      back: "Retour",
      continue: "Continuer",
      skip: "Passer",
      
      // Sample Projects
      helloWorld: "Bonjour le Monde",
      funWithVariables: "S'amuser avec les Variables",
      loopingFun: "Plaisir des Boucles",
      turtleArt: "Art avec Turtle",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
