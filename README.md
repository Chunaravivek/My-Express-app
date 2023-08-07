# Node Js Rest Api Demo

This is default node project that can be use to start any new project with nodejs as backend.

# Node.js with OOP Design Patterns

In this section, we will explore how to structure the Node.js REST API project using Object-Oriented Programming (OOP) design patterns. Applying OOP principles to your Node.js express application can help inheritance, enhance modularity, reusability, and maintainability.

# Folder structure for a Node.js with express application api project

- app
  - configs
  - controllers
  - middlewares
  - models
  - routes
  - utils
- logs
- public

## Getting Started

In this demo project i have used all required modules, list of modules are as below :

- NPM Libraries
  <!-- - Nodemon for Debugging and keeping track of changed files -->
  - Express for initiating the server
  - Mongoose for interracting with MongoDB
  - Morgan for Rest Api Access Log
  - Dotenv for storing environment variable (Can be used in development mode only)
  - Winston for logs
  - Helmet for security headers
  - Compression for compression codings (gzip,deflate)
  - Swagger-Ui-Express for API documentation
  - JsonWebToken for Security
  - Express-async-errors : to handle async errors

### Prerequisites

List of things that should pre-installed on your pc :

- Nodejs v18.16.0
- NPM 9.5.1
- MongoDB server version:7.4.1
- Any IDE (VS Code Recommended)

### Installation

```
git clone https://github.com/Chunaravivek/My-Express-app.git
cd My-Express-app
npm install --legacy-peer-deps
npm start
```

### Test Running Server

Once Server started you can verify id by visiting below url :

```
http://localhost:3000/api/
```

On visiting above url you should get message :

```
Welcome to Admin Panel
```

### API Documentation (Open API)

Once node server started you can visit below url to access api documentation :

```
http://localhost:3000/v2/api-docs
```

## Author

- **Vivek Chunara**
