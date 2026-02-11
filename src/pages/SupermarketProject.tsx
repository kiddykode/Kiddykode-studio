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
  ShoppingCart,
  Target,
  CheckSquare,
  Rocket
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { supermarketProject } from '@/data/supermarketProject';
import { useProgressStore } from '@/stores/progressStore';
import { Progress } from '@/components/ui/progress';
import Confetti from 'react-confetti';

const SupermarketProject = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const steps = supermarketProject.phases;
  const currentStep = steps[currentStepIndex];
  const content = isFrench ? currentStep.contentFr : currentStep.content;
  const title = isFrench ? currentStep.titleFr : currentStep.title;

  useEffect(() => {
    if (content.starterCode) {
      setCode(content.starterCode);
    }
    setOutput('');
    setShowHints(false);
  }, [currentStepIndex, content.starterCode]);

  const runCode = () => {
    try {
      let result = '';
      const lines = code.split('\n');
      const variables: Record<string, any> = {};
      let pendingInputs: string[] = [];
      let inputCount = 0;

      // Collect all input() calls and simulate them
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Handle if/elif/else blocks simply
        if (trimmed.startsWith('if ') || trimmed.startsWith('elif ') || trimmed.startsWith('else')) continue;

        // Handle variable assignment with input
        const inputAssign = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*int\s*\(\s*input\s*\((.*)\)\s*\)$/);
        if (inputAssign) {
          const varName = inputAssign[1];
          inputCount++;
          // Simulate with sample values
          const sampleValues = [3, 2, 1, 5000, 10000];
          variables[varName] = sampleValues[(inputCount - 1) % sampleValues.length];
          const prompt = inputAssign[2].replace(/['"]/g, '');
          result += `${prompt}${variables[varName]}\n`;
          continue;
        }

        // Handle simple input
        const simpleInputAssign = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*input\s*\((.*)\)$/);
        if (simpleInputAssign) {
          const varName = simpleInputAssign[1];
          variables[varName] = 'test';
          const prompt = simpleInputAssign[2].replace(/['"]/g, '');
          result += `${prompt}test\n`;
          continue;
        }

        // Handle print statements
        const printMatch = trimmed.match(/^print\s*\((.*)\)$/);
        if (printMatch) {
          let content = printMatch[1];
          
          // Handle string multiplication like "=" * 40
          const strMulMatch = content.match(/^["'](.+?)["']\s*\*\s*(\d+)$/);
          if (strMulMatch) {
            result += strMulMatch[1].repeat(parseInt(strMulMatch[2])) + '\n';
            continue;
          }

          // Handle concatenation with + 
          if (content.includes('" + "') || content.includes("' + '") || content.includes('" + \'') || content.includes("' + \"")) {
            // Simple string concat
          }

          // Handle multiple arguments
          const args = splitPrintArgs(content);
          const evaluated = args.map(arg => {
            const trimArg = arg.trim();
            
            // String literal
            if ((trimArg.startsWith('"') && trimArg.endsWith('"')) ||
                (trimArg.startsWith("'") && trimArg.endsWith("'"))) {
              return trimArg.slice(1, -1);
            }

            // String multiplication
            const mulMatch = trimArg.match(/^["'](.+?)["']\s*\*\s*(\d+)$/);
            if (mulMatch) {
              return mulMatch[1].repeat(parseInt(mulMatch[2]));
            }

            // String concatenation
            if (trimArg.includes(' + ')) {
              const parts = trimArg.split(' + ').map(p => {
                const tp = p.trim();
                if ((tp.startsWith('"') && tp.endsWith('"')) || (tp.startsWith("'") && tp.endsWith("'"))) {
                  return tp.slice(1, -1);
                }
                // String * number
                const sm = tp.match(/^["'](.+?)["']\s*\*\s*(\d+)$/);
                if (sm) return sm[1].repeat(parseInt(sm[2]));
                if (variables[tp] !== undefined) return String(variables[tp]);
                return tp;
              });
              return parts.join('');
            }

            // Variable reference
            if (variables[trimArg] !== undefined) {
              return String(variables[trimArg]);
            }

            // Escaped strings
            if (trimArg === '\\n' || trimArg === '"\\n"' || trimArg === "'\\n'") return '';

            return trimArg;
          });
          result += evaluated.join(' ') + '\n';
          continue;
        }

        // Handle variable assignment with expression
        const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch) {
          const varName = assignMatch[1];
          let value = assignMatch[2].trim();
          
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            variables[varName] = value.slice(1, -1);
          } else {
            try {
              const expr = value.replace(/[a-zA-Z_]\w*/g, (match) => 
                variables[match] !== undefined ? String(variables[match]) : match
              );
              variables[varName] = eval(expr);
            } catch {
              variables[varName] = value;
            }
          }
          continue;
        }
      }

      setOutput(result || '✅ Code ran successfully! Check your logic.');
    } catch (error) {
      setOutput(`❌ Error: ${error}`);
    }
  };

  // Helper to split print arguments respecting strings
  const splitPrintArgs = (content: string): string[] => {
    const args: string[] = [];
    let current = '';
    let inString: string | null = null;
    let depth = 0;

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      if (inString) {
        current += char;
        if (char === inString && content[i - 1] !== '\\') inString = null;
      } else if (char === '"' || char === "'") {
        current += char;
        inString = char;
      } else if (char === '(') {
        current += char;
        depth++;
      } else if (char === ')') {
        current += char;
        depth--;
      } else if (char === ',' && depth === 0) {
        args.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current) args.push(current);
    return args;
  };

  const completeStep = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
    
    if (currentStepIndex < steps.length - 1) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setCurrentStepIndex(currentStepIndex + 1);
      }, 2500);
    } else {
      setShowCelebration(true);
      completeLesson(`supermarket-${currentStep.id}`);
    }
  };

  const isStepUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedSteps.includes(steps[index - 1].id);
  };

  const progressPercentage = ((completedSteps.length) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900">
      {showCelebration && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 shadow-lg">
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
              <ShoppingCart className="w-6 h-6" />
              {isFrench ? supermarketProject.titleFr : supermarketProject.title}
            </h1>
            <p className="text-sm opacity-80">
              {isFrench ? supermarketProject.subtitleFr : supermarketProject.subtitle}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm opacity-80">
              Step {currentStepIndex + 1}/{steps.length}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white/50 dark:bg-black/20 p-3">
        <div className="container mx-auto">
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between mt-2">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                whileHover={isStepUnlocked(index) ? { scale: 1.1 } : {}}
                onClick={() => isStepUnlocked(index) && setCurrentStepIndex(index)}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all ${
                  index === currentStepIndex
                    ? 'bg-orange-500 text-white shadow-lg scale-110'
                    : completedSteps.includes(step.id)
                    ? 'bg-orange-400 text-white'
                    : isStepUnlocked(index)
                    ? 'bg-white text-orange-500 border-2 border-orange-500 cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : !isStepUnlocked(index) ? (
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
            key={currentStep.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Step Title & Introduction */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <ShoppingCart className="w-8 h-8 text-orange-500" />
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{content.introduction}</Markdown>
              </div>
            </div>

            {/* Code Editor */}
            {currentStep.type === 'coding' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Play className="w-5 h-5 text-orange-500" />
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

                {/* Hints */}
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
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg"
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

            {/* What You Learned / Success Check / Motivation */}
            {(content.whatYouLearned || content.successCheck || content.motivation) && (
              <div className="grid md:grid-cols-3 gap-4">
                {content.whatYouLearned && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-blue-800 dark:text-blue-300">
                        {isFrench ? 'Ce que tu as appris' : 'What You Learned'}
                      </h4>
                    </div>
                    <div className="prose dark:prose-invert text-sm max-w-none">
                      <Markdown>{content.whatYouLearned}</Markdown>
                    </div>
                  </motion.div>
                )}
                {content.successCheck && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-200 dark:border-green-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <CheckSquare className="w-5 h-5 text-green-600" />
                      <h4 className="font-bold text-green-800 dark:text-green-300">
                        {isFrench ? 'Vérification' : 'Success Check'}
                      </h4>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">{content.successCheck}</p>
                  </motion.div>
                )}
                {content.motivation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border-2 border-purple-200 dark:border-purple-700"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Rocket className="w-5 h-5 text-purple-600" />
                      <h4 className="font-bold text-purple-800 dark:text-purple-300">
                        {isFrench ? 'Motivation' : 'Keep Going!'}
                      </h4>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">{content.motivation}</p>
                  </motion.div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => currentStepIndex > 0 && setCurrentStepIndex(currentStepIndex - 1)}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
                {isFrench ? 'Précédent' : 'Previous'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={completeStep}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold shadow-lg"
              >
                {currentStepIndex === steps.length - 1 ? (
                  <>
                    <Trophy className="w-5 h-5" />
                    {isFrench ? 'Terminer le Projet!' : 'Complete Project!'}
                  </>
                ) : (
                  <>
                    {isFrench ? 'Étape Suivante' : 'Next Step'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Celebration */}
            {showCelebration && content.celebration && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              >
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-orange-500 mb-2">
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

export default SupermarketProject;
