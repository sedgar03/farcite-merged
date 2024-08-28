import React, { useState, useEffect } from 'react';

export const Home = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8080')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to My React App</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
};