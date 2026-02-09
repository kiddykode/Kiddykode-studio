import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Lightbulb,
  Play,
  RotateCcw,
  Trophy,
  Leaf,
  Recycle,
  Trash2
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { ecoHelperProject, EcoPhase } from '@/data/ecoHelperProject';
import { useProgressStore } from '@/stores/progressStore';
import { Progress } from '@/components/ui/progress';
import Confetti from 'react-confetti';

const EcoHelperProject = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { progress, completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [completedPhases, setCompletedPhases] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const phases = ecoHelperProject.phases;
  const currentPhase = phases[currentPhaseIndex];
  const content = isFrench ? currentPhase.contentFr : currentPhase.content;
  const title = isFrench ? currentPhase.titleFr : currentPhase.title;

  useEffect(() => {
    // Load starter code when entering a coding phase
    if (currentPhase.type === 'coding' && content.starterCode) {
      setCode(content.starterCode);
    }
    setOutput('');
    setShowHints(false);
  }, [currentPhaseIndex, currentPhase.type, content.starterCode]);

  const runCode = () => {
    try {
      let result = '';
      const lines = code.split('\n');
      const variables: Record<string, any> = {};

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Handle print statements
        const printMatch = trimmed.match(/^print\s*\((.*)\)$/);
        if (printMatch) {
          let content = printMatch[1];
          const args = content.split(',').map(arg => {
            const trimArg = arg.trim();
            if ((trimArg.startsWith('"') && trimArg.endsWith('"')) ||
                (trimArg.startsWith("'") && trimArg.endsWith("'"))) {
              return trimArg.slice(1, -1);
            }
            if (variables[trimArg] !== undefined) {
              return JSON.stringify(variables[trimArg]);
            }
            return trimArg;
          });
          result += args.join(' ') + '\n';
          continue;
        }

        // Handle list assignments
        const listMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*\[(.*)\]$/);
        if (listMatch) {
          const varName = listMatch[1];
          const items = listMatch[2].split(',').map(item => {
            const trimItem = item.trim();
            if ((trimItem.startsWith('"') && trimItem.endsWith('"')) ||
                (trimItem.startsWith("'") && trimItem.endsWith("'"))) {
              return trimItem.slice(1, -1);
            }
            return trimItem;
          }).filter(item => item);
          variables[varName] = items;
          continue;
        }

        // Handle simple variable assignment
        const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch) {
          const varName = assignMatch[1];
          let value = assignMatch[2].trim();
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            variables[varName] = value.slice(1, -1);
          } else if (!isNaN(Number(value))) {
            variables[varName] = Number(value);
          } else {
            variables[varName] = value;
          }
        }
      }

      setOutput(result || '✅ Code ran successfully! Check your logic.');
    } catch (error) {
      setOutput(`❌ Error: ${error}`);
    }
  };

  const completePhase = () => {
    if (!completedPhases.includes(currentPhase.id)) {
      setCompletedPhases([...completedPhases, currentPhase.id]);
    }
    
    if (currentPhaseIndex < phases.length - 1) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setCurrentPhaseIndex(currentPhaseIndex + 1);
      }, 2000);
    } else {
      // Final phase complete
      setShowCelebration(true);
      completeLesson(`eco-helper-${currentPhase.id}`);
    }
  };

  const isPhaseUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedPhases.includes(phases[index - 1].id);
  };

  const progressPercentage = ((completedPhases.length) / phases.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
      {showCelebration && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/create')}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              {isFrench ? ecoHelperProject.titleFr : ecoHelperProject.title}
            </h1>
            <p className="text-sm opacity-80">
              {isFrench ? ecoHelperProject.subtitleFr : ecoHelperProject.subtitle}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm opacity-80">
              {isFrench ? 'Phase' : 'Phase'} {currentPhaseIndex + 1}/{phases.length}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white/50 dark:bg-black/20 p-3">
        <div className="container mx-auto">
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between mt-2">
            {phases.map((phase, index) => (
              <motion.button
                key={phase.id}
                whileHover={isPhaseUnlocked(index) ? { scale: 1.1 } : {}}
                onClick={() => isPhaseUnlocked(index) && setCurrentPhaseIndex(index)}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  index === currentPhaseIndex
                    ? 'bg-green-600 text-white shadow-lg scale-110'
                    : completedPhases.includes(phase.id)
                    ? 'bg-green-500 text-white'
                    : isPhaseUnlocked(index)
                    ? 'bg-white text-green-600 border-2 border-green-600 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {completedPhases.includes(phase.id) ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : !isPhaseUnlocked(index) ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Phase Title */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                {currentPhase.type === 'learning' && <Recycle className="w-8 h-8 text-green-600" />}
                {currentPhase.type === 'coding' && <Play className="w-8 h-8 text-blue-600" />}
                {currentPhase.type === 'celebration' && <Trophy className="w-8 h-8 text-yellow-500" />}
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              </div>

              {/* Introduction */}
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{content.introduction}</Markdown>
              </div>

              {/* Sections (for learning phases) */}
              {content.sections && (
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {content.sections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-4 border-2 border-green-200 dark:border-green-700"
                    >
                      <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">
                        {section.title}
                      </h3>
                      {section.definition && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {section.definition}
                        </p>
                      )}
                      {section.examples && (
                        <ul className="text-sm space-y-1">
                          {section.examples.map((example, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <span className="w-2 h-2 bg-green-500 rounded-full" />
                              {example}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Reflection */}
              {content.reflection && (
                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border-2 border-yellow-300 dark:border-yellow-700">
                  <div className="prose dark:prose-invert max-w-none">
                    <Markdown>
                    {content.reflection}
                    </Markdown>
                  </div>
                </div>
              )}
            </div>

            {/* Code Editor (for coding phases) */}
            {currentPhase.type === 'coding' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                {/* Hints Button */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-500" />
                    {isFrench ? 'Ton Code Python' : 'Your Python Code'}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowHints(!showHints)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg font-semibold"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {isFrench ? 'Indices' : 'Hints'}
                  </motion.button>
                </div>

                {/* Hints Panel */}
                <AnimatePresence>
                  {showHints && content.codeHints && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-700 overflow-hidden"
                    >
                      <div className="p-4 space-y-2">
                        {content.codeHints.map((hint, index) => (
                          <p key={index} className="text-sm text-yellow-800 dark:text-yellow-200">
                            {hint}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Editor */}
                <div className="h-[400px]">
                  <Editor
                    height="100%"
                    defaultLanguage="python"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      fontFamily: 'Fira Code, monospace',
                      minimap: { enabled: false },
                      padding: { top: 16 },
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={runCode}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    {isFrench ? 'Exécuter' : 'Run Code'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCode(content.starterCode || '')}
                    className="flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {isFrench ? 'Réinitialiser' : 'Reset'}
                  </motion.button>
                </div>

                {/* Output */}
                {output && (
                  <div className="p-4 bg-gray-900 border-t border-gray-700">
                    <h4 className="text-sm font-bold text-gray-400 mb-2">
                      {isFrench ? 'Sortie:' : 'Output:'}
                    </h4>
                    <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                      {output}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Provided Code Display (for Phase 2) */}
            {content.codeProvided && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-foreground">
                    {isFrench ? 'Code Tkinter Fourni' : 'Provided Tkinter Code'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isFrench 
                      ? 'Ce code crée l\'interface - tu n\'as pas besoin de le modifier!'
                      : 'This code creates the interface - you don\'t need to modify it!'}
                  </p>
                </div>
                <div className="h-[400px]">
                  <Editor
                    height="100%"
                    defaultLanguage="python"
                    value={content.codeProvided}
                    theme="vs-dark"
                    options={{
                      fontSize: 13,
                      fontFamily: 'Fira Code, monospace',
                      minimap: { enabled: false },
                      readOnly: true,
                      padding: { top: 16 },
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => currentPhaseIndex > 0 && setCurrentPhaseIndex(currentPhaseIndex - 1)}
                disabled={currentPhaseIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                {isFrench ? 'Précédent' : 'Previous'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={completePhase}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold shadow-lg"
              >
                {currentPhaseIndex === phases.length - 1 ? (
                  <>
                    <Trophy className="w-5 h-5" />
                    {isFrench ? 'Terminer le Projet!' : 'Complete Project!'}
                  </>
                ) : (
                  <>
                    {isFrench ? 'Phase Suivante' : 'Next Phase'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Celebration Message */}
            {showCelebration && content.celebration && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {isFrench ? 'Félicitations!' : 'Congratulations!'}
                  </h3>
                  <p className="text-foreground">{content.celebration}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default EcoHelperProject;
