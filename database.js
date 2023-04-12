const mongoose = require("mongoose");

// Set the 'strictQuery' option to false to disable schema checking for queries
mongoose.set('strictQuery', false);

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        // Connect to the MongoDB database using the connection string
        mongoose.connect("mongodb+srv://admin:admin123@twittercluster0.yfx9fnf.mongodb.net/?retryWrites=true&w=majority")
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.log("Database connection error: " + err);
            });
    }
}

// Export a new instance of the Database class
module.exports = new Database();
