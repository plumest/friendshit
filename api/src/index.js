import config from "./config";
import express from "express";
import load from "./loaders";
import bodyParser from "body-parser";
import routes from './routes/index.js';
import rateLimit from 'express-rate-limit';

// import csurf from 'csurf';
// import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';

let app = express();

const logging = require("$logging").getLogger(__filename);

async function startServer() {
    app = await load(config)
    if (config.environment !== 'production') {
        // app.use(logger('dev'));
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/api/v1', routes);

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });

    app.use(limiter);
    app.use(mongoSanitize());

    // const csrfMiddleware = csurf({
    //     cookie: true
    // });

    // app.use(cookieParser());
    // app.use(csrfMiddleware);

    // mongoose.connect(config.connUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    //     .catch(error => console.log(error));

    if (config.environment !== 'production') {
        app.listen(config.port, () => {
            logging.info(`[HTTP/1.1] Shitty Server has started on ${config.baseUrl}:${config.port}`);
        });
    }
}

startServer();
