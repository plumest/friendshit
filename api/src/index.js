import config from "./config.js";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import express from "express";
import mongoose from "mongoose";
import load from "./loaders";
import bodyParser from "body-parser";
import routes from './routes/index.js';
import rateLimit from 'express-rate-limit';

let app = express();

async function startServer() {
    app = await load()
    if (config.environment !== 'production') {
        app.use(logger('dev'));
    }
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api/v1', routes.users);


    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

    app.use(limiter);

    mongoose.connect(config.connUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
        .catch(error => console.log(error));

    if (config.environment !== 'production') {
        app.use(logger('dev'));

        app.listen(config.port, () => {
            console.log(`Server is running on ${config.baseUrl}:${config.port}/`);
        });
    }
}

startServer();
