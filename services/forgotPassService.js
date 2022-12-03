const User = require("../user/User");
const dbHandler = require('../data/dbHandler');
const transporter = require("nodemailer/lib/mailer");
const node = require("nodemailer")
const smtp = require("nodemailer-smtp-transport")
const otpGenerator = require('otp-generator')
const fs = require('fs')
const ejs = require("ejs");


function generatePassword() {
    let length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.random() * n);
    }
    return retVal;
}

async function sendPassword(newPass, user) {
    let data = await ejs.renderFile(__dirname + "/OTP-mail.ejs", {name: 'Stranger', code: newPass});
    //the mailing metadata
    const mainOptions = {
        from: 'IamShenkar@gmail.com',
        to: user.email,  //mail.emailId,
        subject: 'New Password for IAM',
        // text: 'Your OTP is: ' + OTP
        html: data
    };
     await transporter.sendMail(mainOptions, (err, info) => {
         if (err) {
             // server.logger.log(err);
         } else {
             // server.logger.log('Message sent: ' + info.response + "\nwith new Pass: " + pass);
         }

     })}

module.exports ={generatePassword, sendPassword }