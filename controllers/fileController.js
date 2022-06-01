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

// default
exports.index = async (req, res) => {
    res.status(StatusCodes.OK).json({ message: "index page", data:[] });
}

// upload folder
exports.upload = async (req, res) => {
    const file = await File.create({
        user_id   : req.user.user_id,
        path      : req.file.path
    });
}
