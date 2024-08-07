import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import 'dotenv/config';
import initializePassport from './config/passport.js';
import router from './routes/index.routes.js';
import __dirname from './path.js';
import compression from 'express-compression';
import responseTime from 'response-time';





const app = express();
const PORT = 8080;





const URL = process.env.MODE === 'DEV' ? process.env.LOCAL_PORT : process.env.WEB_PORT;
const whiteList = [URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) != -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('access denied'));
        }
    },
    credentials: true
}

app.use(express.json());
app.use(cookieParser(process.env.SIGNED_COOKIE))

try {
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            secret: process.env.SESSION_SECRET,
            ttl: 60
        }),
        secret: process.env.SECRET_SESSION,
        resave: false,
        saveUninitialized: false
    }))
} catch (error) {
    console.log("error al establecer session", error)
}

app.use(responseTime());
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(compression({
    brotli: { enabled: true, zlib: {} },
    threshold: 1024,
    zlib: { level: 6 }
}));



mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 1200000
})
    .then(() => {
        console.log("DB is connected");
    })
    .catch((error) => {
        console.log("error en conexion a DB", error)
        process.exit(1);
    })



app.use('/api', router);
app.use('/uploads/news', express.static(`${__dirname}/uploads/news`));
app.use('/public', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Almacenar en caché durante 1 año
    next();
});

app.use('/public', express.static(`${__dirname}/public`));




app.listen(PORT, () => {
    console.log(`Listening on port  ${PORT}`);
})

