import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot

const App = () => {
    return <h1>Hello, React!</h1>; // Simple message for testing
};

// Get the DOM element
const container = document.getElementById('root');
if (container) { // Check if the container exists
    const root = createRoot(container); // Create a root for the React app
    root.render(<App />); // Render the app
} else {
    console.error("Target container is not a DOM element."); // Log an error if the container is not found
}