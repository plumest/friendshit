import logging from "$logging";

const winston = require("winston");
require("winston-daily-rotate-file");
const expressWinston = require("express-winston");
export default async (app, config) => {
    const options = {
        file: {
            filename: "logs/http-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        },
        appFile: {
            filename: "logs/http-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        },
        console: {
            format: logging.format
        }
    };

    const expressWinstonOptions = {
        level: config.logLevel | 'silly',
        meta: false, // optional: control whether you want to log the meta data about the request (default to true)
        expressFormat: false // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    };

    const logger = winston.createLogger({transports: [new winston.transports.Console(options.console)]});

    // instantiate a new Winston Logger with the settings defined above
    logger.verbose("Initialising the logger engine... (ExpressWinston)")
    const consoleLogger = expressWinston.logger({
        winstonInstance: logger,
        msg: function(req, res) {
            return `${req.ip} | HTTP/${req.httpVersion} | ${req.method} ${req.url} ${res.statusCode} ${res.responseTime}ms | ${req.headers["user-agent"]}`;
        },
        colorize: true,
        ...expressWinstonOptions
    });
    const fileLogger = expressWinston.logger({
        format: logging.monoChromaticFormat,
        transports: [new winston.transports.DailyRotateFile(options.file)],
        msg: function(req, res) {
            return `${req.ip} | HTTP/${req.httpVersion} | ${req.method} ${req.url} ${res.statusCode} ${res.responseTime}ms | ${req.headers["user-agent"]}`;
        },
        colorize: false,
        ...expressWinstonOptions
    });
    app.use(consoleLogger);
    app.use(fileLogger);
};
