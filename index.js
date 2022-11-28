const express = require("express");
const logger = require("morgan"); // NOTE: for debugging
const app = express();
const port = process.env.PORT || 3000;
const {login} = require("./routers/login_route");
const {signUp} = require("./routers/signUp_route");
const {forgotPassword} = require("./routers/forgotPassword_route");
const {suspend} = require("./routers/suspend_route");
const {changePassword} = require("./routers/changePassword_route");
const {confirmCode} = require("./routers/confirmCode_refactor");
const {adminCRUD} = require("./routers/adminCRUD_route");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger("dev"));

app.listen(port, () => console.log(`Express server is running on port ${port}`));
app.use((req, res) => {
    res.status(400).send('Something is broken!');
});

app.use('/api/login', login);
app.use('/api/signUp', signUp);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/suspend', suspend);
app.use('/api/changePassword', changePassword);
app.use('/api/confirmCode', confirmCode);
app.use('/api/adminCRUD', adminCRUD);