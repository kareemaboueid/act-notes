import express from 'express';
import ctrl_note_create from '../controllers/note_create.ctrl.js';
import ctrl_note_get_all from '../controllers/note_get_all.ctrl.js';
import ctrl_note_get from '../controllers/note_get.ctrl.js';
import ctrl_note_patch from '../controllers/note_patch.ctrl.js';
import mdwr_authenticate_route from '../../../middlewares/authenticate_route.mdwr.js';
import { path_strings } from '../../../constants/path_strings.cnst.js';

/**
 * ## Note Router
 * @route `/v1/notes`
 * @controller `ctrl_note_create()` POST `/v1/notes`
 * @controller `ctrl_note_get()` GET `/v1/notes`
 * @controller `ctrl_note_patch()` PATCH `/v1/notes`
 * @controller `ctrl_note_get_all()` GET `/v1/notes`
 */
const note_router = express.Router();

note_router.post(path_strings.note.self, mdwr_authenticate_route, ctrl_note_create);
note_router.get(path_strings.note.self, mdwr_authenticate_route, ctrl_note_get);
note_router.patch(path_strings.note.self, mdwr_authenticate_route, ctrl_note_patch);
note_router.get(path_strings.note.self, mdwr_authenticate_route, ctrl_note_get_all);

export default note_router;
