const passport = require('passport')
const path = require("path");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dbHandler = require('../data/dbHandler');
const User = require("../models/users");
const jwt = require('jsonwebtoken');
const userClass = require('../models/users');


require("dotenv").config({ path: path.join(process.cwd() + "/data/",".env") });
const GOOGLE_CLIENT_ID = process.env.ClientId;
const GOOGLE_CLIENT_SECRET = process.env.ClientSecret;
const running_path = process.env.running_path

passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: running_path + "/google/callback"
    },
    async (request, accessToken, refreshToken, profile, done)=> {
    const {
            id: googleId,
            displayName: username,
            given_name: firstName,
            family_name: lastName,
            picture: photo,
            email: email,
        } = profile;

        const findUser = await dbHandler.getUserByEmail(email);
        if (!findUser) {
            const user = new User({'googleId': googleId, 'name': username, 'email': email, 'password': 'null', 'loginDate': new Date()});
            await dbHandler.addDoc(user)
            return done(null, user);
        }
        // const user = new userClass(findUser._id, findUser.type, findUser.email);
        // const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        // cookie('token', token, {httponly:true});
        return done(null,findUser);

    }
));

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})