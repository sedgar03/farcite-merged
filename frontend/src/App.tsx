import React from 'react';
import { TooltipProvider } from './components/tooltip';
import MainLayout from './components/MainLayout';
import './styles/globals.css';  // Make sure this points to the correct file

function App() {
  const handleAIRequest = async (userInput: string): Promise<any> => {
    // Implement AI request logic here
    // For now, return a dummy promise
    return Promise.resolve({ response: "AI response" });
  };

  return (
    <TooltipProvider>
      <div className="App">
        <MainLayout onAIRequest={handleAIRequest} />
      </div>
    </TooltipProvider>
  );
}

export default App;