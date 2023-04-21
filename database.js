const mongoose = require("mongoose");
const connectionString = "mongodb+srv://admin:{YourPassword}@twittercluster0.yfx9fnf.mongodb.net/?retryWrites=true&w=majority"

// Set the 'strictQuery' option to false to disable schema checking for queries
mongoose.set('strictQuery', false);

class Database {
    constructor() {
        this.connect();
    }
    async connect() {
        // Connect to the MongoDB database using the connection string

      try { 
        await mongoose.connect(connectionString);
          console.log("Database connection successful");
      } catch (error) {
            console.error("Database connection error:", error);
        }
    }}


// Export a new instance of the Database class
module.exports = new Database();
