const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

// Configure the middleware
router.use(bodyParser.urlencoded({ extended: false }));

// GET route for logging out
router.get('/', (req, res, next) => {
    // Check if there's an active session
    if (req.session) {
        // Destroy the session and redirect to the login page
        req.session.destroy(() => {
            res.redirect("/login");
        });
    }
});

module.exports = router;
