const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null, required: true },
    last_name : { type: String, default: null, required: true },
    email     : { type: String, unique: true, required: true },
    password  : { type: String, required: true },
    token     : { type: String, default: null },
    verifyMail: { type: Boolean, default: false }
});

module.exports = mongoose.model("user", userSchema);