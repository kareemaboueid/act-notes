import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User_model from '../models/user.model.js';
import res_jsend from '../../../res/jsend.res.js';

/**
 * ### ctrl_user_create
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

    // database user query:
    const db_user = await User_model.findOne({
      USER_USERNAME: eud_user_username,
    }).where({ FLAG_FREEZE: false });

    // check if user exists:
    if (db_user) {
      _response.status(StatusCodes.BAD_REQUEST);
      throw new Error('User already exists, try again');
    }

    // define user payload:
    const user_payload = {
      USER_FULLNAME: eud_user_fullname,
      USER_EMAIL: eud_user_email,
      USER_USERNAME: eud_user_username,
      USER_PASSWORD: eud_user_password,
    };

    // create new user in database:
    const created_user = await User_model.create(user_payload);

    // send success response:
    _response.status(StatusCodes.CREATED).json(
      res_jsend(StatusCodes.CREATED, {
        message: 'User created successfully',
        user: await created_user.exclude('USER_PASSWORD'),
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

export default ctrl_user_create;
