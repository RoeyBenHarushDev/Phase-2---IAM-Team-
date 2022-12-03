const { app } = require("./routers/mainRouter");
const logger = require("morgan");
const express = require("express"); // NOTE: for debugging
const port = process.env.PORT || 3000;



// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(logger("dev"));

app.listen(port, () => console.log(`Express server is running on port ${port}`));

