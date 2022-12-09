const node = require("nodemailer")
const smtp = require("nodemailer-smtp-transport")
const otpGenerator = require('otp-generator')
const ejs = require("ejs");
const path = require("path");
const OTP = require('../models/OTP-pass');
const dbHandler = require('../data/dbHandler');

///////////////////////////////////////////////////////////////

require("dotenv").config({ path: path.join(process.cwd() + "/data/","...env") });
const emailSMTP = process.env.email;

///////////////////////////////////////////////////////////////

// the transport metadata
const transporter = node.createTransport(smtp({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'IamTeamShenkar@gmail.com',
        pass: emailSMTP
    }
}));

///////////////////////////////////////////////////////////////

async function userExist(mail) {
    const exist = await OTP.findOne({email: mail});
    if (exist) {
        throw new Error("Email already exists");
    }
}

///////////////////////////////////////////////////////////////

async function sendEmail(user) {
    //create an OTP Code
    let OTPcode = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})
    //puts the ejs file into a var (the email structure)
    const data = await ejs.renderFile(process.cwd() + "/data/otp-email.ejs", {name: `${user.name}`, code: OTPcode});

    //the mailing metadata
    const mainOptions = {
        from: 'IamTeamShenkar@gmail.com',
        to: user.email,   //mail.emailId,
        subject: 'Please Verify you Account',
        // text: 'Your OTP is: ' + OTP
        html: data
    };

    const newOTP = new OTP({"email": mainOptions.to, "code": OTPcode, "creationDate": new Date()});
    await dbHandler.addDoc(newOTP);

    // send the mail with the OTP to the client email
    await transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            throw new Error("transporter error: mail was not sent")
            // server.logger.log(err);
        } else {
            console.log("message sent")
            // server.logger.log('Message sent: ' + info.response + "\nwith OTP: " + OTP);
        }
    });
}

module.exports = {sendEmail , userExist}