const express = require("express");
const app = express();
const login_route =  require('./login_route')
const session = require('express-session');

app.use('/login', login_route.loginRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Express server is running on port ${port}`));
module.exports = {app}


/*const {signUp} = require("./routers/signUp_route");
const {forgotPassword} = require("./routers/forgotPassword_route");
const {suspend} = require("./routers/suspend_route");
const {changePassword} = require("./routers/changePassword_route");
const {confirmCode} = require("./routers/confirmCode_refactor");
const {adminCRUD} = require("./routers/adminCRUD_route");*/
/*app.use('/api/signUp', signUp);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/suspend', suspend);
app.use('/api/changePassword', changePassword);
app.use('/api/confirmCode', confirmCode);
app.use('/api/adminCRUD', adminCRUD);
app.use((req, res) => {
    res.status(400).send('Something is broken!');
});*/
/*app.use(session({
    secret:"key",
    resave:false,
    saveUninitialized:false
})
);*/