
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Initialize the application with the Java backend
console.log("Initializing application with Java backend...");

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
