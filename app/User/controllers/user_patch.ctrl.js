import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User_model from '../models/user.model.js';
// import utl_jsend from '../../../helpers/json_send.utl.js';

/**
 * ### Controller `ctrl_user_patch()`
 * @access Private
 * @method PATCH
 * @route `/v1/users/:username`
 */
const ctrl_user_patch = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const { username: eup_user_username } = _request.params;
    const { password: eud_user_password, confirm_password: eud_user_confirm_password } =
      _request.body;

    // check if password and confirm password match:
    if (eud_user_password !== eud_user_confirm_password) {
      // send error response:
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('Password and confirm password do not match');
    }

    // database user query:
    const USER = await User_model.findOne({
      USER_USERNAME: eup_user_username,
    }).where({ FLAG_FREEZE: false });

    // check if user not exists:
    if (!USER) {
      // send error response:
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('User not found, try register or login');
    }

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default ctrl_user_patch;
