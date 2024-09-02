import React, { useState } from 'react';
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
  const [memoContent, setMemoContent] = useState('<p>Start writing your memo here...</p>');

  const renderContent = () => {
    switch (selectedTool) {
      case "memo":
        return <MemoContent content={memoContent} onContentChange={setMemoContent} onAIRequest={onAIRequest} />
      case "citationExplorer":
        return <CitationExplorerContent />
      case "knowledgeGraph":
        return <KnowledgeGraphContent />
      case "networkGraph":
        return <NetworkGraphContent />
      default:
        return <div>Select a tool</div>
    }
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-white shadow-lg">
      <div className="flex items-center p-4 border-b bg-gray-50">
        <Search className="mr-2 h-4 w-4 text-gray-500" />
        <Input className="flex-1 bg-white" placeholder="Search..." />
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px] ml-2 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="favorites">Favorites</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 overflow-auto p-6">
        {renderContent()}
      </div>
    </div>
  )
}

export default MainContent;