import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import { cn } from './utils';
import { Button } from './button';
import { Input } from './input';
import { Avatar, AvatarFallback } from './avatar';

interface AssistantPaneProps {
  isOpen: boolean;
  toggleAssistant: () => void;
}

const AssistantPane: React.FC<AssistantPaneProps> = ({ isOpen, toggleAssistant }) => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: "user", content: input }]);
      setInput("");

      try {
        const response = await fetch('http://localhost:8080/api/send_message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages(prev => [...prev, { role: "assistant", content: data.received_message }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { role: "assistant", content: "Sooorry, there was an error processing your request." }]);
      }
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
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
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
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend} size="icon">
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
