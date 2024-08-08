import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User_model from '../models/user.model.js';
import utl_jsend from '../../../utilities/json_send.utl.js';

/**
 * ### Controller `ctrl_user_get()`
 * @access Private
 * @method GET
 * @route `/v1/users/:username`
 */
const ctrl_user_get = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const { username: eup_user_username } = _request.params;

    // database user query:
    const USER = await User_model.findOne({
      USER_USERNAME: eup_user_username,
    }).where({ FLAG_FREEZE: false });

    // check if user not exists:
    if (!USER) {
      // send error response:
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('User not found');
    }

    // send success response:
    _response
      .status(StatusCodes.OK)
      .json(utl_jsend(StatusCodes.OK, await USER.exclude('USER_PASSWORD')));

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default ctrl_user_get;
