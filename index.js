/*!
 * act-notes
 * Copyright(c) 2024 Kareem Aboueid.
 * MIT Licensed
 */

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';

// ROUTERS:
import user_router from './src/routes/user.routes.js';
import note_router from './src/routes/note.routes.js';

// MIDDLEWARES:
import mw_handle_global_errors from './middlewares/handle_global_errors.mw.js';

// ENVIRONMENT VARIABLES:
import { DB_URI, NODE_ENV, PORT } from './configs/env.cnfg.js';

// CONFIGS & DB:
import database_connect from './database/connection/database_connect.js';
import server_listen from './configs/server_listen.cnfg.js';
import logger from './logging/logger.js';

// APP INITIALIZATION:
export const app = express();

// CONFIGS MIDDLEWARES:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
if (NODE_ENV === 'development') {
  mongoose.set('debug', true);
  app.use(morgan('dev'));
  logger.node_env({ level: 'debug' });
}

// GET BASE URL:
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the act-notes API!' });
});

// SERVER ROUTERS:
app.use('/v1/users', user_router);
app.use('/v1/notes', note_router);

// ERROR HANDLING:
app.use(mw_handle_global_errors);

// RUN SERVER:
database_connect(DB_URI);
server_listen(app, PORT);
