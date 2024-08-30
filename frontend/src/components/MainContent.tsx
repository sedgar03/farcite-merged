import React, { useState } from 'react';
import MemoContent from './MemoContent';
import CitationExplorerContent from './CitationExplorerContent';
import KnowledgeGraphContent from './KnowledgeGraphContent';
import NetworkGraphContent from './NetworkGraphContent';
import { Search } from "lucide-react"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Button } from "./button"

interface MainContentProps {
  selectedTool: string;
  onAIRequest: (userInput: string) => Promise<any>;
}

const MainContent: React.FC<MainContentProps> = ({ selectedTool, onAIRequest }) => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ user: string; message: string }>>([]);

  const handleSendMessage = async () => {
    if (chatInput.trim() === '') return;

    // Add user message to chat
    setChatMessages(prev => [...prev, { user: 'You', message: chatInput }]);

    // Send message to backend
    const response = await onAIRequest(chatInput);

    // Add AI response to chat
    setChatMessages(prev => [...prev, { user: 'AI', message: response.response }]);

    // Clear input
    setChatInput('');
  };

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
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.user === 'You' ? 'text-right' : 'text-left'}`}>
                  <span className="font-bold">{msg.user}: </span>
                  <span>{msg.message}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 mr-2"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Search className="mr-2 h-4 w-4 text-muted-foreground" />
        <Input className="flex-1" placeholder="Enter DOI..." />
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