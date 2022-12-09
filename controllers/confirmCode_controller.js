const confirmCode = require("../services/confirmCodeService");
const mailer = require("../growth/mailerAPI");
const dbHandler = require("../data/dbHandler");

async function handleConfirmCode(req, res) {
    try {
        const user = req.body
        const findUser = await dbHandler.getUserByEmail(user.email);
        if (findUser) {
            throw new Error("user already exists");
        }
        await confirmCode.otpCompare(user);
        // mailer.sendMail(user.email, "welcome", emailPath);
        return res.status(200).json("add user");
    } catch (e) {
        return res.status(401).json({message: e.message});
    }
}

module.exports = {handleConfirmCode}

