const express = require("express");
const app = express();
require('../services/AuthService')
const login =  require('./login_route')
const session = require('express-session');
const login_controller = require('../controllers/login_controller');
const bodyParser = require('body-parser');
const forgotPassword= require("./forgotPassword_route")
const signUp = require("./signUp_route");
const changePassword = require("./changePassword_route")
const suspend = require("./suspend_route");
const confirmCode = require("./confirmCode_route");
const passport = require('passport');
const path = require("path");
const logger = require("morgan");
const fs = require('fs');
const accessLogStream = fs.createWriteStream(path.join(__dirname,'logs.log'),{flags: 'a'})

require('dotenv').config({ path: path.join(process.cwd() + "/data/",".env") });
const SESSION_SECRET = process.env.secret;

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}
app.use(logger(" :method :url :status :res[content-length] - :response-time ms :date[web]",
    {stream: accessLogStream}));
app.use(session({secret: SESSION_SECRET,resave:false,
    saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Referrer-Policy: no-referrer-when-downgrade")
    // res.set('Content-Type', 'application/json');
    next();
});
app.use(express.static('client'));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname ,"index.html"))
});
app.use('/api/googleLogIn',passport.authenticate('google', {scope : ['email','profile']}));
app.use('/google/callback',passport.authenticate('google', {successRedirect : '/homePage',failureRedirect:'/authFailure'}));
app.get('/homePage', isLoggedIn, (req,res)=>{
    console.log("google Auth Succeeded")
    res.sendFile(path.join(__dirname ,"../client/homePage.html"))
});
app.get('/authFailure',(req,res)=>{
    console.log("google auth failed")
    res.send('Something Went Wrong..')
    // res.sendFile(path.join(__dirname ,"index.html"))
});
app.use('/api/login',login.loginRouter);
app.use('/api/signUp', signUp.signupRoute);
app.use('/api/suspension', suspend.suspendRoute);
app.use('/api/confirmCode', confirmCode.confirmCodeRoute);
app.use('/api/forgotPassword', forgotPassword.forgotPasswordRoute);
app.use('/api/changePassword', changePassword.changePasswordRoute);
// app.use('/api/adminCRUD', adminCRUD);

app.use((req, res) => {
    res.status(400).send('Something is broken!');
});

module.exports = { app }
