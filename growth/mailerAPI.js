//API code from Growth Team: This code is to be implemented where a diiferent team would like to use
//our API to send out emails
// file name: mailerAPI.js
function sendMail(emailAddress, emailSubject, emailHtml) {
    const data = {
        mail: {
            to: [
                emailAddress
            ],
            cc: "",
            bcc: "",
            subject: emailSubject,
            html: emailHtml,
        },
        isScheduled: "off",
        timeToSend: "",
    }

// API DOMAIN NEEDS TO BE CHANGED TO RENDER DOMAIN WHEN USED BY THE IAM GROUP
    const axios = require('axios').default;
    axios.post('https://mail-service-69zm.onrender.com/api/mail/sendMail', data)
        .then(function (response) {
        })
        .catch(function (error) {
        });

}



////****** SENDING EMAIL FUNCTION  after 10 minite if user does not complete registeration prosses ******
function sendMailAfterTime(emailAddress, emailSubject, emailHtml , isCompleted) {
    const data = {
        mail: {
            to: [
                emailAddress
            ],
            cc: "",
            bcc: "",
            subject: emailSubject,
            html: emailHtml,
        },
        isCompleted: isCompleted,

    }

// API DOMAIN NEEDS TO BE CHANGED TO RENDER DOMAIN WHEN USED BY THE IAM GROUP
    const axios = require('axios').default;
    axios.post('https://mail-service-69zm.onrender.com/api/mail/sendeEmailAfterTime', data)
        .then(function (response) {
        })
        .catch(function (error) {
        });


}



module.exports = {
    sendMail
};
//end of file: mailerAPI.js
