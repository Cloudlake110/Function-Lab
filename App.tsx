import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { InfoPanel } from './components/InfoPanel';
import { Visualizer } from './components/Visualizer';
import { FUNCTIONS } from './constants';

function App() {
  const [activeFunctionId, setActiveFunctionId] = useState<string>(FUNCTIONS[0].id);

  const activeFunc = FUNCTIONS.find(f => f.id === activeFunctionId) || FUNCTIONS[0];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-gray-100 font-sans">
      {/* Left Sidebar */}
      <Sidebar 
        activeId={activeFunctionId} 
        onSelect={setActiveFunctionId} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* Top: Visualization Canvas */}
        <Visualizer func={activeFunc} />

        {/* Bottom: Info Panel */}
        <InfoPanel func={activeFunc} />
        
      </div>
    </div>
  );
}

export default App;
