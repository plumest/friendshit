const ExpressLoader = require("./express");
const MongooseLoader = require("./mongoose");
const config = require('../config.js')

module.exports = async () => {
    const app = await ExpressLoader();
    await MongooseLoader(config);
    return app;
}
