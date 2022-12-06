const { app } = require("./routers/mainRouter");
const path = require('path');
const logger = require("morgan"); // NOTE: for debugging
const port = process.env.PORT || 5000;
const connect = require('./config/dbConnection');
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

connect.connectDb();
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    console.log()
})
app.listen(port,() => console.log(`Express server is running on port ${port}`));
