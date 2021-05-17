import config from './config.js'
import cors from 'cors';
import helmet from "helmet";
import logger from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
const load = require('loaders/index')
import routes from './routes/index.js';
import bodyParser from "body-parser";

let app = express();

async function startServer() {
  app = await load()
  if (config.environment !== 'production') {
    app.use(logger('dev'));
  }
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use('/api/v1', routes.users);

  app.listen(config.port, () => {
    console.log(`Server is running on ${config.baseUrl}:${config.port}/`);
  });
}

startServer();





