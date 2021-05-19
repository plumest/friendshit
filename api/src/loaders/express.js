import csurf from 'csurf';
import cookieParser from 'cookie-parser'
import cors from "cors";
import router from "../routes";

const express = require("express");
const helmet = require("helmet");

const path = require("path");
const appRootPath = require("app-root-path");

module.exports = async (config) => {
    const csrfMiddleware = csurf({ cookie: true });
    const app = express();

    app.use(cookieParser())
    app.use(helmet());
    app.use(cors({
        origin: (origin, callback) => {
            if(!origin && config.environment === 'development') callback(null, true)
            else {
                if (config.whitelistUrls.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            }
        },
        credentials: true
    }));

    app.use(csrfMiddleware);
    app.set("trust proxy", 1);
    // app.set("views", path.join(appRootPath.toString(), "src/views"));
    // app.set("view engine", "ejs");
    return app;
};
