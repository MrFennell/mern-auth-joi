import express from 'express';
require('dotenv').config()
import mongoose from 'mongoose';
import { userRoutes, sessionRoutes } from './routes/index';
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

(async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('MongoDB connected');

        const app = express();
        
        app.disable('x-powered-by'); //hide from users for security
        
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(session({
            name: process.env.SESS_NAME,
            secret: process.env.SESS_SECRET,
            saveUninitialized: true,
            resave: true,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                collection: 'session',
                ttl: parseInt(1000 * 600 * 600 * 2) / 1000
            }),
            cookie: {
                sameSite: true,
                secure: false,
                maxAge: parseInt(1000 * 600 * 600 * 2)
            }
        }));
        
        const port = process.env.PORT || 8000;

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/users', userRoutes);
        apiRouter.use('/session', sessionRoutes);

        app.listen(port, () => console.log(`Listening on port ${port}!`));
    } catch (err) {
        console.log(err);
    }

})();
