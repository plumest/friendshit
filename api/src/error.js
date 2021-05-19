import {getLogger} from "./logger";

const logger = getLogger(__filename);
class BaseError extends Error {
    constructor (name, statusCode, isOperational, description) {
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this)
    }
}

function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}
function handler404 (req, res) {
    res.status(404);

    // respond with html page
    if (req.accepts("html")) {
        res.render("404", { url: req.url });
        return;
    }
    // respond with json
    if (req.accepts("json")) {
        res.send({ error: "Not found" });
        return;
    }

    // default to plain-text. send()
    return res.type("txt").send("Not found");
}
// eslint-disable-next-line no-unused-vars
function handlerGeneric(err, _, res, __) {
        logger.error(err.message);
        logger.verbose(err.stack);
        const httpErr = err;
        return res.status(httpErr.statusCode ?? 500).json(
        {
            error: httpErr.code ?? "Something broke!",
            message: err.message
        });
}

export {
    handler404, handlerGeneric, isOperationalError
}
