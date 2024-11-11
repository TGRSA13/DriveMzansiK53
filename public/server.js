const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// Temporary in-memory storage for user session data
let sessionData = {};

// Create the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);  // parse URL with query string support

    // Route: Serve index.html (the quiz page)
    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    // Route: Handle quiz submission and store data in sessionData
    else if (parsedUrl.pathname === '/submit-quiz' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const formData = querystring.parse(body);

            // Store form data in memory as session data
            sessionData = {
                userName: formData.userName,
                quizScore: formData.quizScore,
                quizPercentage: formData.quizPercentage
            };

            // Redirect to the results page
            res.writeHead(302, { 'Location': '/results' });
            res.end();
        });
    }

    // Route: Serve results.html and inject session data into HTML
    else if (parsedUrl.pathname === '/results' && req.method === 'GET') {
        fs.readFile('./results.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading results.html');
            } else {
                // Inject session data into HTML content
                const resultPage = data
                    .replace('{{userName}}', sessionData.userName || 'Guest')
                    .replace('{{quizScore}}', sessionData.quizScore || '0')
                    .replace('{{quizPercentage}}', sessionData.quizPercentage || '0');

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(resultPage);
            }
        });
    }

    // Route: Serve profile page with session data
    else if (parsedUrl.pathname === '/profile' && req.method === 'GET') {
        fs.readFile('./profile.html', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading profile.html');
            } else {
                // Inject session data into HTML content
                const profilePage = data
                    .replace('{{userName}}', sessionData.userName || 'Guest')
                    .replace('{{userScore}}', sessionData.quizScore || '0')
                    .replace('{{quizPercentage}}', sessionData.quizPercentage || '0');

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(profilePage);
            }
        });
    } else {
        // Handle 404 for any other paths
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

