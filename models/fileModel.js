const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    user_id   : { type: mongoose.ObjectId, default: null, required: true },
    path      : { type: String, default: null, required: true },
});

module.exports = mongoose.model("file", fileSchema);