const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route for vehicle controls page
app.get('/controls', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/controls.html'));
});

// Route for rules of the road page
app.get('/rules', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/rules.html'));
});

// Route for road signs page
app.get('/signs', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signs.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});