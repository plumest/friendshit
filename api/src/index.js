import config from "./config";
import express from "express";
import load from "./loaders";
import bodyParser from "body-parser";
import routes from './routes/index.js';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import {handler404, handlerGeneric, isOperationalError} from "./error";

let app = express();

const logger = require("$logging").getLogger(__filename);

async function startServer() {
    app = await load(config)
    process.on('unhandledRejection', error => {
        logger.error(error.message);
        logger.verbose(error.stack);
    })
    process.on('uncaughtException', error => {
        logger.verbose(error.stack);
        if (!isOperationalError(error)) {
            logger.crit(error.message);
            process.exit(1)
        } else {
            logger.error(error.message);
        }
    })
    if (config.environment !== 'production') {
        // app.use(logger('dev'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api/v1', routes);
    app.use(handler404);
    app.use(handlerGeneric);

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

    app.use(limiter);
    app.use(mongoSanitize());


    if (config.environment !== 'production') {
        app.listen(config.port, () => {
            logger.info(`[HTTP/1.1] Shitty Server has started on ${config.baseUrl}:${config.port}`);
        });
    }
}

startServer();
