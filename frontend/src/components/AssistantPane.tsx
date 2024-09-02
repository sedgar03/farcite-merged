import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback } from './avatar';

interface AssistantPaneProps {
  isOpen: boolean;
  toggleAssistant: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AssistantPane: React.FC<AssistantPaneProps> = ({ isOpen, toggleAssistant }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: Message = { role: "user", content: input };
      setMessages(prev => [...prev, userMessage]);
      setInput("");

      try {
        const backendUrl = `https://${window.location.hostname}:8080/api/process_message`;
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage: Message = { role: "assistant", content: data.processed_message };
        setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: Message = {
          role: "assistant",
          content: "Sorry, there was an error processing your request."
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const startResizing = (e: React.MouseEvent) => {
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      setWidth(Math.max(200, Math.min(600, newWidth)));
    }
  };

  const stopResizing = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-white shadow-lg transition-all duration-300 ease-in-out border-l",
        isOpen ? "w-96" : "w-0"
      )}
    >
      {isOpen && (
        <>
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Assistant</h2>
            <Button variant="ghost" size="icon" onClick={toggleAssistant}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 text-sm",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[80%]",
                    message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <Input
                className="flex-1 bg-white"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} size="icon" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssistantPane;
