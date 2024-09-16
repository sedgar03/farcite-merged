import React from 'react';
import MainLayout from './components/MainLayout';

function App() {
  const handleAIRequest = async (userInput: string): Promise<any> => {
    // Implement AI request logic here
    // For now, return a dummy promise
    return Promise.resolve({ response: "AI response" });
  };

  return (
    <div className="App">
      <MainLayout onAIRequest={handleAIRequest} />
    </div>
  );
}

export default App;