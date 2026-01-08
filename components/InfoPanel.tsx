import React from 'react';
import { FunctionDef } from '../types';
import { Terminal, BookOpen } from 'lucide-react';

interface InfoPanelProps {
  func: FunctionDef;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ func }) => {
  return (
    <div className="h-48 bg-gray-900 border-t border-gray-800 p-6 flex gap-6 shrink-0">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-400 font-semibold uppercase text-xs tracking-wider">
          <BookOpen size={14} />
          函数作用
        </div>
        <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 h-full overflow-y-auto">
          <p className="text-gray-300 text-sm leading-relaxed">
            {func.businessLogic}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-green-400 font-semibold uppercase text-xs tracking-wider">
          <Terminal size={14} />
          代码原型
        </div>
        <div className="p-3 bg-black rounded-lg border border-gray-700 h-full overflow-y-auto font-mono text-sm text-green-400 shadow-inner">
          <code>{func.codePrototype}</code>
        </div>
      </div>
    </div>
  );
};