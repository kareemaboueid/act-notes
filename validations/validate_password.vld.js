import passwordValidator from 'password-validator';

/**
 * ### Validates a password
 * @param {string} _password The password to validate.
 */

const vld_validate_password = (_password) => {
  // ------ START ------ //

  // validation schema instance:
  const validatorSchema = new passwordValidator();

  // errors messages:
  const errorWarnings = {
    min: 'Password must be at least 8 characters',
    max: 'Password must be at most 16 characters',
    uppercase: 'Password must have at least 1 uppercase character',
    lowercase: 'Password must have at least 1 lowercase character',
    digits: 'Password must have at least 1 digit',
    symbols: 'Password must have at least 1 symbol of ! @ # $ % ^ & * ',
    spaces: 'Password must not have spaces',
  };

  // validation schema rules:
  const passwordRules = () => {
    validatorSchema
      .is()
      .min(8, errorWarnings.min)
      .is()
      .max(16, errorWarnings.max)
      .has()
      .uppercase(1, errorWarnings.uppercase)
      .has()
      .lowercase(1, errorWarnings.lowercase)
      .has()
      .digits(1, errorWarnings.digits)
      .has()
      .symbols(1, errorWarnings.symbols)
      .has()
      .not()
      .spaces(1, errorWarnings.spaces);

    return validatorSchema;
  };

  // validate password:
  const result = passwordRules().validate(_password, { details: true });

  // if password is valid:
  if (result.length > 0) {
    throw new Error(result.map((error) => error.message));
  }

  //  additional validation:
  if (
    _password.toLowerCase().includes('password') ||
    _password.toLowerCase().includes('12345678')
  ) {
    throw new Error('Password is unacceptable, please try another one.');
  }

  // ------ END ------ //
};

export default vld_validate_password;
