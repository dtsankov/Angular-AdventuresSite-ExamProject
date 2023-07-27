const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const adventureController = require('./controllers/adventureController')
const authController = require('./controllers/authController')
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/auth');
const cookieSecret = process.env.COOKIESECRET || 'SoftUni';
const connectionString = 'mongodb://127.0.0.1:27017/adventuresDb';

start();

async function start() {
    mongoose.set('strictQuery', true)
    await mongoose.connect(connectionString);
    console.log('Database connected');

    const app = express();
    app.use(authMiddleware);
    app.use(cookieParser(cookieSecret));
    app.use(express.json());
    app.use(cors());
    app.get('/', (req, res) => {
        res.json({ message: 'REST service active' });
    });

  
    app.use('/auth', authController)
    app.use('/adventures/catalog', adventureController);
    
    app.listen(3000, () => console.log('REST service started on port 3000!'));
}