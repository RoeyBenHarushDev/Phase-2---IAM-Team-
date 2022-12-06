const list = require("../data/OTP-pass.json");
const confirmCode = require("../services/confirmCodeService");
const {constructResponse} = require('../utils/utils');
const dbHandler = require("../data/dbHandler");

 async function handleConfirmCode(request, response) {
     try{
         await confirmCode.otpCompare(request.body);
         return constructResponse(response, {}, 200);
     } catch (e) {
      //       response.status(404).send("Error saving new user");
         return constructResponse(response, e, 401);
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

