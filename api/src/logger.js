const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");
const winstonTimestampColorize = require("winston-timestamp-colorize");
const options = {
    appFile: {
        filename: "logs/app-%DATE%.log",
        datePattern: "YYYY-MM-DD-HH",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d"
    }
};

const getFormatter = moduleName =>
    winston.format.combine(
        winston.format.splat(),
        winston.format.colorize(),
        winston.format.label({
            label: moduleName
                ? moduleName
                : path.basename(process.mainModule.filename)
        }),
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSSS"
        }),
        winstonTimestampColorize({ color: "gray" }),
        winston.format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} ${level} [${label}]: ${message}`;
        })
    );

const getNonColorisedFormatter = moduleName =>
    winston.format.combine(
        winston.format.splat(),
        winston.format.label({
            label: moduleName
                ? moduleName
                : path.basename(process.mainModule.filename)
        }),
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSSS"
        }),
        winston.format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} ${level} [${label}]: ${message}`;
        })
    );

module.exports = {
    format: getFormatter(),
    monoChromaticFormat: getNonColorisedFormatter(),
    getLogger: moduleName => {
        moduleName = path.basename(moduleName);
        winston.loggers.add(moduleName, {
            transports: [
                new winston.transports.Console({ format: getFormatter(moduleName) }),
                new winston.transports.DailyRotateFile({
                    ...options.appFile,
                    format: getNonColorisedFormatter(moduleName)
                })
            ],
            level: process.env.LOG_LEVEL,
            defaultMeta: { moduleName },
            exitOnError: false
        });
        return winston.loggers.get(moduleName);
    }
};
