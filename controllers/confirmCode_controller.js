const confirmCode = require("../services/confirmCodeService");


async function handleConfirmCode(req, res) {
    try {
        await confirmCode.otpCompare(req.body);
        return res.status(200)
    } catch (e) {
       return  res.status(401).json({message: e.message});
    }
}

module.exports = {handleConfirmCode}

