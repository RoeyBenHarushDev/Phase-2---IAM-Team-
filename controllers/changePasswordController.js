
const dbHandler = require("../data/dbHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function handleChangePassword(req, res) {
    try {
        const token = req.cookies.token;
        const userObj = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).user;
        const user = await dbHandler.getUserByEmail(userObj.email);
         if (!await bcrypt.compare(req.body.password, user.password)){
            throw new Error("Incorrect password")
        }
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
       await dbHandler.updateUser(user.email, {"password": hashedPassword})
        return res.status(200).json({message: "Password has been changed"})
    } catch (e) {
        return res.status(401).json({message:e.message})
    }
}

module.exports = {handleChangePassword}