const passport = require('passport')
const expressSession = require('express-session');
const path = require("path");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dbHandler = require('../data/dbHandler');
const {addDoc} = require("../data/dbHandler");
const User = require("../models/users");

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
        return done(null,findUser);

    }
));

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})