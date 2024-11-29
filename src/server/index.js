// Import required libraries and modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');  

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();
const port = process.env.PORT || 8000;  // Use port from environment or fallback to 8000

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Allow requests from the frontend URL, default to localhost:3000
}));

// Middleware to parse JSON in request bodies
app.use(bodyParser.json());

// Middleware to serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Read API key from environment variables
const API_KEY = process.env.API_KEY;
const meaningCloudApiUrl = "https://api.meaningcloud.com/sentiment-2.1";

// Function to call MeaningCloud API for sentiment analysis
const meaningCloud = async (url, key) => {
    const fullUrl = `${meaningCloudApiUrl}?key=${key}&url=${url}&lang=en`;

    try {
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        const { code, msg } = data.status;

        console.log(`Response code: ${code}`);

        // Error handling based on response code
        if (code === 100) {
            return createErrorResponse(100, "Please enter a valid URL.");
        } else if (code === 212) {
            return createErrorResponse(212, msg);
        }

        return createSuccessResponse(data);
    } catch (error) {
        console.error("Error fetching data from MeaningCloud:", error);
        return createErrorResponse(500, "Internal server error.");
    }
};

// Function to create error responses
const createErrorResponse = (code, msg) => ({
    object: null,
    msg,
    code
});

// Function to create success responses
const createSuccessResponse = (data) => {
    const { agreement, confidence, score_tag, subjectivity, irony } = data;

    const object = {
        score_tag,
        agreement,
        subjectivity,
        confidence,
        irony
    };

    return {
        object,
        msg: "success",
        code: 200
    };
};

// Default route to serve the index.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));  // Serve the main HTML file from the dist folder
});

// POST route to handle data requests from the frontend
app.post("/getData", async (req, res) => {
    try {
        const { url } = req.body;  // Extract the URL from the request body
        
        // Call the meaningCloud API with the provided URL and API key
        const meaningCloudResult = await meaningCloud(url, API_KEY);
        
        // Destructure the response from the meaningCloud API
        const { object, msg, code } = meaningCloudResult;

        // Handle different response codes and send the appropriate response to the client
        if (code === 212 || code === 100) {
            // Send a bad request response if the API returns an error code
            return res.status(400).json({ object: null, msg, code });
        }
        
        // Send a success response with the data
        return res.status(200).json({ object, msg, code });
    } catch (error) {
        // Handle unexpected errors and send a generic server error response
        console.error('Error processing request:', error);
        return res.status(500).json({ msg: 'Internal Server Error', error: error.message });
    }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
