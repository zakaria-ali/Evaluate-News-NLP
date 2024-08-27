# Evaluate News NLP Project

## Project Description

This is a web application that uses the MeaningCloud API to analyze text data from URLs. It features a simple form where users can submit URLs to get insights on the content, including sentiment and subjectivity analysis. The application is built using modern web technologies including JavaScript, SCSS, and Webpack for bundling and development.

## Features

- **Form Submission:** Users can enter a URL and submit it for analysis.
- **API Integration:** Connects with MeaningCloud API to analyze the content of the URL.
- **Responsive Design:** Basic styling with SCSS for a clean and modern look.
- **Service Workers:** Implemented using Workbox for offline capabilities.

## How to Run the App

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/zakaria-ali/Evaluate-News-NLP.git
   cd Evaluate-News-NLP

   ```

2. **Install Dependencies:**

   Ensure you have Node.js installed. Then run:
   npm install

3. **Run the Development Server:**

   Start the development server with:
   npm run build-dev
   This will start the webpack-dev-server and open the application in your default web browser.

4. **Build for Production:**

   To create a production build of the application, run:
   npm run build-prod
   The production build will be placed in the dist folder.

5. **Start the Backend Server:**

   Run the backend server with:
   npm run start

## Dependencies

- **MeaningCloud API Key:** For text analysis.
- **Node.js:** For running the application and its dependencies.
- **npm:** For managing dependencies and running scripts.
- **Webpack:** For bundling and development.
- **SCSS:** For styling the application.
- **Workbox:** For implementing service workers and offline capabilities.
- **Express.js:** For creating the backend server.
- **axios:** For making HTTP requests to the MeaningCloud API.
- **Babel:** For JavaScript transpiling.
- **Cors:** For handling cross-origin requests.
- **dotenv:** For environment variable management.

## Testing

    To run tests, use:
    npm test
    This will execute Jest tests. Make sure you have all necessary test dependencies installed.

## Configuration

    Create a .env file in the root directory with the following content to set your API key:
    API_KEY=your_meaningcloud_api_key
    Replace your_meaningcloud_api_key with your actual API key.

## Project Structure

- **src/**

  - **client/** - Contains the frontend code (JavaScript and SCSS).

    - **index.js** - Entry point for the frontend application.
    - **js/** - JavaScript files for client-side functionality.
    - **styles/** - SCSS files for styling.
    - **views/** - HTML files for views.

  - **server/** - Contains the backend code (JavaScript and SCSS).
    - **index.js** - Entry point for the backend server.

- **webpack.dev.js** - Webpack configuration for development.
- **webpack.prod.js** - Webpack configuration for production.
- **package.json** - Contains project metadata and dependencies.
- **.env** - Environment variables file.
- **.gitignore** - Specifies files and directories to be ignored by Git.
- **.babelrc** - Babel configuration.
- **README.md** - This file.


