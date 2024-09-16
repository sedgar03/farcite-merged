import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';

export const Home = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://127.0.0.1:8080')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  // Function to handle AI requests
  const handleAIRequest = async (userInput: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return { response: 'Sorry, THEEEEEER was an error processing your request.' };
    }
  };

  return (
    <MainLayout onAIRequest={handleAIRequest} />
  );
};