const { app } = require("./routers/mainRouter");
const path = require('path');
const logger = require("morgan"); // NOTE: for debugging
const port = process.env.PORT || 5000;


// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


app.listen(port,() => console.log(`Express server is running on port ${port}`));
