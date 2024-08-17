import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';

/**
 * ### Controller `ctrl_user_logout()`
 * @access Public
 * @method POST
 * @route `/v1/users/logout`
 */
const ctrl_user_logout = asyncHandler(async (_request, _response) => {
  try {
    // ------ START ------ //

    // TODO [cookie w/JWT] clear JWT cookie:

    // send success response:
    _response
      .status(StatusCodes.OK)
      .json({ message: 'User has been logged out.' });

    // ------ HANDLE ERRORS ------ //
  } catch (_error) {
    // send error response:
    _response.status(StatusCodes.BAD_REQUEST);
    throw new Error(_error.message);
  }

  // ------ END ------ //
});

export default ctrl_user_logout;
