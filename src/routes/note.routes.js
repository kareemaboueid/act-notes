import express from 'express';
import ctrl_note_create from '../controllers/note/note_create.ctrl.js';
import ctrl_note_get_all from '../controllers/note/note_get_all.ctrl.js';
import ctrl_note_get from '../controllers/note/note_get.ctrl.js';
import ctrl_note_patch from '../controllers/note/note_patch.ctrl.js';
import mw_authenticate_route from '../../middlewares/authenticate_route.mw.js';

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

  .post('/', mw_authenticate_route, ctrl_note_create)

  .get('/', mw_authenticate_route, ctrl_note_get)

  .patch('/', mw_authenticate_route, ctrl_note_patch)

  .get('/', mw_authenticate_route, ctrl_note_get_all);

export default note_router;
