const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
