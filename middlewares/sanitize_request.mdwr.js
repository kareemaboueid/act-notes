import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { body } from 'express-validator';
import utl_error_send from '../utilities/error_send.hlp.js';

/** ### Middleware for sanitizing requests. */

const mdwr_sanitize_request = asyncHandler(async (_request, _response, _next) => {
  // ------ START ------ //

  const validations = [
    body('fullname').notEmpty().optional().withMessage('Fullname is required'),
    body('email').notEmpty().optional().withMessage('Email is required'),
    body('username').notEmpty().optional().withMessage('Username is required'),
    body('password').notEmpty().optional().withMessage('Password is required'),
    body('confirm_password')
      .notEmpty()
      .optional()
      .withMessage('Confirm Password is required'),
  ];

  validations.forEach(async (validation) => {
    const result = await validation.run(_request);

    if (!result.isEmpty()) {
      _response
        .status(StatusCodes.BAD_REQUEST)
        .json(utl_error_send(StatusCodes.BAD_REQUEST, result.array()));
    }
  });

  // ------ END ------ //
});

export default mdwr_sanitize_request;
