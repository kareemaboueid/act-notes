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
import { user_router, user_endpoints } from './src/routes/user/user.routes.js';
import { note_router, note_endpoints } from './src/routes/note/note.routes.js';

// MIDDLEWARES:
import mw_handle_global_errors from './middlewares/handle_global_errors.mw.js';

// ENVIRONMENT VARIABLES:
import { NODE_ENV, PORT } from './configs/env.cnfg.js';

// CONFIGS & DB:
import database_connect from './database/connect/database_connect.js';
import server_listen from './configs/server_listen.cnfg.js';
import logger from './logging/logger.js';
import user_schema from './src/schemas/user/user.schema.js';
import note_schema from './src/schemas/note/note.schema.js';
import user_db_naming from './database/namings/user_naming.js';
import note_db_naming from './database/namings/note_naming.js';

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
  logger.node_env({ level: 'debug' });
  logger.is_schema_strict(user_db_naming.M, note_schema.options.strict);
  logger.is_schema_strict(note_db_naming.M, user_schema.options.strict);
}

// SERVER ROUTERS:
app.use(user_endpoints.root, user_router);
app.use(note_endpoints.root, note_router);

// ERROR HANDLING:
app.use(mw_handle_global_errors);

// RUN SERVER:
database_connect();
server_listen(app, PORT);
