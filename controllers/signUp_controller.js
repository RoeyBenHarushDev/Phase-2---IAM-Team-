const signUp = require("../services/signUpService");
const {constructResponse} = require('../utils/utils');
const dbHandler = require('../data/dbHandler');

async function handleSignUp(request, response) {
    try {
        const user = request.body
        user.email = user.email.toLowerCase();
        const findUser = await dbHandler.getUserByEmail(user.email);
        if(findUser){
            throw new Error("user already exists");
        }
        await signUp.userExist(user.email)
        await signUp.sendEmail(request.body)
        // return constructResponse(response, {}, 200);

    } catch (e) {
        console.log(e);
        return constructResponse(response, {error: e.message}, 401);
    }
}

module.exports = {handleSignUp}