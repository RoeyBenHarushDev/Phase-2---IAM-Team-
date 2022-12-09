const express = require("express");
const app = express();
require('../services/AuthService')
const login =  require('./login_route')
const session = require('express-session');
const bodyParser = require('body-parser');
const forgotPassword= require("./forgotPassword_route")
const signUp = require("./signUp_route");
const deleteAfter15 = require("./deleteAfter15_route")
const changePassword = require("./changePassword_route")
const admin = require("./admin_route");
const confirmCode = require("./confirmCode_route");
const passport = require('passport');
const path = require("path");
const logger = require("morgan");
const fs = require('fs');
const logout = require('./logout_route');
const cookieParser = require('cookie-parser');
const login_controller = require('../controllers/login_controller');
const jwt = require("jsonwebtoken");
const accessLogStream = fs.createWriteStream(path.join(__dirname,'logs.log'),{flags: 'a'})
const mainRouter = new express.Router();

require('dotenv').config({ path: path.join(process.cwd() + "/data/",".env") });
const SESSION_SECRET = process.env.secret;
app.use(express.static('client'));
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}
app.get('*.html',function (req, res, next) {
   /* if ((req.path.indexOf('html') >= 0)) {*/
        res.redirect('/homePage');
   // }
});

/*app.get('/homePage.html',(req,res)=>
{
})*/
app.get('/client/script.js', function(req, res) {
    res.sendFile(path.join(__dirname , "../client/script.js"));
});
app.get('/client/style.css', function(req, res) {
    res.sendFile(path.join(__dirname , "../client/style.css"));
});
app.get('/client/scriptsHome.js', function(req, res) {
    res.sendFile(path.join(__dirname , "../client/scriptsHome.js"));
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
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


app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.sendFile("index.html")
});
app.use('/api/googleLogIn',passport.authenticate('google', {scope : ['email','profile']}));

app.use('/google/callback',passport.authenticate('google', {successRedirect : '/homePage.html',failureRedirect:'/authFailure'}));

app.get('/authFailure',(req,res)=>{
    console.log("google auth failed")
    res.send('Something Went Wrong..')
    // res.sendFile(path.join(__dirname ,"index.html"))
});
app.use('/api/login',login.loginRouter);
app.use('/homePage', login.loginRouter);
app.use('/api/logout',logout.logoutRouter);
app.use('/api/signUp', signUp.signupRoute);
app.use('/api/admin', admin.adminRoute);
app.use('/api/confirmCode', confirmCode.confirmCodeRoute);
app.use('/api/forgotPassword', forgotPassword.forgotPasswordRoute);
app.use('/api/changePassword', changePassword.changePasswordRoute);
app.use('/api/deleteAfter15',deleteAfter15.deleteAfter15Route);
// app.use('/api/adminCRUD', adminCRUD);




module.exports = { app }
