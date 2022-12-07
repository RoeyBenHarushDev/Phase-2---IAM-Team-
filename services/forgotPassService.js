const node = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");
const ejs = require("ejs");
const path = require("path");

require("dotenv").config({ path: path.join(process.cwd() + "/data/","...env") });
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
    const data = await ejs.renderFile(process.cwd() + "/data/newPass-mail.ejs", {name: user["name"], code: newPass});
    //the mailing metadata
    const mainOptions = {
        from: 'IamShenkar@gmail.com',
        to: user.email,
        subject: 'New Password for IAM',
        html: data
    };

    await transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("message sent");
        }
    });
}

module.exports ={generatePassword, sendPassword }