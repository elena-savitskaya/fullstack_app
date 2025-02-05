# 🌐 Fullstack App (MERN Stack)

## 📋 Project Overview
The Fullstack App is a MERN (MongoDB, Express, React, Node.js) web application that demonstrates how to build a full-stack application with user authentication. This project includes both a client-side React application and a server-side Node.js API.

## Project Structure
-**React (Client)** — A JavaScript library for building the front-end.
-**Node.js** — A JavaScript runtime for the server-side application.
-**Express** — A web framework for Node.js for building RESTful APIs.
-**MongoDB** — A NoSQL database used to store data.
-**Mongoose** — MongoDB object modeling for Node.js.
-**bcryptjs** — A library for hashing passwords.
-**jsonwebtoken** — A package to issue and verify JWT (JSON Web Tokens) for user authentication.
-**Materialize CSS** — A front-end framework for responsive design.

## Installation & Setup
Follow the steps below to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/elena-savitskaya/fullstack_app.git
```

```bash
cd fullstack_app
```

### 2. Install Dependencies
Run the following command to install all the required dependencies:

```bash
npm install
```

### 3. Install Client Dependencies
Navigate to the client directory and install the dependencies:

```bash
npm run client:install
```

### 4. Run in Development Mode
To start both the server and the client in development mode (with hot reloading), run:

```bash
npm run dev
```

This will start the Express server and the React client concurrently.

### 5. Run the Server in Production Mode
To start the application in production mode, run:

```bash
npm start
```
This will run the Node.js server with the NODE_ENV set to production.

### 6. Build the Client for Production
To build the React client for production, use the following command:

```bash
npm run client:build
```

### 7. Preview the Production Build
To deploy the app to GitHub Pages, use the following commands:

### Predeploy: Build the React app.

```bash
npm run predeploy
```

### Deploy: Deploy the client build to GitHub Pages.

```bash
npm run deploy
```
