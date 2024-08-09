/*!
 * act-notes
 * Copyright(c) 2024 Kareem Aboueid.
 * MIT Licensed
 */

import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';

// ROUTERS:
import user_router from './app/User/routes/user.router.js';
import note_router from './app/Note/routes/note.router.js';

// MIDDLEWARES:
import mdwr_handle_error from './middlewares/handle_errors.mdwr.js';

// ENVIRONMENT VARIABLES:
import { NODE_ENV, PORT } from './configs/env/env.cnfg.js';

// CONFIGS & DB:
import database_connect from './configs/db/database_connect.cnfg.js';
import server_listen from './configs/server/server_listen.cnfg.js';
import { path_strings } from './constants/path_strings.cnst.js';
import logger from './configs/logging/logger.cnfg.js';
import user_schema from './app/User/schemas/user.schema.js';
import note_schema from './app/Note/schemas/note.schema.js';

// APP INITIALIZATION:
const app = express();

// CONFIGS MIDDLEWARES:
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
  mongoose.set('debug', true);
  logger.env({ level: 'debug' });
  logger.is_schema_strict('User', note_schema.options.strict);
  logger.is_schema_strict('Note', user_schema.options.strict);
}

// SERVER ROUTERS:
app.use(path_strings.user.root, user_router);
app.use(path_strings.note.root, note_router);

// ERROR HANDLING:
app.use(mdwr_handle_error);

// RUN SERVER:
database_connect();
server_listen(app, PORT);
