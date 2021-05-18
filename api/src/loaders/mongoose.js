import mongoose from "mongoose";

async function connectMongoDB(config) {
    mongoose.connect(config.connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .catch(error => console.log(error));
}


module.exports = connectMongoDB;
