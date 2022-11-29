const express = require("express");
const app = express();
bodyParser = require('body-parser');
const login_route =  require('./login_route')

/*const {signUp} = require("./routers/signUp_route");
const {forgotPassword} = require("./routers/forgotPassword_route");
const {suspend} = require("./routers/suspend_route");
const {changePassword} = require("./routers/changePassword_route");
const {confirmCode} = require("./routers/confirmCode_refactor");
const {adminCRUD} = require("./routers/adminCRUD_route");*/


app.use('/login', login_route.loginRouter);

/*app.use('/api/signUp', signUp);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/suspend', suspend);
app.use('/api/changePassword', changePassword);
app.use('/api/confirmCode', confirmCode);
app.use('/api/adminCRUD', adminCRUD);
app.use((req, res) => {
    res.status(400).send('Something is broken!');
});*/

module.exports = {app}