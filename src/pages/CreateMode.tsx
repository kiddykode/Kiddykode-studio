import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Play, Save, FolderOpen, Trash2, Download, Leaf, ArrowRight } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { sampleProjects } from '@/data/tutorials';
import { ecoHelperProject } from '@/data/ecoHelperProject';
import { useProgressStore } from '@/stores/progressStore';

const CreateMode = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { saveProject, progress } = useProgressStore();
  const isFrench = i18n.language === 'fr';

  const [code, setCode] = useState(`# Welcome to KiddyKode Studio! 🎉
# Start coding your amazing project here!

print("Hello, World!")
print("I'm learning to code!")
`);
  const [output, setOutput] = useState('');
  const [projectName, setProjectName] = useState('My Project');
  const [showSamples, setShowSamples] = useState(false);

  // Simplified Python interpreter (same as TutorialLesson)
  const runCode = () => {
    try {
      let result = '';
      const lines = code.split('\n');
      const variables: Record<string, any> = {};

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

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
              return variables[trimArg];
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
          continue;
        }

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
                variables[match] !== undefined ? variables[match] : match
              );
              variables[varName] = eval(expr);
            } catch {
              variables[varName] = value;
            }
          }
          continue;
        }

        // Simple for loop
        const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+range\s*\(([^)]+)\)\s*:$/);
        if (forMatch) {
          const varName = forMatch[1];
          const rangeArgs = forMatch[2].split(',').map(a => {
            const trimA = a.trim();
            return variables[trimA] !== undefined ? variables[trimA] : parseInt(trimA);
          });
          
          let start = 0, end = 0, step = 1;
          if (rangeArgs.length === 1) end = rangeArgs[0];
          else if (rangeArgs.length === 2) { start = rangeArgs[0]; end = rangeArgs[1]; }
          else if (rangeArgs.length === 3) { start = rangeArgs[0]; end = rangeArgs[1]; step = rangeArgs[2]; }

          const currentLineIndex = lines.indexOf(line);
          const blockLines: string[] = [];
          for (let i = currentLineIndex + 1; i < lines.length; i++) {
            const nextLine = lines[i];
            if (nextLine.match(/^\s+/) && nextLine.trim()) {
              blockLines.push(nextLine.trim());
            } else if (nextLine.trim()) break;
          }

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
                  if (variables[trimArg] !== undefined) return variables[trimArg];
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
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const handleSave = () => {
    saveProject({ name: projectName, code });
    setOutput('✅ Project saved successfully!');
  };

  const loadSample = (sample: typeof sampleProjects[0]) => {
    setCode(sample.code);
    setProjectName(isFrench ? sample.nameFr : sample.name);
    setShowSamples(false);
  };

  const downloadProject = () => {
    const blob = new Blob([code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}.py`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4">
        <div className="container mx-auto flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex-1">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-transparent text-xl font-bold focus:outline-none focus:border-b-2 focus:border-white/50"
            />
            <p className="text-sm opacity-80">{t('createModeDesc')}</p>
          </div>
        </div>
      </header>

      {/* Guided Projects Section */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-4 border-b border-green-200 dark:border-green-800">
        <div className="container mx-auto">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            {isFrench ? 'Projets Guidés' : 'Guided Projects'}
          </h3>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/create/eco-helper')}
            className="w-full md:w-auto flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border-2 border-green-300 dark:border-green-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl">
                🌍
              </div>
              <div className="text-left">
                <h4 className="font-bold text-foreground">
                  {isFrench ? ecoHelperProject.titleFr : ecoHelperProject.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {isFrench ? ecoHelperProject.subtitleFr : ecoHelperProject.subtitle}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">
                    {isFrench ? 'Intermédiaire' : 'Intermediate'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {ecoHelperProject.estimatedTime}
                  </span>
                </div>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-green-600 dark:text-green-400" />
          </motion.button>
        </div>
      </div>
      {/* Toolbar */}
      <div className="bg-secondary p-3 flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={runCode}
          className="flex items-center gap-2 px-4 py-2 bg-kiddykode-green text-white rounded-xl font-semibold"
        >
          <Play className="w-4 h-4" />
          {t('runCode')}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-semibold"
        >
          <Save className="w-4 h-4" />
          {t('saveProject')}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSamples(!showSamples)}
          className="flex items-center gap-2 px-4 py-2 bg-kiddykode-purple text-white rounded-xl font-semibold"
        >
          <FolderOpen className="w-4 h-4" />
          Samples
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadProject}
          className="flex items-center gap-2 px-4 py-2 bg-kiddykode-cyan text-white rounded-xl font-semibold"
        >
          <Download className="w-4 h-4" />
          Export .py
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOutput('')}
          className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-xl font-semibold"
        >
          <Trash2 className="w-4 h-4" />
          {t('clearOutput')}
        </motion.button>
      </div>

      {/* Sample Projects Panel */}
      {showSamples && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-muted p-4"
        >
          <h3 className="font-bold text-foreground mb-3">Sample Projects</h3>
          <div className="flex flex-wrap gap-2">
            {sampleProjects.map((sample) => (
              <motion.button
                key={sample.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => loadSample(sample)}
                className="px-4 py-2 bg-card rounded-xl text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {isFrench ? sample.nameFr : sample.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Code Editor */}
        <div className="flex-1 min-h-[400px]">
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

        {/* Output Panel */}
        <div className="lg:w-1/3 bg-secondary flex flex-col">
          <div className="p-4 border-b border-sidebar-border">
            <h3 className="font-bold text-secondary-foreground">{t('output')} 📺</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <pre className="font-code text-sm text-kiddykode-green whitespace-pre-wrap min-h-[200px]">
              {output || '// Run your code to see output here! 🚀'}
            </pre>
          </div>
        </div>
      </div>

      {/* Saved Projects */}
      {progress.projectsCreated.length > 0 && (
        <div className="bg-card border-t border-border p-4">
          <h3 className="font-bold text-foreground mb-3">Your Saved Projects</h3>
          <div className="flex flex-wrap gap-2">
            {progress.projectsCreated.map((project) => (
              <motion.button
                key={project.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCode(project.code);
                  setProjectName(project.name);
                }}
                className="px-4 py-2 bg-muted rounded-xl text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                📁 {project.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMode;
