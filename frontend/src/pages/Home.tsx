import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';

export const Home = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  // Function to handle AI requests
  const handleAIRequest = async (userInput: string) => {
    try {
      const response = await fetch('http://localhost:8080/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Sorryyyyy, there was an error processing your request.';
    }
  };

  return (
    <MainLayout onAIRequest={handleAIRequest} />
  );
};