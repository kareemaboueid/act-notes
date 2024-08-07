import { body } from 'express-validator';

/** ### Validate route */
function vld_validate_route() {
  // ------ START ------ //

  return [
    body('fullname').notEmpty().optional().withMessage('Fullname is required'),
    body('email').notEmpty().optional().withMessage('Email is required'),
    body('username').notEmpty().optional().withMessage('Username is required'),
    body('password').notEmpty().optional().withMessage('Password is required'),
    body('confirm_password')
      .notEmpty()
      .optional()
      .withMessage('Confirm Password is required'),
  ];

  // ------ END ------ //
}

export default vld_validate_route;
