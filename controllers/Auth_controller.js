const Auth = require("../services/AuthService");
const {constructResponse} = require('../utils/utils');



async function handleAuth(request,response) {
    try {
        Auth
    } catch (e) {
        console.log(e);
        return constructResponse(response, {error: e.message}, 401);
    }
}

module.exports =  { handleAuth }