const signUp = require("../services/signUpService");
const dbHandler = require('../data/dbHandler');
const mailerAPI = require("../growth/mailerAPI");

async function handleSignUp(req, res) {
    try {
        const user = req.body
        user.email = user.email.toLowerCase();
        const findUser = await dbHandler.getUserByEmail(user.email);
        if(findUser){
            throw new Error("user already exists");
        }
        await signUp.userExist(user.email);
        await signUp.sendEmail(req.body);
        // Growth team API(mailerAPI) - sending email after user register.
        await mailerAPI.sendMail(user.email, 'welcome',' <h1>Welcome !</h1>');
        return res.status(200).json({message: "code has been sent"});


    } catch (e) {
        return  res.status(401).json({message: e.message});
    }
}

module.exports = {handleSignUp}