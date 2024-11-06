import React from 'react'; 
import { createRoot } from 'react-dom/client';
import Greeting from './components/Greeting'; // Import the Greeting component

const App = () => {
    return (
        <div>
            <h1>Hello, React!</h1> {/* A simple React component */}
            <Greeting /> {/* Render the Greeting component */}
        </div>
    );
};

const container = document.getElementById('root'); // Get the container
if (container) {
    const root = createRoot(container); // Create the root
    root.render(<App />); // Render the App component
} else {
    console.error("Target container is not a DOM element.");
}