const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

// Configure the view engine and middleware
router.use(bodyParser.urlencoded({ extended: false }));

// GET route for the login page
router.get('/', (req, res, next) => {
    res.status(200).render("login");
});

// POST route for processing the login form
router.post('/', async (req, res, next) => {
    let payload = req.body;

    // Check if both the username (or email) and password fields have values
    if (req.body.logUsername && req.body.logPassword) {
        // Query the database for a user with the provided username or email address
        let user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        }).catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });

        // If a matching user is found, compare the provided password with the stored hashed password
        if (user != null) {
            let result = await bcrypt.compare(req.body.logPassword, user.password);

            // If the password comparison is successful, log the user in and redirect to the home page
            if (result === true) {
                req.session.user = user;
                return res.redirect('/');
            }
        }

        payload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render("login", payload);
    }

    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("login", payload);
});

module.exports = router;
