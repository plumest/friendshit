import config from './config.js'
import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(config.connUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .catch(error => console.log(error));

if (config.environment !== 'production') {
  app.use(logger('dev'));
}

app.use('/api/v1', routes.users);

app.listen(config.port, () => {
  console.log(`Server is running on ${config.baseUrl}:${config.port}/`);
});