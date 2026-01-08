import React from 'react';
import { FUNCTIONS } from '../constants';
import { FunctionDef, FunctionCategory } from '../types';
import { 
  Beaker, 
  Scissors, 
  Wrench, 
  GitMerge, 
  BrainCircuit,
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

const CATEGORIES: { id: FunctionCategory; icon: React.ReactNode }[] = [
  { id: 'Cleaning', icon: <Beaker size={18} /> },
  { id: 'Slicing', icon: <Scissors size={18} /> },
  { id: 'Engineering', icon: <Wrench size={18} /> },
  { id: 'Logic', icon: <GitMerge size={18} /> },
  { id: 'Training', icon: <BrainCircuit size={18} /> },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeId, onSelect }) => {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-full flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
          Function Lab
        </h1>
        <p className="text-xs text-gray-500 mt-1">Core Function Interactive V1.0</p>
      </div>

      <div className="flex-1 py-4">
        {CATEGORIES.map((cat) => {
          const catFunctions = FUNCTIONS.filter(f => f.category === cat.id);
          if (catFunctions.length === 0) return null;

          return (
            <div key={cat.id} className="mb-6">
              <div className="px-4 mb-2 flex items-center gap-2 text-gray-400 uppercase text-xs font-bold tracking-wider">
                {cat.icon}
                <span>{cat.id}</span>
              </div>
              <ul className="space-y-1">
                {catFunctions.map((func) => (
                  <li key={func.id}>
                    <button
                      onClick={() => onSelect(func.id)}
                      className={`w-full text-left px-6 py-2 text-sm flex items-center justify-between transition-colors relative
                        ${activeId === func.id 
                          ? 'text-white bg-gray-800/50 border-r-2 border-blue-500' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                        }`}
                    >
                      <span>{func.name}</span>
                      {activeId === func.id && (
                        <ChevronRight size={14} className="text-blue-500" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
