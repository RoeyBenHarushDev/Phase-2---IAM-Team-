const js = require("../data/users.json");
const list = require("../data/OTP-pass.json");
const confirmCode = require("../services/confirmCodeService");
const {constructResponse} = require('../utils/utils');

 function handleConfirmCode(request, response) {
    const otp = confirmCode.otpCompare(request.body)

    if(otp){
        return constructResponse(response, {}, 200);
    } else {
        return constructResponse(response, {error: otp}, 401);
    }
}

module.exports = {handleConfirmCode}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);
    }
};

