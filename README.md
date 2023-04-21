# 🌐 Tweetie

## Connect, share, and engage with people from around the world.


This project models social media workflow APP built with Node.js, Express, MongoDB, and Pug for templating. It allows users to register, login, post tweets, like, and retweet.


![image](https://user-images.githubusercontent.com/105000155/233604721-03dbee93-7191-40a4-bcb9-9bf347c0c51f.png)







## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Code Explanation](#code-explanation)

## Installation

1. Make sure you have Node.js and MongoDB installed on your local machine.
2. Clone this repository to your local machine.
3. Run `npm install` in the root directory of the project to install all the required dependencies.
4. Set up your environment variables for the MongoDB connection string (You will need an MongoDB account)
5. Run `node app.js` to start the application.

## Usage

After starting the application, you can visit http://localhost:{port} in your web browser to access the Tweetie.

- Register a new account or login with an existing account.
- Post tweets using the input field.
- Like and retweet other users' tweets.

## File Structure

- app.js: The main entry point of the application.
- middleware.js: Contains custom middleware functions.
- loginRoutes.js: Handles login-related routes.
- registerRoutes.js: Handles registration-related routes.
- logoutRoutes.js: Handles logout-related routes.
- database.js: Handles the connection to MongoDB.
- UserSchema.js: Defines the User schema for MongoDB.
- PostSchema.js: Defines the Post schema for MongoDB.
- posts.js: Contains routes for creating, liking, and retweeting posts.
- common.js: Contains common JavaScript functions used across different files.
- home.js: Contains JavaScript for rendering posts on the home page.

### Pug templates

- home.pug: The main home page template.
- login.pug: The login page template.
- register.pug: The registration page template.
- mixins.pug: Contains Pug mixins used in other templates.
- login-layout.pug: Layout for login and registration pages.
- main-layout.pug: The main layout for all pages in the application.

![image](https://user-images.githubusercontent.com/105000155/233327268-4903020b-7739-42a6-bbf6-328f11a476fb.png)


## Code Explanation

The application is built using the Express framework and follows a typical MVC architecture. The main entry point (app.js) sets up the Express application, connects to the MongoDB database, and includes the necessary routes.

Middleware functions are defined in middleware.js and handle tasks such as user authentication and error handling. The application's routes are organized into separate files (loginRoutes.js, registerRoutes.js, and logoutRoutes.js) to keep the code modular and maintainable.

The User and Post schemas are defined in UserSchema.js and PostSchema.js, respectively, and are used to model the data stored in the MongoDB database. The posts.js file contains the routes for creating, liking, and retweeting posts.

The front-end is built using Pug templates, which are rendered on the server and sent to the client as HTML. JavaScript files like home.js and common.js handle interactions and dynamic content on the front-end.

Overall, the project demonstrates workflow of a socia media APP like Twitter, allowing users to interact with the platform in a similar manner to the real Twitter website.
