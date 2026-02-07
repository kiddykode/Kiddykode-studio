import { useState } from 'react';
import { Play, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MCQCodeBlockProps {
  code: string;
  requiresTerminal?: boolean;
  isFrench: boolean;
}

const MCQCodeBlock = ({ code, requiresTerminal, isFrench }: MCQCodeBlockProps) => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [output, setOutput] = useState<string>('');

  const runCode = () => {
    // Simulate running the code - in real implementation this would connect to a Python executor
    setShowTerminal(true);
    // Simple simulation for display purposes
    setOutput(isFrench ? '▶ Exécutez ce code dans un terminal Python pour voir le résultat!' : '▶ Run this code in a Python terminal to see the output!');
  };

  return (
    <div className="my-4 space-y-2">
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs text-slate-400 font-mono">Python</span>
          {requiresTerminal && (
            <Button
              size="sm"
              variant="ghost"
              onClick={runCode}
              className="h-7 px-2 text-xs text-slate-300 hover:text-white hover:bg-slate-700"
            >
              <Play className="w-3 h-3 mr-1" />
              {isFrench ? 'Essayer' : 'Try it'}
            </Button>
          )}
        </div>
        <pre className="p-4 text-sm font-mono text-green-400 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>

      {showTerminal && (
        <div className="bg-black rounded-lg overflow-hidden border border-slate-700">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
            <Terminal className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-mono">
              {isFrench ? 'Sortie' : 'Output'}
            </span>
          </div>
          <pre className="p-4 text-sm font-mono text-white overflow-x-auto">
            <code>{output}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default MCQCodeBlock;
