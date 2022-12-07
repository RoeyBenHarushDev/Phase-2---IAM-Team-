const signUp = require("../services/signUpService");
const dbHandler = require('../data/dbHandler');

async function handleSignUp(req, res) {
    try {
        const user = req.body
        user.email = user.email.toLowerCase();
        const findUser = await dbHandler.getUserByEmail(user.email);
        if(findUser){
            throw new Error("user already exists");
        }
        await signUp.userExist(user.email)
        await signUp.sendEmail(req.body)
        return  res.status(200);

    } catch (e) {
        return  res.status(401).json({message: e.message});
    }
}

module.exports = {handleSignUp}