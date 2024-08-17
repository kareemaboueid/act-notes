import express from 'express';
import ctrl_note_create from '../../controllers/note/note_create.ctrl.js';
import ctrl_note_get_all from '../../controllers/note/note_get_all.ctrl.js';
import ctrl_note_get from '../../controllers/note/note_get.ctrl.js';
import ctrl_note_patch from '../../controllers/note/note_patch.ctrl.js';
import mw_authenticate_route from '../../../middlewares/authenticate_route.mw.js';

/**
 * ### Note Endpoints
 * @description Note endpoints for note routes.
 */
const note_endpoints = {
  /** @name root - `/v1/notes` */
  root: String('/v1/notes'),
  /** @name self - `/` */
  self: String('/'),
};

/**
 * ## Note Router
 * @description Note router for note endpoints and controllers.
 * @route `/v1/notes`
 * @endpoint `POST '/'` - Create a new note by `ctrl_note_create()`
 * @endpoint `GET '/'` - Get all notes by `ctrl_note_get_all()`
 * @endpoint `GET '/'` - Get a note by `ctrl_note_get()`
 */
const note_router = express.Router();

// TODO [sanitize] sanitize user input data:

note_router

  .post(note_endpoints.self, mw_authenticate_route, ctrl_note_create)

  .get(note_endpoints.self, mw_authenticate_route, ctrl_note_get)

  .patch(note_endpoints.self, mw_authenticate_route, ctrl_note_patch)

  .get(note_endpoints.self, mw_authenticate_route, ctrl_note_get_all);

export { note_router, note_endpoints };
