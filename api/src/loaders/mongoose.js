import mongoose from "mongoose";
const logging = require("$logging").getLogger(__filename);

async function connectMongoDB(config) {
    try {
        await mongoose.connect(config.connUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
        logging.info(
            `Connected to database (MongoDB), using credentials`
        );
    } catch (e) {
        logging.error(e)
    }
}


export default connectMongoDB;
