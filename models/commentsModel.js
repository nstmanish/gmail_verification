const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentBy : { type: Schema.Types.ObjectId },
    comment   : { type: String }
})

module.exports = mongoose.model('Comment', commentSchema );