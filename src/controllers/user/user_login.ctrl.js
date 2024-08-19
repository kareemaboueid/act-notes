import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import User_model from '../../models/user.model.js';
import res_jsend from '../../../res/jsend.res.js';
import sign_jwt from '../../../jwt/sign_token.jwt.js';
import { JWT_NAME, NODE_ENV } from '../../../configs/env.cnfg.js';

/**
 * ### ctrl_user_login
 * @access Public
 * @method POST
 * @route `/v1/users/login`
 */
const ctrl_user_login = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // get data from client:
    const { username: eud_user_username, password: eud_user_password } =
      _request.body;

    // database user query:
    const DB_USER = await User_model.findOne({
      USER_USERNAME: eud_user_username,
    }).where({ FLAG_FREEZE: false });

    // check if user not found:
    if (!DB_USER) {
      // send error response:
      _response.status(StatusCodes.NOT_FOUND);
      throw new Error('User not found, try registering');
    }

    // check user credentials:
    const is_password_valid =
      await DB_USER.validate_password(eud_user_password);

    // check if password not match:
    if (!is_password_valid) {
      // send error response:
      _response.status(StatusCodes.UNAUTHORIZED);
      throw new Error('User password is incorrect, try again');
    }

    // signed token:
    const signed_token = sign_jwt({ username: eud_user_username }, '30d');

    // save JWT in http-cookie of the response:
    _response.cookie(JWT_NAME, signed_token, {
      httpOnly: true,
      secure: NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 90 * 24 * 60 * 60 * 1000,
    });

    // send success response:
    _response.status(StatusCodes.OK).json(
      res_jsend(StatusCodes.OK, {
        message: 'User logged in successfully',
        username: `@${eud_user_username}`,
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
