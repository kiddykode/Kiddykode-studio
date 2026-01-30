import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Lightbulb, Play, Check } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import Editor from '@monaco-editor/react';
import { tutorials } from '@/data/tutorials';
import { useProgressStore } from '@/stores/progressStore';

const TutorialLesson = () => {
  const navigate = useNavigate();
  const { tutorialId } = useParams();
  const { t, i18n } = useTranslation();
  const { completeLesson, progress } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const tutorial = tutorials.find(t => t.id === tutorialId);
  const lesson = tutorial?.lessons[currentLessonIndex];

  useEffect(() => {
    if (lesson) {
      setCode(lesson.starterCode);
      setOutput('');
      setShowHint(false);
    }
  }, [lesson]);

  if (!tutorial || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Tutorial not found</p>
      </div>
    );
  }

  const isLessonComplete = progress.lessonsCompleted.some(l => l.lessonId === lesson.id);

  // Simple Python interpreter simulation
  const runCode = () => {
    try {
      let result = '';
      const lines = code.split('\n');
      const variables: Record<string, any> = {};

      for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Handle print statements
        const printMatch = trimmed.match(/^print\s*\((.*)\)$/);
        if (printMatch) {
          let content = printMatch[1];
          
          // Handle multiple arguments in print
          const args = content.split(',').map(arg => {
            const trimArg = arg.trim();
            // String literal
            if ((trimArg.startsWith('"') && trimArg.endsWith('"')) ||
                (trimArg.startsWith("'") && trimArg.endsWith("'"))) {
              return trimArg.slice(1, -1);
            }
            // Variable or expression
            if (variables[trimArg] !== undefined) {
              return variables[trimArg];
            }
            // Simple math expression
            try {
              const expr = trimArg.replace(/[a-zA-Z_]\w*/g, (match) => 
                variables[match] !== undefined ? variables[match] : match
              );
              return eval(expr);
            } catch {
              return trimArg;
            }
          });
          
          result += args.join(' ') + '\n';
          continue;
        }

        // Handle variable assignment
        const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
        if (assignMatch) {
          const varName = assignMatch[1];
          let value = assignMatch[2].trim();
          
          // String
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            variables[varName] = value.slice(1, -1);
          } else {
            // Try to evaluate as expression
            try {
              const expr = value.replace(/[a-zA-Z_]\w*/g, (match) => 
                variables[match] !== undefined ? variables[match] : match
              );
              variables[varName] = eval(expr);
            } catch {
              variables[varName] = value;
            }
          }
          continue;
        }

        // Handle for loops (simple version)
        const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+range\s*\(([^)]+)\)\s*:$/);
        if (forMatch) {
          const varName = forMatch[1];
          const rangeArgs = forMatch[2].split(',').map(a => {
            const trimA = a.trim();
            return variables[trimA] !== undefined ? variables[trimA] : parseInt(trimA);
          });
          
          let start = 0, end = 0, step = 1;
          if (rangeArgs.length === 1) {
            end = rangeArgs[0];
          } else if (rangeArgs.length === 2) {
            start = rangeArgs[0];
            end = rangeArgs[1];
          } else if (rangeArgs.length === 3) {
            start = rangeArgs[0];
            end = rangeArgs[1];
            step = rangeArgs[2];
          }

          // Find indented block
          const currentLineIndex = lines.indexOf(line);
          const blockLines: string[] = [];
          for (let i = currentLineIndex + 1; i < lines.length; i++) {
            const nextLine = lines[i];
            if (nextLine.match(/^\s+/) && nextLine.trim()) {
              blockLines.push(nextLine.trim());
            } else if (nextLine.trim()) {
              break;
            }
          }

          // Execute loop
          for (let i = start; step > 0 ? i < end : i > end; i += step) {
            variables[varName] = i;
            for (const blockLine of blockLines) {
              const blockPrintMatch = blockLine.match(/^print\s*\((.*)\)$/);
              if (blockPrintMatch) {
                let content = blockPrintMatch[1];
                const args = content.split(',').map(arg => {
                  const trimArg = arg.trim();
                  if ((trimArg.startsWith('"') && trimArg.endsWith('"')) ||
                      (trimArg.startsWith("'") && trimArg.endsWith("'"))) {
                    return trimArg.slice(1, -1);
                  }
                  if (variables[trimArg] !== undefined) {
                    return variables[trimArg];
                  }
                  // Handle string multiplication
                  const mulMatch = trimArg.match(/^["'](.+)["']\s*\*\s*\(?\s*([^)]+)\s*\)?$/);
                  if (mulMatch) {
                    const str = mulMatch[1];
                    const num = eval(mulMatch[2].replace(/[a-zA-Z_]\w*/g, m => 
                      variables[m] !== undefined ? variables[m] : m
                    ));
                    return str.repeat(num);
                  }
                  try {
                    const expr = trimArg.replace(/[a-zA-Z_]\w*/g, (match) => 
                      variables[match] !== undefined ? variables[match] : match
                    );
                    return eval(expr);
                  } catch {
                    return trimArg;
                  }
                });
                result += args.join(' ') + '\n';
              }
            }
          }
        }
      }

      setOutput(result || 'Program ran successfully! (No output)');
      
      // Check if lesson should be completed
      if (!isLessonComplete) {
        completeLesson(lesson.id);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < tutorial.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      navigate('/learn');
    }
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}

      {/* Header */}
      <header className="bg-kiddykode-green text-white p-4">
        <div className="container mx-auto flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/learn')}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">
              {isFrench ? tutorial.titleFr : tutorial.title}
            </h1>
            <p className="text-sm opacity-80">
              {t('lesson')} {currentLessonIndex + 1} / {tutorial.lessons.length}
            </p>
          </div>
          {isLessonComplete && (
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
              <Check className="w-4 h-4" />
              Complete
            </span>
          )}
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Tutorial Panel */}
        <div className="lg:w-1/2 p-4 lg:p-6 bg-muted overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="kid-card bg-card"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {isFrench ? lesson.titleFr : lesson.title}
            </h2>
            <div className="prose prose-lg text-foreground max-w-none">
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: (isFrench ? lesson.instructionFr : lesson.instruction)
                    .replace(/```python\n([\s\S]*?)```/g, '<pre class="bg-secondary text-secondary-foreground p-4 rounded-xl overflow-x-auto font-code text-sm"><code>$1</code></pre>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded font-code text-sm">$1</code>')
                }}
              />
            </div>

            {/* Hint Button */}
            <div className="mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-kiddykode-yellow hover:text-kiddykode-orange transition-colors"
              >
                <Lightbulb className="w-5 h-5" />
                <span className="font-semibold">{t('hint')}</span>
              </motion.button>
              
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 p-4 bg-kiddykode-yellow/20 rounded-xl text-foreground"
                >
                  💡 {isFrench ? lesson.hintFr : lesson.hint}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Code Editor Panel */}
        <div className="lg:w-1/2 flex flex-col bg-background">
          {/* Editor */}
          <div className="flex-1 min-h-[300px]">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                fontSize: 16,
                fontFamily: 'Fira Code, monospace',
                minimap: { enabled: false },
                padding: { top: 16 },
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Run Button */}
          <div className="p-4 bg-secondary">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={runCode}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-glow-orange"
            >
              <Play className="w-6 h-6" />
              {t('runCode')} 🚀
            </motion.button>
          </div>

          {/* Output */}
          <div className="h-40 bg-secondary p-4">
            <h3 className="text-sm font-semibold text-secondary-foreground/70 mb-2">
              {t('output')}:
            </h3>
            <pre className="font-code text-sm text-kiddykode-green whitespace-pre-wrap overflow-y-auto h-24">
              {output || '// Click "Run Code" to see the output here! 👆'}
            </pre>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 bg-card border-t border-border flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToPreviousLesson}
          disabled={currentLessonIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold ${
            currentLessonIndex === 0
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          {t('previousLesson')}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToNextLesson}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-semibold"
        >
          {currentLessonIndex === tutorial.lessons.length - 1 ? t('back') : t('nextLesson')}
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};

export default TutorialLesson;
