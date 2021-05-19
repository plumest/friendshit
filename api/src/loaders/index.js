import WinstonLoader from './winston'

const ExpressLoader = require("./express");
const MongooseLoader = require("./mongoose");

module.exports = async (config) => {
    const app = await ExpressLoader(config);
    await WinstonLoader(app, config);
    await MongooseLoader(config);
    return app;
}
