import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProps {
  functionId: string;
}

export const LogicDemo: React.FC<DemoProps> = ({ functionId }) => {
  // Sort State
  const [items, setItems] = useState([
    { id: 'a', val: 45, color: 'bg-red-500' },
    { id: 'b', val: 90, color: 'bg-green-500' },
    { id: 'c', val: 12, color: 'bg-blue-500' },
    { id: 'd', val: 67, color: 'bg-yellow-500' },
  ]);

  // GroupBy State
  const [grouped, setGrouped] = useState(false);
  const groupData = [
    { id: 1, cat: 'A', val: 10 },
    { id: 2, cat: 'B', val: 20 },
    { id: 3, cat: 'A', val: 15 },
    { id: 4, cat: 'B', val: 25 },
    { id: 5, cat: 'C', val: 5 },
  ];

  // Concat State
  const [concatenated, setConcatenated] = useState(false);

  // Argmax State
  const [argState, setArgState] = useState<'none' | 'max' | 'sort'>('none');

  // Quantile State
  const [showQuantiles, setShowQuantiles] = useState(false);

  // Reset
  useEffect(() => {
     setItems([
        { id: 'a', val: 45, color: 'bg-red-500' },
        { id: 'b', val: 90, color: 'bg-green-500' },
        { id: 'c', val: 12, color: 'bg-blue-500' },
        { id: 'd', val: 67, color: 'bg-yellow-500' },
     ]);
     setGrouped(false);
     setConcatenated(false);
     setArgState('none');
     setShowQuantiles(false);
  }, [functionId]);

  if (functionId === 'sort_values') {
    const handleSort = () => {
        const sorted = [...items].sort((a, b) => b.val - a.val);
        setItems(sorted);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <button onClick={handleSort} className="mb-8 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 transition-colors">
                Sort Descending
            </button>
            <div className="flex flex-col gap-2 w-64">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            transition={{ type: "spring", stiffness: 60 }}
                            className={`p-4 rounded-lg flex justify-between items-center ${item.color} text-white font-bold shadow-lg`}
                        >
                            <span>ID: {item.id.toUpperCase()}</span>
                            <span className="bg-black/20 px-2 rounded">{item.val}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
  }

  if (functionId === 'groupby') {
      return (
          <div className="flex flex-col items-center justify-center h-full">
              <button onClick={() => setGrouped(!grouped)} className="mb-10 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500 transition-colors">
                  {grouped ? "Ungroup" : "GroupBy('Cat').Sum()"}
              </button>
              
              <div className="relative w-[400px] h-[300px] bg-gray-900/50 rounded-xl border border-gray-700 p-4">
                  {/* Category Buckets */}
                  <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-dashed border-gray-600 rounded flex items-end justify-center pb-2 text-gray-600 font-bold">A</div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 border-2 border-dashed border-gray-600 rounded flex items-end justify-center pb-2 text-gray-600 font-bold">B</div>
                  <div className="absolute bottom-4 right-4 w-24 h-24 border-2 border-dashed border-gray-600 rounded flex items-end justify-center pb-2 text-gray-600 font-bold">C</div>

                  {groupData.map((d, i) => {
                      // Calculate positions
                      let x = 0;
                      let y = i * 40; // Default stack
                      if (grouped) {
                          y = 200; // Bottom of buckets
                          if (d.cat === 'A') x = -130;
                          if (d.cat === 'B') x = 0;
                          if (d.cat === 'C') x = 130;
                          y -= (groupData.filter((g, idx) => g.cat === d.cat && idx < i).length * 30);
                      }

                      return (
                        <motion.div
                            key={d.id}
                            className={`absolute w-32 h-8 bg-blue-500 rounded flex items-center justify-between px-2 text-xs text-white font-bold shadow-md z-10 left-1/2 -ml-16 top-4`}
                            animate={{ x: grouped ? x : 0, y: grouped ? y : i * 50 + 20 }}
                            transition={{ type: "spring", stiffness: 50, damping: 12 }}
                        >
                            <span>{d.cat}</span>
                            <span>{d.val}</span>
                        </motion.div>
                      )
                  })}

                  {/* Aggregates appearing */}
                  {grouped && (
                      <>
                        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.5}} className="absolute bottom-32 left-10 text-green-400 font-bold text-xl glow">Σ 25</motion.div>
                        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.6}} className="absolute bottom-32 left-1/2 -translate-x-4 text-green-400 font-bold text-xl glow">Σ 45</motion.div>
                        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.7}} className="absolute bottom-32 right-10 text-green-400 font-bold text-xl glow">Σ 5</motion.div>
                      </>
                  )}
              </div>
          </div>
      );
  }

  // --- CONCAT Visualizer ---
  if (functionId === 'concat') {
      return (
          <div className="flex flex-col items-center justify-center h-full">
            <button onClick={() => setConcatenated(!concatenated)} className="mb-10 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors">
                {concatenated ? "Reset" : "pd.concat([df1, df2])"}
            </button>
            
            <div className="relative w-64 h-80 flex flex-col items-center">
                 {/* DF 1 */}
                 <motion.div 
                    className="w-full bg-gray-800 border border-gray-600 rounded-t-lg p-4 grid grid-cols-2 gap-2 z-10"
                 >
                     <div className="bg-gray-700 h-8 rounded animate-pulse"></div>
                     <div className="bg-gray-700 h-8 rounded animate-pulse"></div>
                     <div className="bg-gray-700 h-8 rounded animate-pulse"></div>
                     <div className="bg-gray-700 h-8 rounded animate-pulse"></div>
                     <div className="absolute -left-8 top-10 text-gray-500 text-xs">df1</div>
                 </motion.div>

                 {/* Connector */}
                 <motion.div 
                    className="h-8 w-1 bg-green-500"
                    animate={{ height: concatenated ? 0 : 32, opacity: concatenated ? 0 : 1 }}
                 />

                 {/* DF 2 */}
                 <motion.div 
                    className={`w-full bg-gray-800 border border-gray-600 ${concatenated ? 'rounded-b-lg border-t-0' : 'rounded-lg'} p-4 grid grid-cols-2 gap-2`}
                    animate={{ y: concatenated ? -32 : 0 }}
                 >
                     <div className="bg-gray-700 h-8 rounded animate-pulse"></div>
                     <div className="bg-gray-700 h-8 rounded animate-pulse"></div>
                     <div className="absolute -left-8 top-10 text-gray-500 text-xs">df2</div>
                 </motion.div>

                 {concatenated && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-[-60px] top-1/2 text-green-400 font-bold text-xs"
                     >
                         Merged!
                     </motion.div>
                 )}
            </div>
          </div>
      );
  }

  // --- ARGMAX/ARGSORT Visualizer ---
  if (functionId === 'argmax_argsort') {
      const arr = [10, 50, 20, 80, 30];
      // Argmax index = 3 (val 80)
      // Argsort indices (asc) = [0(10), 2(20), 4(30), 1(50), 3(80)]
      
      return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex gap-4 mb-10">
                <button onClick={() => setArgState(argState === 'max' ? 'none' : 'max')} className="px-4 py-2 bg-purple-600 rounded text-xs font-bold">Argmax</button>
                <button onClick={() => setArgState(argState === 'sort' ? 'none' : 'sort')} className="px-4 py-2 bg-pink-600 rounded text-xs font-bold">Argsort</button>
            </div>

            <div className="flex gap-2">
                {arr.map((val, idx) => (
                    <motion.div 
                        key={idx}
                        layout
                        className="flex flex-col items-center gap-2"
                        animate={argState === 'sort' ? { order: val } : { order: 0 }} // Flex order trick for sorting visual? No, framer layout
                    >
                         {/* Index Bubble */}
                         <motion.div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold border 
                                ${argState === 'max' && idx === 3 ? 'bg-purple-500 border-purple-300 text-white scale-125' : 
                                  argState === 'sort' ? 'bg-pink-600 border-pink-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-500'}`}
                         >
                             {idx}
                         </motion.div>

                         {/* Value Bar */}
                         <div className={`w-12 bg-gray-700 rounded-t flex items-end justify-center pb-2 text-white font-bold transition-colors ${argState === 'max' && idx === 3 ? 'bg-purple-900' : ''}`} style={{ height: val * 2 }}>
                             {val}
                         </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center h-8 text-green-400 font-mono">
                {argState === 'max' && "Index 3 is the Max (80)"}
                {argState === 'sort' && "Indices [0, 2, 4, 1, 3] sort the array"}
            </div>
          </div>
      );
  }

  // --- QUANTILE Visualizer ---
  if (functionId === 'quantile') {
      const sortedData = [10, 20, 30, 40, 50, 60, 70, 80];
      
      return (
          <div className="flex flex-col items-center justify-center h-full">
            <button onClick={() => setShowQuantiles(!showQuantiles)} className="mb-10 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500 transition-colors">
                {showQuantiles ? "Hide" : "Show Quantiles (.25, .5, .75)"}
            </button>

            <div className="flex items-end gap-2 h-48 relative px-4">
                 {sortedData.map((val, i) => (
                     <div key={i} className="w-8 bg-gray-700 rounded-t hover:bg-gray-600 transition-colors" style={{ height: val * 2 }}></div>
                 ))}

                 {showQuantiles && (
                     <>
                        {/* 25% Line - Index 1.75 approx between 20 and 30 */}
                        <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="absolute left-[25%] bottom-0 w-0.5 bg-yellow-400 border-r border-dashed border-yellow-200">
                             <span className="absolute -top-6 -left-2 text-xs text-yellow-400 font-bold">25%</span>
                        </motion.div>
                         {/* 50% Line - Index 3.5 approx between 40 and 50 */}
                        <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="absolute left-[50%] bottom-0 w-0.5 bg-yellow-400 border-r border-dashed border-yellow-200">
                             <span className="absolute -top-6 -left-2 text-xs text-yellow-400 font-bold">50%</span>
                        </motion.div>
                         {/* 75% Line - Index 5.25 approx between 60 and 70 */}
                        <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="absolute left-[75%] bottom-0 w-0.5 bg-yellow-400 border-r border-dashed border-yellow-200">
                             <span className="absolute -top-6 -left-2 text-xs text-yellow-400 font-bold">75%</span>
                        </motion.div>
                     </>
                 )}
            </div>
          </div>
      );
  }

  return null;
}