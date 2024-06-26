const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const authenticateToken = require('../authenticateToken');
const jwt = require('jsonwebtoken');

router.post('/add', authenticateToken, async (req, res) => {
    
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const { user: { id } } = jwt.decode(token, process.env.JWT_SECRET);
    const { text, topicId } = req.body;

    if (!text || !topicId || !id) {
        return res.status(400).json({ error: 'Text, topicId, and userId are required' });
    }

    const newComment = new Comment({ text, topicId, userId: id });
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

module.exports = router;
