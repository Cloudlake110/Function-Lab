import React from 'react';
import { FunctionDef } from '../types';
import { CleaningDemo } from './demos/CleaningDemo';
import { SlicingDemo } from './demos/SlicingDemo';
import { EngineeringDemo } from './demos/EngineeringDemo';
import { LogicDemo } from './demos/LogicDemo';
import { TrainingDemo } from './demos/TrainingDemo';

interface VisualizerProps {
  func: FunctionDef;
}

export const Visualizer: React.FC<VisualizerProps> = ({ func }) => {
  return (
    <div className="flex-1 bg-gray-950 relative overflow-hidden flex flex-col">
       {/* Canvas Header */}
       <div className="absolute top-4 left-6 z-10">
         <h2 className="text-2xl font-bold text-white opacity-90">{func.name}</h2>
         <p className="text-blue-400 text-sm">{func.description}</p>
       </div>

       {/* Canvas Area */}
       <div className="flex-1 relative">
         <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
           {/* Background Grid/Decorations */}
           <div className="w-[800px] h-[800px] border border-gray-700 rounded-full"></div>
           <div className="w-[600px] h-[600px] border border-gray-700 rounded-full absolute"></div>
         </div>

         {/* Dynamic Content */}
         <div className="relative z-10 w-full h-full">
            {func.category === 'Cleaning' && <CleaningDemo functionId={func.id} />}
            {func.category === 'Slicing' && <SlicingDemo functionId={func.id} />}
            {func.category === 'Engineering' && <EngineeringDemo functionId={func.id} />}
            {func.category === 'Logic' && <LogicDemo functionId={func.id} />}
            {func.category === 'Training' && <TrainingDemo functionId={func.id} />}
         </div>
       </div>
    </div>
  );
};
