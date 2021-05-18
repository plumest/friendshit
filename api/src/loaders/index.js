import WinstonLoader from './winston'

const ExpressLoader = require("./express");
const MongooseLoader = require("./mongoose");

module.exports = async (config) => {
    const app = await ExpressLoader();
    await WinstonLoader(app, config);
    await MongooseLoader(config);
    return app;
}
