const Auth = require("../services/AuthService");

async function handleAuth(req,res) {
    try {
        Auth
    } catch (e) {
        console.log(e);
        return res.status(401).json({message: e.message});
    }
}

module.exports =  { handleAuth }