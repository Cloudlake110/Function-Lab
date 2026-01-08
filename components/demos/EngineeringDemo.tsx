import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProps {
  functionId: string;
}

export const EngineeringDemo: React.FC<DemoProps> = ({ functionId }) => {
  const [transformed, setTransformed] = useState(false);

  // --- LABEL ENCODER ---
  const labels = ['Cat', 'Dog', 'Cat', 'Bird'];
  const encoded = [0, 1, 0, 2];

  // --- SCALER ---
  const rawValues = [1000, 50, 500, 100];
  const scaledValues = [1.0, 0.0, 0.5, 0.1]; // Approx

  // --- SOFTMAX ---
  const logits = [2.0, 1.0, 0.1];
  const probs = [0.7, 0.2, 0.1]; // Simplified

  // --- RESAMPLE ---
  const minorityClass = [1];
  const majorityClass = [1, 2, 3, 4, 5];

  const toggle = () => setTransformed(!transformed);

  if (functionId === 'label_encoder') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <button onClick={toggle} className="mb-10 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 transition-colors">
          {transformed ? "Inverse Transform" : "Fit Transform"}
        </button>

        <div className="flex gap-4">
          {labels.map((lbl, idx) => (
            <motion.div
              key={idx}
              className="w-20 h-20 rounded-lg flex items-center justify-center text-xl font-bold shadow-lg border border-gray-600 bg-gray-800 relative overflow-hidden"
            >
              {/* Text Label */}
              <motion.div
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: transformed ? -50 : 0, opacity: transformed ? 0 : 1 }}
                className="absolute text-blue-300"
              >
                {lbl}
              </motion.div>

              {/* Number Label */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: transformed ? 0 : 50, opacity: transformed ? 1 : 0 }}
                className="absolute text-green-400 font-mono text-3xl"
              >
                {encoded[idx]}
              </motion.div>

              {/* Stamp Effect */}
              {transformed && (
                <motion.div
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: [2, 1, 1.5], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 border-4 border-green-500 rounded-lg flex items-center justify-center"
                >
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (functionId === 'minmax_scaler' || functionId === 'apply' || functionId === 'fit_transform') {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <button onClick={toggle} className="mb-10 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 transition-colors">
          {functionId === 'apply' ? "Apply x/1000" : (functionId === 'fit_transform' ? "Fit & Transform" : "MinMaxScaler")}
        </button>

        <div className="flex items-end gap-6 h-64 border-l border-b border-gray-600 p-4 relative">
            {/* Axis Labels */}
            <motion.div 
                className="absolute -left-12 top-0 text-xs text-gray-400"
                animate={{ opacity: transformed ? 1 : 0 }}
            >1.0</motion.div>
            <motion.div 
                className="absolute -left-12 top-0 text-xs text-gray-400"
                animate={{ opacity: transformed ? 0 : 1 }}
            >1000</motion.div>

            {/* Fit Scanner Line */}
            {functionId === 'fit_transform' && !transformed && (
                 <motion.div 
                    initial={{ bottom: 0, opacity: 0 }}
                    animate={{ bottom: "100%", opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute left-0 right-0 h-1 bg-green-400/50 shadow-[0_0_10px_#4ade80]"
                 />
            )}

            {rawValues.map((val, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <motion.div
                        className="w-16 bg-gradient-to-t from-blue-900 to-blue-500 rounded-t-sm relative group"
                        initial={{ height: val / 5 }} // Scale down for pixels
                        animate={{ height: transformed ? scaledValues[i] * 200 : val / 5 }}
                        transition={{ type: "spring", stiffness: 100, delay: functionId === 'fit_transform' ? 0.5 : 0 }}
                    >
                         <div className="absolute -top-6 w-full text-center text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                             {transformed ? scaledValues[i] : val}
                         </div>
                    </motion.div>
                    <div className="text-gray-500 text-xs">idx_{i}</div>
                </div>
            ))}

            {/* Apply Beam */}
            {functionId === 'apply' && transformed && (
                <motion.div
                    className="absolute top-0 bottom-0 w-2 bg-yellow-400/50 shadow-[0_0_20px_#FBBF24]"
                    initial={{ left: 0 }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 1.5, ease: "linear" }}
                />
            )}
        </div>
      </div>
    );
  }

  // --- SOFTMAX Visualizer ---
  if (functionId === 'softmax') {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <button onClick={toggle} className="mb-10 px-4 py-2 bg-purple-600 rounded hover:bg-purple-500 transition-colors">
                {transformed ? "Reset" : "Compute Softmax"}
            </button>
            
            <div className="flex gap-8 items-end h-64 border-b border-gray-600 px-8">
                {logits.map((val, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-16">
                        <div className="text-sm font-bold mb-2 text-gray-300">
                             <AnimatePresence mode='wait'>
                                {transformed 
                                    ? <motion.span key="prob" initial={{opacity:0}} animate={{opacity:1}} className="text-green-400">{probs[i]}</motion.span>
                                    : <motion.span key="logit" initial={{opacity:0}} animate={{opacity:1}}>{val}</motion.span>
                                }
                             </AnimatePresence>
                        </div>
                        <motion.div 
                            className={`w-full rounded-t-lg ${transformed ? 'bg-green-600' : 'bg-gray-600'}`}
                            animate={{ height: transformed ? probs[i] * 200 : val * 50 }}
                            transition={{ type: "spring", stiffness: 80 }}
                        />
                        <div className="text-xs text-gray-500">C{i}</div>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-xs text-gray-500">
                {transformed ? "Sum = 1.0 (Probabilities)" : "Raw Logits"}
            </div>
        </div>
    );
  }

  // --- FIT_RESAMPLE Visualizer ---
  if (functionId === 'fit_resample') {
      return (
          <div className="flex flex-col items-center justify-center h-full">
            <button onClick={toggle} className="mb-10 px-4 py-2 bg-pink-600 rounded hover:bg-pink-500 transition-colors">
                {transformed ? "Reset" : "Fit Resample (Oversampling)"}
            </button>
            
            <div className="flex gap-12 bg-gray-900 p-8 rounded-xl border border-gray-700">
                {/* Majority Class */}
                <div className="flex flex-col items-center gap-2">
                    <div className="text-blue-400 font-bold mb-2">Majority (Class 0)</div>
                    <div className="grid grid-cols-2 gap-2">
                        {majorityClass.map(i => (
                            <motion.div key={i} className="w-8 h-8 rounded-full bg-blue-600" />
                        ))}
                    </div>
                </div>

                {/* Minority Class */}
                <div className="flex flex-col items-center gap-2">
                    <div className="text-pink-400 font-bold mb-2">Minority (Class 1)</div>
                    <div className="grid grid-cols-2 gap-2">
                        {/* Original */}
                        {minorityClass.map(i => (
                            <motion.div key={i} className="w-8 h-8 rounded-full bg-pink-600 border-2 border-white" />
                        ))}
                        {/* Clones */}
                        {transformed && [2, 3, 4, 5].map(i => (
                             <motion.div 
                                key={i} 
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.7 }}
                                transition={{ delay: i * 0.1 }}
                                className="w-8 h-8 rounded-full bg-pink-600 border-2 border-dashed border-pink-300" 
                             />
                        ))}
                    </div>
                </div>
            </div>
          </div>
      );
  }

  return null;
}