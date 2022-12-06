const {Schema, model} = require('mongoose');
const otpSchema = new Schema({
    email: {type: String, required: true},
    code: {type: String, required: true},
}, {collection: 'OTPS'});

const OTP = model('OTP',otpSchema);
module.exports= OTP;
