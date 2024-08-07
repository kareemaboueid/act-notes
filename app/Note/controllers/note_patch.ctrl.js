import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Note_model from '../models/note.model.js';
import hlp_jsend from '../../../utilities/json_send.hlp.js';

/**
 * ### Note patch controller.
 * @access Private
 * @method PATCH
 * @route `/v1/notes?title=title`
 */

const ctrl_note_patch = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const { title: euq_note_title } = _request.query;

    const {
      title: eud_note_title,
      content: eud_note_content,
      status: eud_note_status,
      important: eud_note_importance,
    } = _request.body;

    // database note query:
    const DB_NOTE = await Note_model.findOne({ NOTE_TITLE: euq_note_title }).where(
      'this.FLAG_FREEZE === false && this.NOTE_FOLDER !== "trash"',
    );

    // check if note not exists:
    if (!DB_NOTE) {
      // send error response:
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('Note not found');
    }

    // patch note data:
    const note_patched = DB_NOTE.updateOne(
      {
        NOTE_TITLE: eud_note_title || DB_NOTE.NOTE_TITLE,
        NOTE_CONTENT: eud_note_content || DB_NOTE.NOTE_CONTENT,
        NOTE_STATUS: eud_note_status || DB_NOTE.NOTE_STATUS,
        NOTE_IMPORTANCE: eud_note_importance || DB_NOTE.NOTE_IMPORTANCE,
      },
      { new: true, runValidators: true },
    );

    // send success response:
    _response.status(StatusCodes.OK).json(hlp_jsend(StatusCodes.OK, note_patched));

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});
export default ctrl_note_patch;
