const { app } = require("./routers/mainRouter");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

app.listen(port,() => console.log(`Express server is running on port ${port}`));
