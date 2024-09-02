import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import { getBackendUrl } from '../config/api';

export const Home = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch(getBackendUrl('/api/hello'))
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  // Function to handle AI requests
  const handleAIRequest = async (userInput: string) => {
    try {
      const response = await fetch(getBackendUrl('/api/process_message'), {
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
      return { response: 'Sorry, there was an error processing your request.' };
    }
  };

  return (
    <MainLayout onAIRequest={handleAIRequest} />
  );
};