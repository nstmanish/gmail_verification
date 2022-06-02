const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
} =  require('http-status-codes');

const User             = require('../models/userModel');
const bcrypt           = require('bcryptjs');
const jwt              = require("jsonwebtoken");
const MailVarification = require('../helper/mail');
const Message          = require('../message.json');


exports.register = async (req, res) => {

    try {

        const { first_name, last_name, email, password } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(StatusCodes.CONFLICT).json({message: Message.USER_EXIST , data:oldUser });
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
        });

        const token = await jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        
        await User.updateOne({ _id : user._id },
            {
                token : token,  
            }
        );
    
        user.token = token;

        // Send Mail
        await MailVarification.mailVerification(user);
    
        res.status(StatusCodes.CREATED).json(user);

    } catch (err) {
        console.log(err);
    }

}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(StatusCodes.BAD_REQUEST).send(Message.ALL_INPUT_REQUIRE);
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

        res.status(StatusCodes.BAD_REQUEST).json( {message: Message.FAILED, data:[] } );

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
                res.json({message: Message.SUCCESSFULL, data});
            });
        }

    } catch (errors) {
        console.log(errors);
    }

}