import React from 'react';
import MemoContent from './MemoContent';
import CitationExplorerContent from './CitationExplorerContent';
import KnowledgeGraphContent from './KnowledgeGraphContent';
import NetworkGraphContent from './NetworkGraphContent';
import { Search } from "lucide-react"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

interface MainContentProps {
  selectedTool: string;
  onAIRequest: (userInput: string) => Promise<any>;
}

const MainContent: React.FC<MainContentProps> = ({ selectedTool, onAIRequest }) => {
  const renderContent = () => {
    switch (selectedTool) {
      case "memo":
        return <MemoContent />
      case "citationExplorer":
        return <CitationExplorerContent />
      case "knowledgeGraph":
        return <KnowledgeGraphContent />
      case "networkGraph":
        return <NetworkGraphContent />
      default:
        return <MemoContent />
    }
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
        <Input className="flex-1" placeholder="Search..." />
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px] ml-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="favorites">Favorites</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4 h-[calc(100vh-73px)] overflow-auto">
        {renderContent()}
      </div>
    </div>
  )
}

export default MainContent;