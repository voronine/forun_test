// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Подключаем модель пользователя

// Маршрут для регистрации нового пользователя
router.post('/register', async (req, res) => {
    const { userName, email, telefon, password } = req.body;

    try {
        // Проверяем, существует ли пользователь с таким email
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Создаем нового пользователя
        user = new User({
            userName,
            email,
            telefon,
            password // В реальном приложении пароль должен хешироваться, например, с помощью bcrypt
        });

        // Сохраняем пользователя в базе данных
        await user.save();

        res.json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
