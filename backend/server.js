import express from 'express';
require('dotenv').config()
import mongoose from 'mongoose';
import { userRoutes, sessionRoutes } from './routes/index';
import session from 'express-session';
import connectStore from 'connect-mongo';

const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV;
const SESS_NAME = process.env.SESS_NAME;
const SESS_SECRET = process.env.SESS_SECRET;
const SESS_LIFETIME = process.env.SESS_LIFETIME;

(async () => {
    try {
        
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('MongoDB connected');

        const app = express();
        const MongoStore = connectStore(session);
        
        app.disable('x-powered-by'); //hide from users for security

        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET,
            saveUninitialized: false,
            resave: false,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                collection: 'session',
                ttl: parseInt(SESS_LIFETIME) / 1000
            }),
            cookie: {
                sameSite: true,
                secure: NODE_ENV === 'production',
                maxAge: parseInt(SESS_LIFETIME)
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
