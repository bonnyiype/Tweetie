const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const User = require('../schemas/UserSchema');

// Configure the view engine and middleware
router.use(bodyParser.urlencoded({ extended: false }));

// GET route for the registration page
router.get('/', (req, res, next) => {
    res.status(200).render("register");
});

// POST route for processing the registration form
router.post('/', async (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName.trim();
    let username = req.body.username;
    let email = req.body.email.trim();
    let password = req.body.password;
  
    let payload = req.body;
  
    // Check if all fields have values
    if (firstName && lastName && username && email && password) {
        // Query the database to see if there's already a user with the provided username or email address
        let user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        }).catch((error) => {
            console.log(error);
            payload.errorMessage = "Make sure each field has a valid value.";
            res.status(200).render("register", payload);
        });

        if (user == null) {
            // No user found with the provided username or email, proceed with registration
            let data = req.body;
            data.password = await bcrypt.hash(password, 10); // Hash the password before storing
            User.create(data)
            .then((user) => {
                req.session.user = user; // Set the session user
                console.log(user);
                return res.redirect('/');
            });
        } else {
            // User found with the provided username or email, display an error message
            if (email == user.email) {
                payload.errorMessage = "Email already in use";
            } else {
                payload.errorMessage = "Username already in use";
            }
            res.status(200).render("register", payload);
        }
    } else {
        payload.errorMessage = "Make sure each field has a valid value.";
        res.status(200).render("register", payload);
    }
});

module.exports = router;
