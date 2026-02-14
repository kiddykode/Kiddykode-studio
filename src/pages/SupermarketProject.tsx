import { useState, useEffect, useMemo } from 'react';
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
  Rocket,
  AlertCircle,
  Code2
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { supermarketProject } from '@/data/supermarketProject';
import { useProgressStore } from '@/stores/progressStore';
import { Progress } from '@/components/ui/progress';
import Confetti from 'react-confetti';

// Parse input() calls from Python code
const parseInputCalls = (code: string): { varName: string; prompt: string; isInt: boolean }[] => {
  const inputs: { varName: string; prompt: string; isInt: boolean }[] = [];
  const lines = code.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) continue;
    
    const intInputMatch = trimmed.match(/^(\w+)\s*=\s*int\s*\(\s*input\s*\(\s*["'](.+?)["']\s*\)\s*\)/);
    if (intInputMatch) {
      inputs.push({ varName: intInputMatch[1], prompt: intInputMatch[2], isInt: true });
      continue;
    }
    const strInputMatch = trimmed.match(/^(\w+)\s*=\s*input\s*\(\s*["'](.+?)["']\s*\)/);
    if (strInputMatch) {
      inputs.push({ varName: strInputMatch[1], prompt: strInputMatch[2], isInt: false });
    }
  }
  return inputs;
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

// Simple Python expression evaluator
const evaluateExpr = (expr: string, variables: Record<string, any>): any => {
  const trimmed = expr.trim();
  
  // String literal
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  
  // String multiplication: "=" * 40
  const strMul = trimmed.match(/^["'](.+?)["']\s*\*\s*(\d+)$/);
  if (strMul) return strMul[1].repeat(parseInt(strMul[2]));
  
  // String concatenation with +
  if (trimmed.includes(' + ')) {
    const parts = trimmed.split(' + ').map(p => {
      const tp = p.trim();
      if ((tp.startsWith('"') && tp.endsWith('"')) || (tp.startsWith("'") && tp.endsWith("'"))) {
        return tp.slice(1, -1);
      }
      const sm = tp.match(/^["'](.+?)["']\s*\*\s*(\d+)$/);
      if (sm) return sm[1].repeat(parseInt(sm[2]));
      if (variables[tp] !== undefined) return String(variables[tp]);
      return tp;
    });
    return parts.join('');
  }
  
  // Variable reference
  if (variables[trimmed] !== undefined) {
    return variables[trimmed];
  }
  
  // Numeric expression - substitute variables
  const substituted = trimmed.replace(/\b([a-zA-Z_]\w*)\b/g, (match) => {
    if (variables[match] !== undefined) return String(variables[match]);
    return match;
  });
  
  try {
    return eval(substituted);
  } catch {
    return substituted;
  }
};

// Evaluate a Python condition
const evaluateCondition = (condition: string, variables: Record<string, any>): boolean => {
  const substituted = condition.replace(/\b([a-zA-Z_]\w*)\b/g, (match) => {
    if (variables[match] !== undefined) return String(variables[match]);
    return match;
  });
  try {
    const jsCondition = substituted.replace(/(?<!=)=(?!=)/g, '==');
    return Boolean(eval(jsCondition));
  } catch {
    return false;
  }
};

// Execute Python code with given input values
const executePython = (code: string, inputVals: Record<string, string>): string => {
  let result = '';
  const variables: Record<string, any> = {};
  const lines = code.split('\n');
  
  let skipBlock = false;
  let ifMatched = false;
  let inIfBlock = false;
  let baseIndent = 0;

  const executePrint = (argsStr: string) => {
    if (!argsStr.trim()) {
      result += '\n';
      return;
    }
    const args = splitPrintArgs(argsStr);
    const values = args.map(arg => {
      const val = evaluateExpr(arg, variables);
      return String(val);
    });
    result += values.join(' ') + '\n';
  };

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const trimmed = line.trim();
    const indent = line.length - line.trimStart().length;

    if (!trimmed || trimmed.startsWith('#')) continue;

    // Handle if/elif/else
    if (trimmed.match(/^if\s+/) && trimmed.endsWith(':')) {
      const condition = trimmed.slice(3, -1).trim();
      const condResult = evaluateCondition(condition, variables);
      inIfBlock = true;
      baseIndent = indent;
      ifMatched = condResult;
      skipBlock = !condResult;
      continue;
    }

    if (trimmed.match(/^elif\s+/) && trimmed.endsWith(':')) {
      if (ifMatched) {
        skipBlock = true;
        continue;
      }
      const condition = trimmed.slice(5, -1).trim();
      const condResult = evaluateCondition(condition, variables);
      ifMatched = condResult;
      skipBlock = !condResult;
      continue;
    }

    if ((trimmed === 'else:' || trimmed.startsWith('else:')) && inIfBlock) {
      if (ifMatched) {
        skipBlock = true;
      } else {
        skipBlock = false;
        ifMatched = true;
      }
      continue;
    }

    // Inside indented block
    if (indent > baseIndent && inIfBlock) {
      if (skipBlock) continue;
      // Process the line (fall through to handlers below)
    }

    // Back to base indent - reset if block
    if (indent <= baseIndent && inIfBlock && !trimmed.startsWith('if ') && !trimmed.startsWith('elif ') && !trimmed.startsWith('else')) {
      inIfBlock = false;
      ifMatched = false;
      skipBlock = false;
    }

    if (skipBlock && indent > baseIndent) continue;

    // int(input())
    const intInput = trimmed.match(/^(\w+)\s*=\s*int\s*\(\s*input\s*\(\s*["'](.+?)["']\s*\)\s*\)/);
    if (intInput) {
      const [, varName, prompt] = intInput;
      const val = parseInt(inputVals[varName] || '0');
      variables[varName] = isNaN(val) ? 0 : val;
      result += `${prompt}${variables[varName]}\n`;
      continue;
    }

    // string input()
    const strInput = trimmed.match(/^(\w+)\s*=\s*input\s*\(\s*["'](.+?)["']\s*\)/);
    if (strInput) {
      const [, varName, prompt] = strInput;
      variables[varName] = inputVals[varName] || '';
      result += `${prompt}${variables[varName]}\n`;
      continue;
    }

    // print()
    const printMatch = trimmed.match(/^print\s*\((.*)\)$/);
    if (printMatch) {
      executePrint(printMatch[1]);
      continue;
    }

    // Variable assignment
    const assign = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
    if (assign) {
      const [, varName, expr] = assign;
      variables[varName] = evaluateExpr(expr, variables);
      continue;
    }
  }

  return result;
};

const SupermarketProject = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { completeLesson } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [completedCodes, setCompletedCodes] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [hasRun, setHasRun] = useState(false);

  const steps = supermarketProject.phases;
  const currentStep = steps[currentStepIndex];
  const content = isFrench ? currentStep.contentFr : currentStep.content;
  const title = isFrench ? currentStep.titleFr : currentStep.title;

  // Build code for current step from previous completed code + current new section
  useEffect(() => {
    if (currentStep.type === 'review') {
      // Step 8: show full combined code from all completed steps
      const lastStepId = steps[currentStepIndex - 1]?.id;
      setCode(completedCodes[lastStepId] || '');
    } else if (currentStepIndex === 0) {
      setCode(content.starterCode || '');
    } else {
      // Find the most recent completed code
      let previousCode = '';
      for (let i = currentStepIndex - 1; i >= 0; i--) {
        if (completedCodes[steps[i].id]) {
          previousCode = completedCodes[steps[i].id];
          break;
        }
      }
      const newSection = content.starterCode || '';
      setCode(previousCode ? previousCode + '\n\n' + newSection : newSection);
    }
    setOutput('');
    setShowHints(false);
    setIsValidated(false);
    setValidationErrors([]);
    setHasRun(false);
    setInputValues({});
  }, [currentStepIndex]);

  // Parse input calls from current code
  const inputPrompts = useMemo(() => parseInputCalls(code), [code]);

  const validateCode = (): { valid: boolean; errors: string[] } => {
    const rules = content.validationRules;
    if (!rules || rules.length === 0) return { valid: true, errors: [] };
    
    const errors: string[] = [];
    for (const rule of rules) {
      const regex = new RegExp(rule.pattern);
      if (!regex.test(code)) {
        errors.push(isFrench ? rule.messageFr : rule.message);
      }
    }
    return { valid: errors.length === 0, errors };
  };

  const runCode = () => {
    // Check if all input fields are filled
    for (const prompt of inputPrompts) {
      if (!inputValues[prompt.varName] && inputValues[prompt.varName] !== '0') {
        setOutput(isFrench 
          ? `❌ Remplis tous les champs de saisie avant d'exécuter!` 
          : `❌ Fill in all input fields before running!`);
        return;
      }
    }

    try {
      const result = executePython(code, inputValues);
      setOutput(result || (isFrench ? '✅ Code exécuté avec succès!' : '✅ Code ran successfully!'));
      
      // Validate
      const { valid, errors } = validateCode();
      setIsValidated(valid);
      setValidationErrors(errors);
      setHasRun(true);
    } catch (error) {
      setOutput(`❌ Error: ${error}`);
      setIsValidated(false);
      setHasRun(true);
    }
  };

  const completeStep = () => {
    if (!isValidated && currentStep.type !== 'review') return;
    
    // Store completed code
    setCompletedCodes(prev => ({ ...prev, [currentStep.id]: code }));
    
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps(prev => [...prev, currentStep.id]);
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

  const canComplete = currentStep.type === 'review' ? hasRun : isValidated;

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
                {currentStep.type === 'review' ? (
                  <Code2 className="w-8 h-8 text-orange-500" />
                ) : (
                  <ShoppingCart className="w-8 h-8 text-orange-500" />
                )}
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{content.introduction}</Markdown>
              </div>
            </div>

            {/* Code Editor - for coding and review steps */}
            {(currentStep.type === 'coding' || currentStep.type === 'review') && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    {currentStep.type === 'review' ? (
                      <>
                        <Code2 className="w-5 h-5 text-orange-500" />
                        {isFrench ? 'Ton Programme Complet' : 'Your Complete Program'}
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 text-orange-500" />
                        {isFrench ? 'Ton Code Python' : 'Your Python Code'}
                      </>
                    )}
                  </h3>
                  {currentStep.type === 'coding' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-lg font-semibold"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {isFrench ? 'Indices' : 'Hints'}
                    </motion.button>
                  )}
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
                    onChange={(value) => {
                      setCode(value || '');
                      // Reset validation when code changes
                      setIsValidated(false);
                      setHasRun(false);
                    }}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      fontFamily: 'Fira Code, monospace',
                      minimap: { enabled: false },
                      padding: { top: 16 },
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      readOnly: currentStep.type === 'review',
                    }}
                  />
                </div>

                {/* Input Fields Panel */}
                {inputPrompts.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-700">
                    <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                      ⌨️ {isFrench ? 'Entrées du Programme (tape tes valeurs):' : 'Program Inputs (type your values):'}
                    </h4>
                    <div className="grid gap-2">
                      {inputPrompts.map((prompt) => (
                        <div key={prompt.varName} className="flex items-center gap-3">
                          <label className="text-sm font-medium text-blue-700 dark:text-blue-300 min-w-[200px]">
                            {prompt.prompt}
                          </label>
                          <input
                            type={prompt.isInt ? 'number' : 'text'}
                            value={inputValues[prompt.varName] || ''}
                            onChange={(e) => setInputValues(prev => ({
                              ...prev,
                              [prompt.varName]: e.target.value
                            }))}
                            className="flex-1 px-3 py-2 rounded-lg border border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-800 text-foreground text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder={prompt.isInt ? (isFrench ? 'Tape un nombre...' : 'Type a number...') : (isFrench ? 'Tape ta réponse...' : 'Type your answer...')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={runCode}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    {currentStep.type === 'review' 
                      ? (isFrench ? 'Exécuter Mon Programme' : 'Run My Program')
                      : (isFrench ? 'Exécuter' : 'Run Code')
                    }
                  </motion.button>
                  {currentStep.type === 'coding' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        // Reset to original starter code for current step
                        if (currentStepIndex === 0) {
                          setCode(content.starterCode || '');
                        } else {
                          let previousCode = '';
                          for (let i = currentStepIndex - 1; i >= 0; i--) {
                            if (completedCodes[steps[i].id]) {
                              previousCode = completedCodes[steps[i].id];
                              break;
                            }
                          }
                          const newSection = content.starterCode || '';
                          setCode(previousCode ? previousCode + '\n\n' + newSection : newSection);
                        }
                        setIsValidated(false);
                        setHasRun(false);
                        setOutput('');
                        setValidationErrors([]);
                      }}
                      className="flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {isFrench ? 'Réinitialiser' : 'Reset'}
                    </motion.button>
                  )}
                </div>

                {/* Validation Feedback */}
                {hasRun && !isValidated && validationErrors.length > 0 && currentStep.type === 'coding' && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-700">
                    <h4 className="text-sm font-bold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {isFrench ? 'Pas encore correct — essaie encore!' : 'Not quite right — try again!'}
                    </h4>
                    <ul className="space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                          <span>❌</span>
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hasRun && isValidated && currentStep.type === 'coding' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-t border-green-200 dark:border-green-700">
                    <p className="text-sm font-bold text-green-700 dark:text-green-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      {isFrench ? '✅ Parfait! Ton code est correct! Clique "Étape Suivante" pour continuer!' : '✅ Perfect! Your code is correct! Click "Next Step" to continue!'}
                    </p>
                  </div>
                )}

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
                whileHover={canComplete ? { scale: 1.05 } : {}}
                whileTap={canComplete ? { scale: 0.95 } : {}}
                onClick={completeStep}
                disabled={!canComplete}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold shadow-lg transition-all ${
                  canComplete
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white cursor-pointer'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
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

            {/* Not completed message */}
            {!canComplete && currentStep.type !== 'review' && (
              <div className="text-center">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  {isFrench 
                    ? '⚠️ Complète cette étape correctement avant de passer à la suivante!' 
                    : '⚠️ Complete this step correctly before moving to the next one!'}
                </p>
              </div>
            )}

            {!canComplete && currentStep.type === 'review' && (
              <div className="text-center">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  {isFrench 
                    ? '⚠️ Exécute ton programme complet pour terminer le projet!' 
                    : '⚠️ Run your complete program to finish the project!'}
                </p>
              </div>
            )}

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
