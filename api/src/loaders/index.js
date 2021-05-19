import WinstonLoader from './winston'
import MongooseLoader from "./mongoose";
import ExpressLoader from "./express";

export default async (config) => {
    const app = await ExpressLoader(config);
    await WinstonLoader(app, config);
    await MongooseLoader(config);
    return app;
}
