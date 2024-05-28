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
import cluster from 'cluster';
import { cpus } from 'os';

const app = express();
const PORT = 4000;

const numerosDeProcesadores = cpus().length;


const URL = process.env.MODE == 'DEV' ? process.env.LOCAL_PORT : process.env.WEB_PORT;
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

app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());



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




if (cluster.isPrimary) {
    for (let i = 0; i < numerosDeProcesadores; i++) {
        const worker = cluster.fork();

        worker.on('online', () => {
            console.log(`worker online primary ${worker.process.pid}`)
        });
    }

    cluster.on('exit', (worker, code, signal) => {

        const newWorker = cluster.fork();
        newWorker.on('online', () => {
            console.log(`Worker online secondary ${newWorker}`);
        })
    })

} else {


    app.use('/api', router);
    app.use('/uploads/news', express.static(`${__dirname}/uploads/news`));

    app.listen(PORT, () => {
        console.log(`Listening on port  ${PORT}`);
    })

}