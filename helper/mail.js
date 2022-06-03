const {transporter}    = require('../config/mailer');
const Message          = require('../message.json');
const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
} =  require('http-status-codes');

exports.mailVerification = async (user) => {

    const mailOptions = {
        from: process.env.MAILID,
        to: user.email,
        subject: Message.SUBJECT_VERIFY_MAIL,
        html: '<a href="http://localhost:3000/user/verification/mail/'+user._id+'" >Click here for verification</a>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            throw new Error(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}