# NodeJS
Learning NodeJS

# Microservices vs Monolith - How to build a project

# Software Project Development in the Industry

## Waterfall Model Overview
The Waterfall Model is a sequential software development process that consists of a series of steps. Each step must be completed before moving on to the next. This model is one of the traditional approaches used in the software industry for project development.

### Steps in the Waterfall Model

1. **Requirement**
   - Gather and analyze all project requirements.
   - Document the functional and non-functional requirements.
   - Stakeholders provide input to ensure a clear understanding of the project's needs.
   - **Roles Involved**: Business Analysts, Project Managers, Stakeholders, Product Owners

2. **Design**
   - Create a system and software design based on the requirements.
   - Architectural design: High-level system structure.
   - Detailed design: Specifies how each component will work.
   - **Roles Involved**: Solution Architects, UX/UI Designers, System Designers, Technical Leads

3. **Development**
   - Actual coding of the software begins based on the design documents.
   - Development teams implement functionalities and integrate different modules.
   - **Roles Involved**: Software Developers, Backend/Frontend Developers, Database Administrators, DevOps Engineers

4. **Testing**
   - Perform testing to identify defects and bugs.
   - Different testing methods include unit testing, integration testing, system testing, and acceptance testing.
   - **Roles Involved**: Quality Assurance (QA) Engineers, Testers, Test Leads, Automation Engineers

5. **Deployment**
   - Once testing is successful, the software is deployed to a live environment.
   - The deployment phase includes user training and system configuration.
   - **Roles Involved**: DevOps Engineers, System Administrators, Release Managers, IT Support

6. **Maintenance**
   - Ongoing support for the software post-deployment.
   - Fixing any issues that arise and implementing necessary updates or enhancements.
   - **Roles Involved**: Support Engineers, Maintenance Team, Developers, IT Support, Customer Support

# Project Building Strategies

## Overview
There are two main architectural approaches to building software projects: Monolith and Microservices. Each has its own characteristics, advantages, and challenges. Understanding the parameters that differentiate these architectures is essential for selecting the right approach for a given project.

### 1. Monolith Architecture
- A single unified codebase where all components are interconnected.
- Easier to deploy since the entire application is packaged and released as a single unit.
- Suitable for smaller projects or applications with tightly coupled components.

### 2. Microservices Architecture
- A distributed system where different functionalities are separated into individual services.
- Each service can be developed, deployed, and scaled independently.
- Ideal for large, complex projects where different teams handle different services.

## Comparison Parameters

| Parameter           | Monolith Architecture                                          | Microservices Architecture                                    |
|---------------------|----------------------------------------------------------------|---------------------------------------------------------------|
| **Development Speed** | Faster for small projects; a single codebase is easy to manage. | May be slower initially due to service setup and communication.|
| **Code Repo**         | Single code repository for the entire project.                | Multiple repositories for individual services.                 |
| **Scalability**       | Limited to scaling the entire application.                    | Fine-grained scaling; each service can be scaled independently.|
| **Tech Stack**        | Typically a unified stack across the project.                 | Allows different tech stacks for different services.           |
| **Infra Cost**        | Lower for small projects with simpler requirements.           | Higher due to separate services and infrastructure overhead.   |
| **Complexity**        | Simpler for smaller projects but grows complex with size.     | Higher complexity due to distributed nature and inter-service communication. |
| **Fault Isolation**   | Failures can affect the entire application.                   | Better fault isolation; issues in one service do not impact others.|
| **Testing**           | Easier to perform end-to-end testing in a single environment.  | Requires testing multiple independent services and integration.|
| **Ownership**         | Centralized; a single team usually manages the entire application. | Distributed; different teams can own different services.       |
| **Maintenance**       | Easier for small projects but harder as the project grows.    | More manageable for large projects with well-defined services. |
| **Revamps**           | Difficult to change or refactor large monoliths.              | Easier to revamp individual services without affecting others. |
| **Debugging**         | Easier in a single codebase but can be challenging for large apps. | More difficult due to distributed logging and monitoring.      |
| **Developer Experience** | Easier for small teams working on a single codebase.        | Better for large teams as they can work independently on different services.|

## Conclusion
Choosing between Monolith and Microservices depends on project size, team structure, and specific requirements. Monolith architecture is simpler for smaller projects, while Microservices offer greater flexibility and scalability for larger, complex projects.



### Learning Journey

