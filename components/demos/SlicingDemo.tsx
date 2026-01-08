import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProps {
  functionId: string;
}

export const SlicingDemo: React.FC<DemoProps> = ({ functionId }) => {
  // --- LOC/ILOC Data ---
  const [hoverTarget, setHoverTarget] = useState<'none' | 'row' | 'col' | 'cell'>('none');
  const [targetIdx, setTargetIdx] = useState<number>(-1);

  // --- Query Data ---
  const [queryTriggered, setQueryTriggered] = useState(false);
  const dataPoints = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    val: Math.floor(Math.random() * 100),
    match: false // set later
  }));
  // Deterministic for demo
  dataPoints[0].val = 10; dataPoints[1].val = 60; dataPoints[2].val = 20; dataPoints[3].val = 80;
  dataPoints[4].val = 90; dataPoints[5].val = 15; dataPoints[6].val = 55; dataPoints[7].val = 5;

  // --- Subset Data ---
  const [subsetSelected, setSubsetSelected] = useState(false);

  if (functionId === 'loc_iloc') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
         <div className="mb-6 text-gray-400 text-sm">Hover to simulate selection</div>
         
         <div className="grid grid-cols-4 gap-1 p-4 bg-gray-900 rounded-lg border border-gray-700">
            {/* Header */}
            <div className="w-12"></div>
            {['A', 'B', 'C'].map((col, ci) => (
              <div key={col} className="w-20 h-8 flex items-center justify-center font-bold text-gray-500">{col}</div>
            ))}

            {/* Rows */}
            {[0, 1, 2, 3].map((rowIdx) => (
              <React.Fragment key={rowIdx}>
                {/* Index Label */}
                <div 
                  className="w-12 h-12 flex items-center justify-center font-mono text-gray-500 cursor-pointer hover:text-white"
                  onMouseEnter={() => { setHoverTarget('row'); setTargetIdx(rowIdx); }}
                  onMouseLeave={() => { setHoverTarget('none'); setTargetIdx(-1); }}
                >
                  {rowIdx}
                </div>
                
                {/* Cells */}
                {[0, 1, 2].map((colIdx) => {
                  const isHighlighted = (hoverTarget === 'row' && targetIdx === rowIdx);
                  return (
                    <motion.div
                      key={`${rowIdx}-${colIdx}`}
                      className={`w-20 h-12 rounded border flex items-center justify-center text-sm transition-colors
                        ${isHighlighted ? 'bg-blue-600/50 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-gray-800 border-gray-700 text-gray-400'}
                      `}
                    >
                      {Math.floor(Math.random() * 100)}
                    </motion.div>
                  )
                })}
              </React.Fragment>
            ))}
         </div>
         <div className="mt-4 font-mono text-green-400 h-6">
           {hoverTarget === 'row' ? `df.iloc[${targetIdx}]` : '\u00A0'}
         </div>
      </div>
    );
  }

  if (functionId === 'query') {
    const handleQuery = () => {
      setQueryTriggered(!queryTriggered);
    };

    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="absolute top-10 left-0 right-0 h-1 bg-red-500/30 z-0"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-900 border border-red-500 rounded text-red-200 text-xs z-10">
          Condition: Val &gt; 50
        </div>

        <button onClick={handleQuery} className="mb-12 px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-all z-20">
          {queryTriggered ? "Reset" : "Run Query"}
        </button>

        <div className="flex gap-4 items-end h-64 border-b border-gray-700 pb-2 overflow-hidden px-10">
           <AnimatePresence>
             {dataPoints.map((point) => {
               const passes = point.val > 50;
               if (queryTriggered && !passes) return null; // Filter out

               return (
                 <motion.div
                   key={point.id}
                   layout
                   initial={{ scale: 1, opacity: 1, y: 0 }}
                   animate={{ 
                     backgroundColor: queryTriggered ? '#10B981' : '#3B82F6',
                     y: 0
                   }}
                   exit={{ 
                     y: 100, 
                     opacity: 0, 
                     scale: 0,
                     backgroundColor: '#EF4444' 
                   }}
                   transition={{ type: "spring", bounce: 0.2 }}
                   className="w-12 rounded-t-lg flex items-end justify-center pb-2 text-xs font-bold text-white shadow-lg"
                   style={{ 
                     height: `${point.val * 2}px`, 
                     backgroundColor: '#3B82F6' 
                   }}
                 >
                   {point.val}
                 </motion.div>
               );
             })}
           </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- SUBSET Visualizer ---
  if (functionId === 'subset') {
    const columns = [
        { id: 'col1', name: 'Name', keep: true },
        { id: 'col2', name: 'Age', keep: true },
        { id: 'col3', name: 'Garbage', keep: false },
        { id: 'col4', name: 'Score', keep: true }
    ];

    return (
      <div className="flex flex-col items-center justify-center h-full">
          <button 
             onClick={() => setSubsetSelected(!subsetSelected)} 
             className="mb-10 px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-500 transition-all z-20"
          >
             {subsetSelected ? "Show All Columns" : "Select Subset"}
          </button>

          <div className="flex gap-2 p-4 border border-gray-700 rounded-xl bg-gray-900/50">
             <AnimatePresence mode="popLayout">
                 {columns.map((col) => {
                     // If selected mode is on and column is not kept, hide it
                     if (subsetSelected && !col.keep) return null;

                     return (
                         <motion.div
                             layout
                             key={col.id}
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 0, width: 0 }}
                             transition={{ type: "spring", damping: 20, stiffness: 100 }}
                             className={`w-24 h-48 rounded-lg flex flex-col items-center border ${subsetSelected ? 'border-green-500 bg-green-900/20' : 'border-gray-600 bg-gray-800'}`}
                         >
                             <div className={`w-full py-2 text-center text-sm font-bold border-b ${subsetSelected ? 'border-green-500 text-green-300' : 'border-gray-600 text-gray-400'}`}>
                                 {col.name}
                             </div>
                             <div className="flex-1 w-full p-2 space-y-2">
                                 <div className="h-2 w-3/4 bg-gray-700/50 rounded"></div>
                                 <div className="h-2 w-1/2 bg-gray-700/50 rounded"></div>
                                 <div className="h-2 w-full bg-gray-700/50 rounded"></div>
                             </div>
                         </motion.div>
                     );
                 })}
             </AnimatePresence>
          </div>
      </div>
    );
  }

  return null;
}