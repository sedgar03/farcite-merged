import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';  // Make sure this points to the correct file

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);