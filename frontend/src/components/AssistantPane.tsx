import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { cn } from './utils';
import { Button } from './button';

interface AssistantPaneProps {
  isOpen: boolean;
  toggleAssistant: () => void;
}

const AssistantPane: React.FC<AssistantPaneProps> = ({ isOpen, toggleAssistant }) => {
  const [message, setMessage] = useState<string>('');

  const handleSendRequest = async () => {
    try {
      console.log("Sending request to backend...");
      const backendUrl = `https://${window.location.hostname}:8080/api/hello`;
      // const backendUrl = `https://172.31.196.57:8080/api/hello`;
      console.log("Backend URL:", backendUrl);
      
      const response = await fetch(`${backendUrl}`);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP errror! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received data:", data);
      setMessage(data.message);
    } catch (error) {
      console.error('Error details:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className={cn(
      "flex flex-col bg-background border-r transition-all duration-300 ease-in-out",
      isOpen ? "w-[300px]" : "w-0"
    )}>
      {isOpen && (
        <>
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Assistant</h2>
            <Button variant="ghost" size="icon" onClick={toggleAssistant}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <p>{message}</p>
          </div>
          <div className="p-4 border-t">
            <Button onClick={handleSendRequest} className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssistantPane;
