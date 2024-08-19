import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Note_model from '../../models/note.model.js';
import res_jsend from '../../../res/jsend.res.js';

/**
 * ### Note get all controller.
 * @access Private
 * @method GET
 * @route `/v1/notes?all=true`
 */

const ctrl_note_get_all = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // database all notes:
    const DB_ALL_NOTES = await Note_model.find().where(
      'this.FLAG_FREEZE === false && this.NOTE_FOLDER !== "trash"',
    );

    // check if notes not exists:
    if (!DB_ALL_NOTES) {
      // send error response:
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('No notes found');
    }

    // send success response:
    _response
      .status(StatusCodes.OK)
      .json(res_jsend(StatusCodes.OK, DB_ALL_NOTES));

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});
export default ctrl_note_get_all;
