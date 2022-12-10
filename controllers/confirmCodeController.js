const confirmCode = require("../services/confirmCodeService");
const dbHandler = require("../data/dbHandler");

async function handleConfirmCode(req, res) {
    try {
        const user = req.body
        const findUser = await dbHandler.getUserByEmail(user.email);
        if (findUser) {
            throw new Error("user already exists");
        }
        await confirmCode.otpCompare(user);

        return res.status(200).json({message: "User was added"});
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
}

module.exports = {handleConfirmCode}

