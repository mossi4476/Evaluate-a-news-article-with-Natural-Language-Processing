# Evaluate a News Article with Natural Language Processing

This project leverages Natural Language Processing (NLP) techniques to evaluate and analyze news articles. The application uses sentiment analysis to assess various attributes of the text such as sentiment score, subjectivity, agreement, and irony.

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Server](#server)
  - [Client](#client)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow the steps below to get started with this project locally.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (Version 14 or above)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

Clone the repository:

```bash
git clone https://github.com/mossi4476/Evaluate-a-news-article-with-Natural-Language-Processing.git
cd Evaluate-a-news-article-with-Natural-Language-Processing
```
Install the dependencies:
```bash
npm install --legacy-peer-deps
```

### Running the Project

#### Server Side (Backend)
To run the server on a development environment:
```bash
npm run start
```
This will start the server at [http://localhost:8000](http://localhost:8000).

#### Client Side (Frontend)
To run the client-side application:
```bash
npm run build-dev
```
You can now access the application in your browser at:
[http://localhost:3000/](http://localhost:3000/)

## Technologies Used
**Backend:**
- Node.js
- Express.js
- MeaningCloud API (for sentiment analysis)
- CORS handling

**Frontend:**
- HTML, CSS, JavaScript
- Bootstrap
- Typewriter Effect
- Webpack (for bundling and development server)

## Contributing
If you'd like to contribute to this project, feel free to fork the repository, make your changes, and create a pull request.

Make sure to follow the code style and add tests for any new features or changes.