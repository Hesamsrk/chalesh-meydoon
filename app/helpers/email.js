const nodemailer = require('nodemailer');
const config = require('../../config');

let transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
        user: config.mail_server.mailAddress,
        pass: config.mail_server.password
    }
});






async function SendMail(email_dest, subject, text) {

    let mailOptions = {
        from: config.mail_server.mailAddress,
        to: email_dest,
        subject,
        text
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email error:\n'.red, error);
        } else {
            console.log('Email sent: ' + info.response.green);
        }
    });
}

module.exports  = {SendMail}