const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
} =  require('http-status-codes');

const User      = require('../models/userModel');
const bcrypt    = require('bcryptjs');
const jwt       = require("jsonwebtoken");
const {transporter}  = require('../config/mailer');


exports.register = async (req, res) => {

    try {

        const { first_name, last_name, email, password } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(StatusCodes.CONFLICT).json({message:"user Already Exist", data:oldUser });
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
            verifyMail: 0,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        
        user.token = token;

        var mailOptions = {
            from: process.env.MAILID,
            to: email,
            subject: 'Email verification',
            html: '<a href="http://localhost:3000/user/verification/mail/'+user._id+'" >Click here for verification</a>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(StatusCodes.CREATED).json(user);

    } catch (err) {
        console.log(err);
    }

}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(StatusCodes.BAD_REQUEST).send("All input is required");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;

            return res.status(StatusCodes.OK).json(user);
        }

        res.status(StatusCodes.BAD_REQUEST).json( {message: "Failed", data:[] } );

    } catch (errors) {
        console.log(errors);
    }
}

exports.verify = async (req, res) => {

    try {

        if (req.params.type === 'mail')
        {
            User.updateOne({ _id : req.params.employeeId },
                {
                    verifyMail : true,  
                }
            )
            .exec(function (err, data){
                if (err) { return next(err); }
                res.json({message:"successfull", data});
            });
        }

    } catch (errors) {
        console.log(errors);
    }

}