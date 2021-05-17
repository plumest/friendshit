const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const flash = require("connect-flash");
const appRootPath = require("app-root-path");

module.exports = async () => {
    const app = express();
    app.use(helmet());
    app.set("trust proxy", 1);
    app.set("views", path.join(appRootPath.toString(), "src/views"));
    app.set("view engine", "ejs");
    app.use(cors());
    app.use(flash());
    return app;
};
