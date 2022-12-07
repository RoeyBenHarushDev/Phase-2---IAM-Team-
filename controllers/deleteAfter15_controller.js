const OTP = require('../models/OTP-pass');

async function handleDeleteAfter15 (request, response) {
        const user = request.body
        user.email = user.email.toLowerCase();
        await OTP.findOneAndDelete({'email': user.email});
}

module.exports = {handleDeleteAfter15}