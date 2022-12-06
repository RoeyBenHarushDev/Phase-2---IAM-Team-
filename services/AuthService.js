const passport = require('passport')
const path = require("path");
const GoogleStrategy = require('passport-google-oauth2').Strategy;

require("dotenv").config({ path: path.join(process.cwd() + "/data/",".env") });
const GOOGLE_CLIENT_ID = process.env.ClientId;
const GOOGLE_CLIENT_SECRET = process.env.ClientSecret;
const running_path = process.env.running_path

passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: running_path + "/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {

            return done(null, profile);
}
));

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
})