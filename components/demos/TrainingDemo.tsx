import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProps {
  functionId: string;
}

export const TrainingDemo: React.FC<DemoProps> = ({ functionId }) => {
  const [split, setSplit] = useState(false);
  const [predicting, setPredicting] = useState(false);

  if (functionId === 'train_test_split') {
    const dots = Array.from({ length: 20 }).map((_, i) => i);
    
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <button onClick={() => setSplit(!split)} className="mb-8 px-4 py-2 bg-orange-600 rounded hover:bg-orange-500 transition-colors z-20">
          {split ? "Reset" : "Cut Dataset (80/20)"}
        </button>

        <div className="relative w-96 h-64 bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-hidden">
           {/* The Scissors Line */}
           <motion.div 
             className="absolute top-0 bottom-0 w-1 border-l-2 border-dashed border-yellow-500 z-10"
             initial={{ left: "100%", opacity: 0 }}
             animate={{ left: split ? "80%" : "100%", opacity: split ? 1 : 0 }}
             transition={{ duration: 0.5 }}
           />
           {split && (
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="absolute top-2 right-2 text-xs text-orange-400 font-bold"
             >
                Test Set
             </motion.div>
           )}

           <div className="flex flex-wrap gap-2 content-start">
             {dots.map(i => {
               // If split, items > 15 move to the right slightly and change color
               const isTest = i >= 16; 
               return (
                 <motion.div
                    key={i}
                    layout
                    className={`w-6 h-6 rounded-full ${isTest && split ? 'bg-orange-500' : 'bg-blue-500'} shadow-sm`}
                    animate={{ 
                      x: split && isTest ? 40 : 0,
                    }}
                 />
               )
             })}
           </div>
        </div>
      </div>
    );
  }

  if (functionId === 'confusion_matrix') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="grid grid-cols-2 gap-4 w-64 h-64">
           {/* True Negative */}
           <motion.div 
             className="bg-gray-800 rounded-lg border border-gray-600 flex flex-col items-center justify-center relative overflow-hidden"
             whileHover={{ scale: 1.05 }}
           >
              <span className="text-gray-400 text-xs uppercase mb-1">True Neg</span>
              <span className="text-2xl font-bold text-white">45</span>
              <motion.div 
                className="absolute inset-0 bg-green-500/20"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
           </motion.div>

           {/* False Positive */}
           <motion.div className="bg-gray-800 rounded-lg border border-gray-600 flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-gray-400 text-xs uppercase mb-1">False Pos</span>
              <span className="text-2xl font-bold text-white">3</span>
              <motion.div 
                className="absolute inset-0 bg-red-500/20"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
           </motion.div>

           {/* False Negative */}
           <motion.div className="bg-gray-800 rounded-lg border border-gray-600 flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-gray-400 text-xs uppercase mb-1">False Neg</span>
              <span className="text-2xl font-bold text-white">8</span>
               <motion.div 
                className="absolute inset-0 bg-red-500/20"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
           </motion.div>

           {/* True Positive */}
           <motion.div className="bg-gray-800 rounded-lg border border-gray-600 flex flex-col items-center justify-center relative overflow-hidden">
              <span className="text-gray-400 text-xs uppercase mb-1">True Pos</span>
              <span className="text-2xl font-bold text-white">92</span>
               <motion.div 
                className="absolute inset-0 bg-green-500/20"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
           </motion.div>
        </div>
      </div>
    );
  }

  // --- PREDICT Visualizer ---
  if (functionId === 'predict') {
      const startPrediction = () => {
          setPredicting(true);
          setTimeout(() => setPredicting(false), 2000);
      };

      return (
          <div className="flex flex-col items-center justify-center h-full">
               <button onClick={startPrediction} disabled={predicting} className="mb-12 px-6 py-2 bg-green-600 rounded-full hover:bg-green-500 disabled:opacity-50 transition-all">
                   {predicting ? "Processing..." : "Model.predict(NewData)"}
               </button>

               <div className="flex items-center gap-8">
                   {/* Input Data */}
                   <div className="flex flex-col items-center gap-2">
                       <span className="text-xs text-gray-500">Unseen Data</span>
                       <motion.div 
                          className="w-12 h-12 rounded bg-gray-700 border border-gray-500 flex items-center justify-center text-xl font-bold"
                          animate={predicting ? { x: 100, opacity: 0 } : { x: 0, opacity: 1 }}
                       >
                           ?
                       </motion.div>
                   </div>

                   {/* Model Box */}
                   <div className="w-32 h-32 bg-gray-800 border-2 border-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] relative z-10">
                       <span className="text-blue-400 font-bold">MODEL</span>
                       {predicting && (
                           <motion.div 
                                className="absolute inset-0 bg-blue-500/20" 
                                animate={{ opacity: [0.5, 1, 0.5] }} 
                                transition={{ repeat: Infinity, duration: 0.5 }}
                           />
                       )}
                   </div>

                   {/* Output Data */}
                   <div className="flex flex-col items-center gap-2 w-12">
                       <span className="text-xs text-gray-500">Prediction</span>
                       {predicting && (
                           <motion.div 
                              initial={{ x: -50, opacity: 0, scale: 0 }}
                              animate={{ x: 0, opacity: 1, scale: 1 }}
                              transition={{ delay: 1 }}
                              className="w-12 h-12 rounded-full bg-green-500 border-2 border-green-300 flex items-center justify-center text-white font-bold shadow-lg"
                           >
                               A
                           </motion.div>
                       )}
                   </div>
               </div>
          </div>
      );
  }

  return null;
};