const nodemailer = require('nodemailer');
require("dotenv").config();

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAILID,
    pass: process.env.PASSWORD
  }
});