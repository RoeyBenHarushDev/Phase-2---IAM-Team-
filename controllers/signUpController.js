const signUp = require("../services/signUpService");
const dbHandler = require('../data/dbHandler');
const mailerAPI = require('../growth/mailerAPI');

async function handleSignUp(req, res) {
    try {
        const user = req.body
        user.email = user.email.toLowerCase();
        await signUp.userExist(user.email);
        await signUp.sendEmail(req.body);
        // Growth team API(mailerAPI) - sending email after user register.
        await mailerAPI.sendMail(user.email, 'welcome',' <h1>Welcome !</h1>');
        return  res.status(200);

    } catch (e) {
        return  res.status(401).json({message: e.message});
    }
}

module.exports = {handleSignUp}