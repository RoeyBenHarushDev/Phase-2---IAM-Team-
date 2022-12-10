const express = require("express");
const app = express();
require('../services/authService')
const login =  require('./loginRoute')
const session = require('express-session');
const bodyParser = require('body-parser');
const forgotPassword= require("./forgotPasswordRoute");
const signUp = require("./signUpRoute");
const changePassword = require("./changePasswordRoute");
const admin = require("./adminRoute");
const confirmCode = require("./confirmCodeRoute");
const passport = require('passport');
const path = require("path");
const logger = require("morgan");
const fs = require('fs');
const logout = require('./logoutRoute');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const accessLogStream = fs.createWriteStream(path.join(__dirname,'logs.log'),{flags: 'a'})


require('dotenv').config({ path: path.join(process.cwd() + "/data/",".env") });
const SESSION_SECRET = process.env.secret;


app.use(express.static('clientPublic'));

function isLoggedIn(req, res, next) {req.user ? next() : res.sendStatus(401)}
app.get('*.html',function (req, res, next) {res.redirect('/homePage');});


app.get('/clientPublic/script.js', function(req, res) {res.sendFile(path.join(__dirname , "../clientPublic/script.js"));});
app.get('/clientPublic/style.css', function(req, res) {res.sendFile(path.join(__dirname , "../clientPublic/style.css"));});
app.get('/clientPublic/scriptsHome.js', function(req, res) {res.sendFile(path.join(__dirname , "../clientPublic/scriptsHome.js"));});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(logger(" :method :url :status :res[content-length] - :response-time ms :date[web]", {stream: accessLogStream}));
app.use(session({secret: SESSION_SECRET,resave:false, saveUninitialized: true}))
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Referrer-Policy: no-referrer-when-downgrade")
    next();
});


app.use(bodyParser.json());
app.get('/',(req,res)=>{res.sendFile("index.html")});
app.use('/googleLogIn',passport.authenticate('google', {scope : ['email','profile']}));
app.use('/google/callback',passport.authenticate('google', {successRedirect : '/homePage',failureRedirect:'/authFailure'}));
app.get('/authFailure',(req,res)=>{console.log("google auth failed"); res.send('Something Went Wrong..')});
app.use('/login',login.loginRouter);
app.use('/homePage', login.loginRouter);
app.use('/logout',logout.logoutRouter);
app.use('/signUp', signUp.signupRoute);
app.use('/admin', admin.adminRoute);
app.use('/confirmCode', confirmCode.confirmCodeRoute);
app.use('/forgotPassword', forgotPassword.forgotPasswordRoute);
app.use('/changePassword', changePassword.changePasswordRoute);

app.use((req, res) => {res.status(400).send('Something is broken!');});

module.exports = { app }
