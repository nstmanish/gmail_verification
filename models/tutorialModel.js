const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    title:      { type: String },
    comment:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Tutorial', tutorialSchema);