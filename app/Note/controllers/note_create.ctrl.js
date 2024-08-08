import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Note_model from '../models/note.model.js';
import User_model from '../../User/models/user.model.js';
import utl_jsend from '../../../utilities/json_send.utl.js';

/**
 * ### Note create controller.
 * @access Private
 * @method POST
 * @route `/v1/notes`
 */

const ctrl_note_create = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const {
      title: eud_note_title,
      content: eud_note_content,
      status: eud_note_status,
      importance: eud_note_importance,
      // TEMP [cookie w/JWT] get user from saved cookie w/ JWT:
      author: eud_note_author,
    } = _request.body;

    // database user query:
    const DB_USER = await User_model.findOne({
      USER_USERNAME: eud_note_author,
    }).where({ FLAG_FREEZE: false });

    // check if user not exists:
    // TEMP [cookie w/JWT] get user from saved cookie w/ JWT:
    if (!DB_USER) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('Author not found, try register or login');
    }

    // database Note query:
    const DB_NOTE = await Note_model.findOne({
      NOTE_TITLE: eud_note_title,
    }).where({ FLAG_FREEZE: false, NOTE_FOLDER: { $ne: 'trash' } });

    // check if note exists:
    if (DB_NOTE) {
      // send error response:
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('Title reserved to another note, try different title');
    }

    // handle if note not exists:

    // note payload:
    const note_payload = {
      NOTE_TITLE: eud_note_title,
      NOTE_CONTENT: eud_note_content,
      NOTE_STATUS: eud_note_status,
      NOTE_IMPORTANCE: eud_note_importance,
      // TEMP [cookie w/JWT] get user from saved cookie w/ JWT:
      createdBy: DB_USER._id,
    };

    // create note in database:
    const new_note = await Note_model.create(note_payload);

    // send success response:
    _response.status(StatusCodes.CREATED).json(utl_jsend(StatusCodes.CREATED, new_note));

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});
export default ctrl_note_create;
