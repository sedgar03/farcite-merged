import React, { useState } from 'react';
import { MessagesSquare, FileText, BookMarked, GitGraph, Network, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

interface SidebarProps {
  isAssistantOpen: boolean;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  toggleAssistant: () => void;
}

function Sidebar({ isAssistantOpen, selectedTool, setSelectedTool, toggleAssistant }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const tools = [
    { id: "assistant", name: "Assistant", icon: MessagesSquare, onClick: toggleAssistant },
    { id: "memo", name: "Memo", icon: FileText, onClick: () => setSelectedTool("memo") },
    { id: "citationExplorer", name: "Citations", icon: BookMarked, onClick: () => setSelectedTool("citationExplorer") },
    { id: "knowledgeGraph", name: "Knowledge", icon: GitGraph, onClick: () => setSelectedTool("knowledgeGraph") },
    { id: "networkGraph", name: "Network", icon: Network, onClick: () => setSelectedTool("networkGraph") },
  ];

  return (
    <div className={`flex flex-col border-r bg-muted/50 transition-all duration-300 ${isExpanded ? 'w-48' : 'w-[60px]'}`}>
      <div className="flex flex-col items-center py-4 space-y-4">
        {tools.map((tool) => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button 
                variant={(tool.id === "assistant" && isAssistantOpen) || tool.id === selectedTool ? "secondary" : "ghost"}
                size={isExpanded ? "default" : "icon"}
                onClick={tool.onClick}
                className={isExpanded ? "w-full justify-start" : ""}
              >
                <tool.icon className={`h-5 w-5 ${isExpanded ? 'mr-2' : ''}`} />
                {isExpanded && <span>{tool.name}</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{tool.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleExpand} 
        className="mt-auto mb-4 self-center"
      >
        {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export default Sidebar;