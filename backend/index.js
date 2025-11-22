require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { registerController } = require('./src/controllers/registerController');
const { loginController } = require('./src/controllers/loginController');
const { refreshTokenController } = require('./src/controllers/refreshTokenController');
const { authMiddleware } = require('./src/middlewares/authMiddleware');
const { initializeDatabase } = require('./src/config/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/register', registerController);
app.post('/login', loginController);
app.post('/refresh-token', refreshTokenController);

// Protected route example - requires valid access token
app.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Initialize database and start server
initializeDatabase().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});