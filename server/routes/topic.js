const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

router.post('/add', async (req, res) => {
    const { title, userId } = req.body;
    if (!title || !userId) {
        return res.status(400).json({ error: 'Title and userId are required' });
    }

    const newTopic = new Topic({ title, userId });
    try {
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find().sort({ time: 1 });
        res.status(200).json(topics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        res.status(200).json(topic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title } = req.body;
        const updatedTopic = await Topic.findByIdAndUpdate(req.params.id, { title }, { new: true });
        res.status(200).json(updatedTopic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Topic.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Topic deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
