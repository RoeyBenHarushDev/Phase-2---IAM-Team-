const confirmCode = require("../services/confirmCodeService");
const {constructResponse} = require('../utils/utils');


 async function handleConfirmCode(request, response) {
     try{
         await confirmCode.otpCompare(request.body);
     } catch (e) {
      //       response.status(404).send("Error saving new user");
         if (e=='code is expired"'){
             return constructResponse(response, e, 403);
         }
         return constructResponse(response, e, 401);
     }
     return constructResponse(response, {}, 200);
 }

module.exports = {handleConfirmCode}

