//API code from Growth Team: This code is to be implemented where a diiferent team would like to use
//our API to send out emails
// file name: mailerAPI.js
function sendMail(emailAddress, emailSubject, emailHtmlPATH) {
    const data = {
        "mail": {
            "to": [
                emailAddress
            ],
            "cc": "",
            "bcc": "",
            "subject": emailSubject,
            "html": emailHtmlPATH,
        },
        "isScheduled": "off",
        "timeToSend": "",
    }

// API DOMAIN NEEDS TO BE CHANGED TO RENDER DOMAIN WHEN USED BY THE IAM GROUP
    fetch('https://mail-service-69zm.onrender.com/api/mail/sendMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success: Email was sent');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

module.exports = {
    sendMail,
};
//end of file: mailerAPI.js


//EXAMPLE CALL TO SENDMAIL FROM SOMEWHERE ELSE: ***********

////FUNCTION DATA INPUTS:
////emailAddress : string
////emailSubject : string
////emailHtmlPATH : : object {path: './IAM/welcome.html'}

// const mailer = require("./mailerAPI.js") //or the rellevant path
// const emailAddress = "sufkarmon2@gmail.com"
// const emailSubject = "Welcome!"
// const emailHtmlPATH = {path: './IAM/welcome.html'}
// mailer.sendMail(emailAddress, emailSubject, emailHtmlPATH);

// *************************