// results.js

// Function to save test results in localStorage
function saveTestResult(score, percentage) {
    const pastResults = JSON.parse(localStorage.getItem('testResults')) || [];
    
    const newResult = {
        date: new Date().toLocaleDateString(),
        score: score,
        percentage: percentage
    };

    pastResults.push(newResult);
    localStorage.setItem('testResults', JSON.stringify(pastResults));
}

// Function to display test results
function displayTestResults() {
    const pastResults = JSON.parse(localStorage.getItem('testResults')) || [];
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous content

    if (pastResults.length === 0) {
        resultsContainer.innerHTML = '<p>No test results found.</p>';
    } else {
        pastResults.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `<p>Date: ${result.date} - Score: ${result.score}/9 - Percentage: ${result.percentage.toFixed(2)}%</p>`;
            resultsContainer.appendChild(resultElement);
        });
    }
}

// Call this function on the profile or results page to show results
document.addEventListener('DOMContentLoaded', function() {
    displayTestResults();
});

// Link back to start test
document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.createElement('a');
    backButton.href = 'index.html'; // Assuming your home page is index.html
    backButton.innerText = 'Start Test Again';
    backButton.className = 'start-test-button'; // Add a class for styling
    document.body.appendChild(backButton);
});
