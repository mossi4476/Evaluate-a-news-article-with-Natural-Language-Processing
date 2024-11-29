// Import libraries
import { checkForUrl } from './urlChecker';  // Assuming you have a module to validate the URL
import Typewriter from 'typewriter-effect/dist/core';

// Define the backend server URL
const serverURL = 'http://localhost:8000/getData';  // Change this to match your backend API endpoint

// Get references to DOM elements
const form = document.getElementById('urlForm');
const errorMsg = document.getElementById('errorMsg');
const loader = document.getElementById('loader');
const loaderText = new Typewriter('#results', { loop: true });

// Event listener for form submission
form.addEventListener('submit', handleSubmit);

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const urlText = document.getElementById('url').value;

    // Validate the URL
    if (!checkForUrl(urlText)) {
        showErrors('Please insert a valid URL!');
        return;
    }

    // If URL is valid, proceed to fetch data from the backend
    hideErrors();
    showLoader(true);
    startLoaderText('........');

    const body = { url: urlText };

    try {
        const response = await fetch(serverURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        // Handle failed response
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const { object, msg, code } = await response.json();

        // Check the response code and display the result accordingly
        if (code === 200) {
            showSuccess(object);
        } else {
            showErrors(msg);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        handleError();
    }
}

// Function to display errors
function showErrors(errorText = '') {
    if (errorText) {
        errorMsg.innerHTML = errorText;
    }
    errorMsg.classList.remove('hidden');
}

// Function to hide error messages
function hideErrors() {
    errorMsg.classList.add('hidden');
}

// Function to display or hide the loader
function showLoader(show) {
    loader.style.display = show ? 'flex' : 'none';
}

// Function to start the loader text animation
function startLoaderText(text) {
    loaderText.typeString(text).start();
}

// Function to stop the loader text animation and reset
function stopLoaderText() {
    loaderText.stop();
    loaderText.deleteAll(20).start();
    loaderText.options.loop = false;
}

// Function to display the success data
function showSuccess(object) {
    hideErrors();
    showLoader(false);
    stopLoaderText();

    const textToShow = `
        Agreement: ${object.agreement}<br>
        Subjectivity: ${object.subjectivity}<br>
        Confidence: ${object.confidence}<br>
        Irony: ${object.irony}<br>
        Score Tag: ${object.score_tag}
    `;

    loaderText.options.delay = 40;
    loaderText.typeString(textToShow).start();
}

// Function to handle errors during fetch
function handleError() {
    showLoader(false);
    stopLoaderText();
}
