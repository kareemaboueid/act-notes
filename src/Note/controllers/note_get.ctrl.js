import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Note_model from '../models/note.model.js';
import res_jsend from '../../../res/jsend.res.js';

/**
 * ### Note get controller.
 * @access Private
 * @method GET
 * @route `/v1/notes?title=title`
 */

const ctrl_note_get = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const { title: euq_note_title } = _request.query;

    // find note by title:
    const DB_NOTE = await Note_model.findOne({
      NOTE_TITLE: euq_note_title,
    }).where('this.FLAG_FREEZE === false && this.NOTE_FOLDER !== "trash"');

    // check if note not exists:
    if (!DB_NOTE) {
      // send error response:
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('Note not found');
    }

    // send success response:
    _response.status(StatusCodes.OK).json(res_jsend(StatusCodes.OK, DB_NOTE));

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default ctrl_note_get;
