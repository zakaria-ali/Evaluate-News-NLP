// Import the URL validation function
import { validateURL } from './urlValidator'

const serverURL = 'http://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is not blank
    if (!formText) {
        alert("Please enter a URL");
        return;
    }

    // Validate the URL
    if (!validateURL(formText)) {
        alert('Please enter a valid URL.');
        return;
    }

    // Send the URL to the server
    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formText }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response and display it on the page
            document.getElementById('results').innerHTML = `
            <p>Sentiment: ${data.score_tag}</p>
            <p>Agreement: ${data.agreement}</p>
            <p>Subjectivity: ${data.subjectivity}</p>
            <p>Confidence: ${data.confidence}</p>
            <p>Irony: ${data.irony}</p>
        `;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error processing your request.');
        });
}


// Export the handleSubmit function
export { handleSubmit };

