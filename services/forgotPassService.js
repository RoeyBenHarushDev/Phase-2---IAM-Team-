const list = require("../data/OTP-pass.json");
const User = require("../user/User");
const dbHandler = require('../data/dbHandler');
const node = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const ejs = require("ejs");
const path = require("path");

require("dotenv").config({ path: path.join(process.cwd() + "/data/",".env") });
const emailSMTP = process.env.email;

const transporter = node.createTransport(smtp({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'IamTeamShenkar@gmail.com',
        pass: emailSMTP
    }
}));

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
    const data = await ejs.renderFile(process.cwd() + "/data/OTP-mail.ejs", {name: `${user.name}`, code: newPass,mailBody:'Here is your new password:'});
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
            console.log(err);
            // server.logger.log(err);
        } else {
            console.log("message sent");
            // server.logger.log('Message sent: ' + info.response + "\nwith new Pass: " + pass);
        }
    });
}

module.exports ={generatePassword, sendPassword }