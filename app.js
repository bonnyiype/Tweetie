// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("./database");
const session = require('express-session');
const middleware = require('./middleware');


// Set up the Express.js application
const app = express();
const port = 3009;


// Start the server and listen on the defined port number
const server = app.listen(port, () => console.log('server listening to port' + port));


// Configure the view engine and views directory
app.set("view engine", "pug");
app.set("views", "views");



// Use middleware to parse incoming request bodies and serve static files
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Set up session middleware. This middleware adds a session object to every incoming request
app.use(session({
     secret: 'your-secret-key',
     resave: false,
     saveUninitialized: true
}));



// Import routes/ Controllers of the MVC Model.The controllers use the models to interact with the database and update the views accordingly.
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logoutRoutes');
const postsApiRoute = require('./routes/api/posts');



// Use routes as middleware for their respective URLs
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/api/posts", postsApiRoute);



// Define the root route handler
app.get('/', middleware.requireLogin, (req, res, next) => {
     // Prepare payload object for rendering the home page
     let payload = {
          pageTitle: "🌐 Tweetie",
          userLoggedIn: req.session.user,
          userLoggedInJs: JSON.stringify(req.session.user)
          
     }
     // Render the home page with the payload data
     res.status(200).render("home", payload)
});
