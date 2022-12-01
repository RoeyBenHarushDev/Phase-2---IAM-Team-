const express = require("express");
const app = express();

//const {login} = require("./routers/login_route");
const signUp = require("./signUp_route");
// const {forgotPassword} = require("./routers/forgotPassword_route");
// const {suspend} = require("./routers/suspend_route");
// const {changePassword} = require("./routers/changePassword_route");
const confirmCode = require("./confirmCode_route");
// const {adminCRUD} = require("./routers/adminCRUD_route");

app.use('/api/signUp', signUp.signupRoute);
// app.use('/api/login', login);
// app.use('/api/forgotPassword', forgotPassword);
// app.use('/api/suspend', suspend);
// app.use('/api/changePassword', changePassword);
app.use('/api/confirmCode', confirmCode.confirmCodeRoute);
// app.use('/api/adminCRUD', adminCRUD);
app.use((req, res) => {
    res.status(400).send('Something is broken!');
});


module.exports = { app }