const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    title:      { type: String },
    postedBy:   { type: Schema.Types.ObjectId },
    stories:    [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Tutorial', tutorialSchema);