#### 1. What is Express Framework?
- **Express** is a minimal, flexible, and robust web application framework for Node.js that simplifies server-side development.
- Explored the official website to understand its purpose and features: [Express.js Official Website](https://expressjs.com)

#### 2. Installing Express
- Installed Express in the project using npm:
  ```bash
  npm install express
  ```
- This added the Express framework to the package.json file under dependencies and created the node_modules folder to store the installed packages.

##  3. Understanding Key Files and Folders in a Node.js Project

When working on a Node.js project, several important files and folders are created to manage dependencies, configurations, and project structure. Here’s a breakdown of these key components:

## 1. `node_modules`
- **Description**:
  - The `node_modules` folder contains all the installed npm packages and their dependencies.
  - It is automatically generated when packages are installed using npm.
- **Purpose**:
  - Stores all the libraries and dependencies required by the project.
  - Can be large because it includes every package and sub-dependency specified in the project.
- **Note**:
  - You typically don’t need to manually edit this folder.
  - If deleted, it can be recreated by running `npm install`.

## 2. `package.json`
- **Description**:
  - The `package.json` file acts as the manifest file for a Node.js project, containing metadata such as project name, version, description, author, and dependencies.
- **Key Fields**:
  - `"name"`: The name of the project.
  - `"version"`: The current version of the project.
  - `"description"`: A brief description of the project.
  - `"dependencies"`: Lists npm packages required for the project.
  - `"devDependencies"`: Lists packages needed for development but not in production.
  - `"scripts"`: Defines custom npm commands for running tasks (e.g., `"start": "node app.js"`).
- **Common Commands**:
  - `npm init`: Creates a new `package.json` file.
  - `npm install <package>`: Adds a package to the project’s dependencies.
  - `npm install <package> --save-dev`: Adds a package to `devDependencies`.

## 3. `package-lock.json`
- **Description**:
  - The `package-lock.json` file is automatically generated when npm modifies the `node_modules` tree or `package.json`.
  - Ensures consistent installation of dependencies by locking the versions.
- **Purpose**:
  - Prevents issues caused by updates to dependencies or sub-dependencies.
  - Provides a detailed description of the dependency tree and specific versions installed.

## 4. Other Common Files
- **`.gitignore`**:
  - Specifies files and directories that should be ignored by Git. Commonly used to exclude `node_modules` and other generated files.
- **`README.md`**:
  - A markdown file that serves as documentation for the project, typically including instructions for installation, usage, and contribution.


## server

Created the basic server using Express
```
const express = require("express")
const app = express();
const port = 3000;

app.use("/test", (req, res) => {
    res.send("Server started ")
})

app.use("/main", (req, res) => {
    res.send("another route")
})

app.listen(port, () => {
    console.log("Server started running on port " + port)
})

```

## Understanding the `-g` Flag in `npm install`

## What is `-g` in `npm install`?
The `-g` flag stands for "global" and is used with the `npm install` command to install packages globally on your system, rather than locally within a specific project.

## Local vs. Global Installation

### Local Installation (Default)
- When you run `npm install <package>`, the package is installed locally in the `node_modules` directory of the current project.
- The package is only accessible within that project and is added to the project's `package.json` dependencies.

### Global Installation (`-g` Flag)
- When you run `npm install -g <package>`, the package is installed globally on your system.
- This makes the package accessible from the command line in any directory.
- Global installation is typically used for packages that provide command-line tools (e.g., `npm`, `nodemon`, `eslint`).

## Example Usage
To install a package globally:
```bash
npm install -g <package>
npm install -g nodemon
```


# Routing and Request Handlers

## HTTP Methods

### 1. POST

* Used to create a new resource
* Request body contains the data to be created
* Example: Creating a new user account

### 2. GET

* Used to retrieve a resource
* Request query parameters can be used to filter or sort data
* Example: Retrieving a list of users

### 3. PATCH

* Used to partially update a resource
* Request body contains the changes to be made
* Example: Updating a user's profile information

### 4. DELETE

* Used to delete a resource
* Example: Deleting a user account

### 5. PUT

* Used to replace a resource entirely
* Request body contains the new data
* Example: Updating a user's entire profile information

## Notes

* HTTP methods can be used to perform CRUD (Create, Read, Update, Delete) operations on resources
* Understanding the differences between these methods is crucial for building a robust and scalable backend

## API Testing with Postman

### What is Postman?

* Postman is a popular API testing tool that allows you to send HTTP requests and view responses in a user-friendly interface.

### Why use Postman?

* Postman provides an easy way to test and debug APIs, making it an essential tool for backend development.

### How to use Postman?

* Download and install Postman from the official website
* Create a new request by selecting the HTTP method (e.g., GET, POST, PUT, DELETE) and entering the API endpoint URL
* Add request headers, query parameters, and body data as needed
* Send the request and view the response in the Postman interface

# Advanced Routing in Node.js

## Overview
Routing in Node.js allows you to define how the server responds to various HTTP requests. Advanced routing techniques can be used to create dynamic and flexible routes by using special characters like `+`, `?`, `*`, and regular expressions.

## Special Characters in Routing

### 1. `+` (Plus)
- The `+` character matches one or more occurrences of the preceding character.
- Example:
  ```
  app.get('/ab+c', (req, res) => {
    res.send('Route matched: /ab+c');
  });
  ```

#### The route /ab+c would match:
- /abc
- /abbc
- /abbbc, and so on.

###  `?` (Question Mark)
- The `?` character makes the preceding character optional in an Express route pattern.
- Example:
```
app.get('/ab?c', (req, res) => {
  res.send('Route matched: /ab?c');
});
```
#### This route will match:
- /abc
- /ac (since b is optional).

### `*` (Asterisk)
- The `*` character matches any sequence of characters in an Express route.
- Example:
```
app.get('/a*cd', (req, res) => {
  res.send('Route matched: /a*cd');
});
```
#### This route will match:
- /acd
- /abcd
- /axyzcd, etc.

### Regular Expressions
- Regular expressions (regex) can be used in Express routing to match complex patterns.
- Examples:
```
app.get(/a/, (req, res) => {
  res.send('Route matched any path containing "a"');
});
```
#### This route will match:
- /abc
- /a123
- /123a, etc.


## Middlewares and Error Handlers in Express

## Route Handlers in Express


### Overview
In Express, route handlers are functions that handle requests to a specific endpoint. You can use multiple route handlers for a single route, control the flow with `next`, and even wrap handlers into arrays for better modularity.

### 1. Multiple Route Handlers
- Express allows defining multiple route handlers for a single route. Each handler can execute different logic or perform different tasks before sending a response.
- Example:
  ```javascript
  app.get('/example', (req, res, next) => {
    console.log('First handler');
    next(); // Pass control to the next handler
  }, (req, res) => {
    res.send('Second handler');
  });
  ```
- In the above example:
 - The first handler logs a message and then calls next().
 - The second handler sends a response after the first one completes

## Understanding `next` and `next()` in Express

### Overview
In Express, `next` is a callback function that allows you to control the flow of middleware functions and route handlers. It helps in moving the request to the next middleware or route handler in the stack.

### 1. What is `next`?
- `next` is a function provided by Express, used to pass control to the next middleware function or route handler.
- It must be called within a middleware function for the request to proceed further.
- If not called, the request will be left hanging, and the server won't send a response.

### 2. How to Use `next()`
- **Basic Usage**:
  ```javascript
  app.get('/example', (req, res, next) => {
    console.log('First handler');
    next(); // Passes control to the next middleware function or route handler
  }, (req, res) => {
    res.send('Second handler');
  });
  ```

- In the above example:
 - The first function logs a message and then calls next() to proceed to the next handler.
 - The second function sends a response after the first handler completes

### 3.  Using `next()` to Skip Route Handlers in Express

In Express, you can use the `next()` function to pass control to the next middleware function or route handler. By passing the string `'route'` as an argument to `next()`, you can skip the remaining route handlers for a particular route.

### **How to Use `next('route')` to Skip Handlers**
- When `next('route')` is called, Express will skip the remaining handlers for the current route and move on to the next matching route handler.
- This is useful when certain conditions are met, and you want to bypass specific middleware or handlers.

- **Basic Usage**:
```javascript
app.get('/skip', (req, res, next) => {
  console.log('This handler will be skipped');
  next('route'); // Skips to the next matching route handler
}, (req, res) => {
  res.send('You will not see this response because the handler is skipped');
});

// Next matching route handler
app.get('/skip', (req, res) => {
  res.send('Skipped to this route handler');
});
```
- Here, the second handler will be skipped, and the request will be passed directly to the third handler.

## Middlewares in Express.js

### 1. What is Middleware?
- **Middleware** is a function that has access to the request (`req`), response (`res`), and the next middleware function in the request-response cycle.
- Middleware functions can:
  - Execute any code.
  - Modify the request and response objects.
  - End the request-response cycle by sending a response.
  - Call the next middleware function in the stack using `next()`.

### 2. Why Do We Need Middleware?
- **Modularity**: Middleware helps in separating concerns like authentication, logging, validation, etc., into reusable functions.
- **Pre-processing**: Middleware can be used to modify or check the request before it reaches the route handler.
- **Error Handling**: Middleware is essential for catching errors and handling them gracefully without stopping the application.
- **Authorization/Authentication**: Middleware ensures that only authorized users can access certain routes.
- **Request Logging**: Middleware can log request details for monitoring or debugging.

### 3. How Express.js Handles Middlewares Behind the Scenes
- When an HTTP request is received, Express executes all middleware functions in the order they are defined.
- Each middleware function can:
  - **Pass control** to the next middleware by calling `next()`.
  - **End the request-response cycle** by sending a response.
- Middleware functions are executed sequentially unless `next()` is invoked, which passes control to the next middleware or route handler.
- Behind the scenes, Express creates a **middleware stack** and processes it in order. If `next()` is not called, the request gets stuck and no further processing occurs.

### Example of Middleware Flow
```javascript
const express = require('express');
const app = express();

// Middleware 1: Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});
```
```javascript
// Middleware 2: Authorization Check
//Handle user authentication for all admin routes using middlewares
app.use("/admin", (req, res, next) => {
    const token = "999";
    const isAuthorizedAdmin = token === "999";
    if (!isAuthorizedAdmin) {
        res.status(401).send("Unauthorized Admin")
    } else {
        next();
    }
})
app.get("/admin/getAllData", (req, res) => {
    res.send("All data Generated")
})
app.get("/admin/deleteData", (req, res) => {
    res.send("Data Deleted")
})
app.listen(3000, () => console.log('Server is running on port 3000'));
```
## HTTP Status Codes

HTTP status codes are standard response codes returned by web servers to indicate the result of a client's HTTP request. These codes help both the client and server understand what happened with the request and whether it was successful or encountered an error.

### Categories of HTTP Status Codes:
- **1xx Informational**: The request was received, and the process is continuing.
- **2xx Success**: The request was successfully received, understood, and accepted.
- **3xx Redirection**: Further action is required to complete the request.
- **4xx Client Error**: The request contains bad syntax or cannot be fulfilled.
- **5xx Server Error**: The server failed to fulfill a valid request.

---

### Common HTTP Status Codes

#### **1xx Informational**
- **100 Continue**: The server has received the request headers, and the client should proceed to send the request body.

#### **2xx Success**
- **200 OK**: The request was successful, and the server responded with the requested data.
- **201 Created**: The request was successful, and a new resource was created.
- **204 No Content**: The request was successful, but there is no content to send in the response.

#### **3xx Redirection**
- **301 Moved Permanently**: The resource has been permanently moved to a new URL. All future requests should use the new URL.
- **302 Found**: The resource has been temporarily moved to a different URL, but future requests should still use the original URL.
- **304 Not Modified**: The resource has not been modified since the last request, so the client can use the cached version.

#### **4xx Client Error**
- **400 Bad Request**: The server could not understand the request due to invalid syntax.
- **401 Unauthorized**: The client must authenticate itself to get the requested response.
- **403 Forbidden**: The client does not have permission to access the requested resource.
- **404 Not Found**: The server cannot find the requested resource. This usually occurs when the URL is incorrect.

#### **5xx Server Error**
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.
- **502 Bad Gateway**: The server, acting as a gateway, received an invalid response from the upstream server.
- **503 Service Unavailable**: The server is currently unavailable, usually due to being overloaded or down for maintenance.

---

### How to Use HTTP Status Codes in Express.js
In Express, you can send status codes using `res.status()` followed by the appropriate code:
```javascript
app.get('/example', (req, res) => {
  res.status(200).send('Success');
});

app.get('/error', (req, res) => {
  res.status(404).send('Not Found');
});
```

## Difference Between `app.use()` and `app.all()` in Express.js



| Feature             | `app.use()`                                | `app.all()`                                  |
|---------------------|--------------------------------------------|----------------------------------------------|
| **Purpose**          | Mounts middleware functions or sub-routers to all or specific routes | Matches all HTTP methods (GET, POST, PUT, DELETE, etc.) on a specific route |
| **Path Requirement** | Can be used with or without a path         | Requires a specific path                     |
| **Applies to**       | All HTTP methods by default                | All HTTP methods but only for the defined path |
| **Common Use Case**  | Applying middleware logic across multiple routes or specific paths | Handling all HTTP methods (GET, POST, etc.) on one route |
| **Functionality**    | Middleware is invoked sequentially until the next middleware or route handler is reached | Executes for any HTTP method (GET, POST, PUT, etc.) on the specified path |

---

## Examples

### 1. `app.use()` Example
```javascript
// Middleware applied to all routes
app.use((req, res, next) => {
  console.log('Request received');
  next();
});

// Middleware applied to a specific path
app.use('/user', (req, res, next) => {
  console.log('User path accessed');
  next();
});
```
### 2. `app.all()` Example
```javascript
// Match all HTTP methods on '/about' route
app.all('/about', (req, res) => {
  res.send('This route handles all HTTP methods');
});
```

## Error-Handling Middleware in Express.js

Error-handling middleware in Express is used to catch and manage errors that occur during the processing of requests. It allows the application to respond with appropriate error messages and status codes.

### Defining Error-Handling Middleware
- Error-handling middleware is defined with **four** parameters: `(err, req, res, next)`.
- Express identifies it as an error handler because it includes the `err` parameter as the first argument.

### Example of Error-Handling Middleware
```javascript
// Define error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error details
  res.status(500).send('Something went wrong!'); // Send a 500 Internal Server Error response
});
```





