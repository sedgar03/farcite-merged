import * as React from "react"
import { cn } from "../@/lib/utils"
import MainContent from './MainContent';
import AssistantPane from './AssistantPane';
import Sidebar from './Sidebar';

interface ComponentProps {
  onAIRequest: (userInput: string) => Promise<any>;
}

export default function Component({ onAIRequest }: ComponentProps) {
  const [isAssistantOpen, setIsAssistantOpen] = React.useState(false)
  const [selectedTool, setSelectedTool] = React.useState("memo")

  const toggleAssistant = () => {
    setIsAssistantOpen(!isAssistantOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        isAssistantOpen={isAssistantOpen}
        selectedTool={selectedTool} 
        setSelectedTool={setSelectedTool} 
        toggleAssistant={toggleAssistant}
      />
      <div className="flex-1 flex">
        <MainContent selectedTool={selectedTool} />
        <AssistantPane isOpen={isAssistantOpen} toggleAssistant={toggleAssistant} />
      </div>
    </div>
  )
}