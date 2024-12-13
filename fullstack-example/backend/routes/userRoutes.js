const express = require('express');
const axios = require('axios');
const User = require('../models/User');
const router = express.Router();

// Fetch data from external API and save to MongoDB
router.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get('https://fake-json-api.mock.beeceptor.com/users');
        const users = response.data;
        await User.insertMany(users);
        res.status(200).json({ message: 'Users fetched and saved!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;