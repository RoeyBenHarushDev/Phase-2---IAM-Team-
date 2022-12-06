const node = require("nodemailer")
const smtp = require("nodemailer-smtp-transport")
const otpGenerator = require('otp-generator')
const fs = require('fs')
const ejs = require("ejs");
const JSON = require("JSON")
const list = require("../data/OTP-pass.json")
const path = require("path");

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

function userExist(email){
    list.table.forEach(function (i) {
        if (JSON.stringify(i.mail) === JSON.stringify(email)) {
            throw new Error("Email already exists")
        }
    })
}

///////////////////////////////////////////////////////////////

async function sendEmail(user) {
    //create an OTP Code
    let OTP = otpGenerator.generate(6, {upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false})
    //puts the ejs file into a var (the email structure)
    const data = await ejs.renderFile(process.cwd() + "/data/otp-email.ejs", {name: `${user.name}`, code: OTP});

    //the mailing metadata
    const mainOptions = {
        from: 'IamTeamShenkar@gmail.com',
        to: user.email,   //mail.emailId,
        subject: 'Please Verify you Account',
        // text: 'Your OTP is: ' + OTP
        html: data
    };
    let json
    // checks if email already exists

    // puts the new email into the list
    list.table.push({mail: mainOptions.to, code: OTP});

    json = JSON.stringify(list)
    fs.writeFile(process.cwd() + "/data/OTP-pass.json", json, 'utf-8', function(err){
        if (err) throw new Error('error writing file: ' + err);
    })

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