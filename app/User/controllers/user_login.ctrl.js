import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User_model from '../models/user.model.js';
import hlp_jsend from '../../../utilities/json_send.hlp.js';

/**
 * ### Controller `ctrl_user_login()`
 * @access Public
 * @method POST
 * @route `/v1/users/login`
 */
const ctrl_user_login = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const { username: eud_user_username, password: eud_user_password } = _request.body;

    // database user query:
    const USER = await User_model.findOne({
      USER_USERNAME: eud_user_username,
    }).where({ FLAG_FREEZE: false });

    // check if user not found:
    if (!USER) {
      // send error response:
      _response.status(StatusCodes.NOT_FOUND);
      throw new Error('User not found, try registering');
    }

    // check user credentials:
    const is_password_valid = await USER.validate_password(eud_user_password);

    // check if password not match:
    if (!is_password_valid) {
      // send error response:
      _response.status(StatusCodes.UNAUTHORIZED);
      throw new Error('User password is incorrect, try again');
    }

    // TODO [cookie w/JWT] save user info in secure httpOnly cookie w/ JWT:

    // send success response:
    _response.status(StatusCodes.OK).json(
      hlp_jsend(StatusCodes.OK, {
        message: `user @${eud_user_username} logged in successfully`,
      }),
    );

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default ctrl_user_login;
