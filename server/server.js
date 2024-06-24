const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", 'https://www.gstatic.com'],
        styleSrc: ["'self'", 'https://www.gstatic.com', "'unsafe-inline'"],
        scriptSrc: ["'self'", 'https://www.gstatic.com', "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https://www.gstatic.com'],
        connectSrc: ["'self'", 'https://www.gstatic.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
    }
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;

const commentRoute = require('./routes/comment');
app.use('/api/comment', commentRoute);

const topicRoute = require('./routes/topic');
app.use('/api/topic', topicRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
