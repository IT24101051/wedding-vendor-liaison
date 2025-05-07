
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Error boundary for the application
const renderApp = () => {
  try {
    console.log("Initializing application with Java backend...");
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error("Root element not found!");
      return;
    }
    
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("Application initialized successfully");
  } catch (error) {
    console.error("Failed to initialize the application:", error);
    
    // Display a fallback UI on error
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: sans-serif;">
          <h2>Application Error</h2>
          <p>We're sorry, but the application failed to load. Please try refreshing the page.</p>
          <p>Error details: ${error instanceof Error ? error.message : String(error)}</p>
          <button onclick="location.reload()" style="padding: 8px 16px; margin-top: 20px;">Reload Page</button>
        </div>
      `;
    }
  }
};

// Initialize the application
renderApp();
