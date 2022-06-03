// Include the packages
const bcrypt    = require('bcryptjs');
const jwt       = require("jsonwebtoken");
const  { 
    ReasonPhrases, 
    StatusCodes, 
    getReasonPhrase, 
    getStatusCode, 
}               =  require('http-status-codes');

// Get The user Model
const User      = require('../models/userModel');
const File      = require('../models/fileModel');
const Tutorial  = require('../models/tutorialModel');
const Comment   = require('../models/commentsModel');
const Message   = require('../message.json');


// default
exports.index = async (req, res) => {
    res.status(StatusCodes.OK).json({ message: Message.INDEX_PAGE, data:[] });
}

// upload folder
exports.upload = async (req, res) => {

    try {
        const file = await File.create({
            user_id   : req.user.user_id,
            path      : req.file.path
        });
        res.status(StatusCodes.OK).json({ message: Message.FILE_UPLOADED_SUCCESSFULL, data:[] });
    
    }catch(err){
        return res.status(StatusCodes.BAD_REQUEST).send(err);
    }
}


exports.createTutorial = async (req, res) => {

    const tutorial = await Tutorial.create({
        title: "Demo"
    })

    res.status(StatusCodes.OK).json({ message: Message.FILE_UPLOADED_SUCCESSFULL, data:[tutorial] });

}

exports.addComments = async ( req, res ) => {

    const tutorialId = req.params.tutorialId;

    const newComment = await Comment.create({
        comment : "Demo Comments"
    });

    const tutorial = await Tutorial.findByIdAndUpdate(
        tutorialId,
        {
            "$push" : {
                "comment" : newComment._id
            }
        }
    );

    res.status(StatusCodes.OK).json({ message: Message.FILE_UPLOADED_SUCCESSFULL, data:[ newComment, tutorial ] });

}   

exports.displaydata = async ( req, res ) => {

    const tutorial = await Tutorial.find({}).populate('comment');
    
    res.status(StatusCodes.OK).json({ message: Message.FILE_UPLOADED_SUCCESSFULL, data: tutorial });

}