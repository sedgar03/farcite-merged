import React, { useState } from 'react';
import AssistantPane from './AssistantPane';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

interface MainLayoutProps {
  onAIRequest: (userInput: string) => Promise<any>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onAIRequest }) => {
  const [selectedTool, setSelectedTool] = useState('memo');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const toggleAssistant = () => setIsAssistantOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isAssistantOpen={isAssistantOpen}
        selectedTool={selectedTool} 
        setSelectedTool={setSelectedTool} 
        toggleAssistant={toggleAssistant}
      />
      <MainContent selectedTool={selectedTool} onAIRequest={onAIRequest} />
      <AssistantPane isOpen={isAssistantOpen} toggleAssistant={toggleAssistant} />
    </div>
  );
};

export default MainLayout;