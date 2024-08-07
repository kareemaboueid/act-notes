import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User_model from '../models/user.model.js';
import hlp_jsend from '../../../utilities/json_send.hlp.js';

/**
 * ### Controller `ctrl_user_create()`
 * @access Public
 * @method POST
 * @route `/v1/users/create`
 */
const ctrl_user_create = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const {
      fullname: eud_user_fullname,
      email: eud_user_email,
      username: eud_user_username,
      password: eud_user_password,
      // confirm_password: eud_user_confirm_password,
    } = _request.body;

    // check if passwords match:
    // if (eud_user_password !== eud_user_confirm_password) {
    //   _response.status(StatusCodes.BAD_REQUEST);
    //   throw new Error('Passwords do not match, try again');
    // }

    // database user query:
    const USER = await User_model.findOne({
      USER_USERNAME: eud_user_username,
    }).where({ FLAG_FREEZE: false });

    // check if user exists:
    if (USER) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('User already exists, try again');
    }

    // create new user in database:
    await User_model.create({
      USER_FULLNAME: eud_user_fullname,
      USER_EMAIL: eud_user_email,
      USER_USERNAME: eud_user_username,
      USER_PASSWORD: eud_user_password,
    });

    // TODO [cookie w/JWT] save the new user info in secure httpOnly cookie w/ JWT:

    // send success response:
    _response
      .status(StatusCodes.CREATED)
      .json(hlp_jsend(StatusCodes.CREATED, { message: 'User created successfully' }));

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default ctrl_user_create;
