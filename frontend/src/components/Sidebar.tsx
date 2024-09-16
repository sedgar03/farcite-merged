import React from 'react';
import { MessagesSquare, FileText, BookMarked, GitGraph, Network } from "lucide-react"
import { Button } from "./button"

interface SidebarProps {
  isAssistantOpen: boolean;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  toggleAssistant: () => void;
}

function Sidebar({ isAssistantOpen, selectedTool, setSelectedTool, toggleAssistant }: SidebarProps) {
  return (
    <div className="w-[60px] flex flex-col border-r bg-muted/50">
      <div className="flex flex-col items-center py-4 space-y-4">
        <Button 
          variant={isAssistantOpen ? "secondary" : "ghost"} 
          size="icon"
          onClick={toggleAssistant}
        >
          <MessagesSquare className="h-5 w-5" />
        </Button>
        <Button 
          variant={selectedTool === "memo" ? "secondary" : "ghost"} 
          size="icon"
          onClick={() => setSelectedTool("memo")}
        >
          <FileText className="h-5 w-5" />
        </Button>
        <Button 
          variant={selectedTool === "citationExplorer" ? "secondary" : "ghost"} 
          size="icon"
          onClick={() => setSelectedTool("citationExplorer")}
        >
          <BookMarked className="h-5 w-5" />
        </Button>
        <Button 
          variant={selectedTool === "knowledgeGraph" ? "secondary" : "ghost"} 
          size="icon"
          onClick={() => setSelectedTool("knowledgeGraph")}
        >
          <GitGraph className="h-5 w-5" />
        </Button>
        <Button 
          variant={selectedTool === "networkGraph" ? "secondary" : "ghost"} 
          size="icon"
          onClick={() => setSelectedTool("networkGraph")}
        >
          <Network className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;