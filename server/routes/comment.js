const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.post('/api/comment/add', async (req, res) => {
    const { text, topicId, userId } = req.body;
    if (!text || !topicId || !userId) {
        return res.status(400).json({ error: 'Text, topicId, and userId are required' });
    }

    const newComment = new Comment({ text, topicId, userId });
    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/topic/:topicId', async (req, res) => {
    try {
        const comments = await Comment.find({ topicId: req.params.topicId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { text } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { text }, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
