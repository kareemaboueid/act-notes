import { StatusCodes } from 'http-status-codes';
import utl_error_send from '../utilities/error_send.utl.js';

/**
 * ### Middleware for handling errors.
 */

const mdwr_handle_error = (_error, _request, _response, _next) => {
  // ------ START ------ //

  // specify the status code incoming from the error object
  const specify_status = () => {
    if (_response.statusCode === StatusCodes.OK) return StatusCodes.INTERNAL_SERVER_ERROR;
    return _response.statusCode;
  };

  // initialize error code and message
  let error_code = specify_status();
  let error_message = _error.message;
  const error_stack = _error.stack;

  ///////////////////////////////////////////////

  // check error comming from mongoose { name: CastError, kind: ObjectId }
  if (_error.name === 'CastError' && _error.kind === 'ObjectId') {
    error_code = StatusCodes.NOT_FOUND;
    error_message = `[Mongoose: Cast Error] Invalid ${_error.path}: ${_error.value}`;
  }

  ///////////////////////////////////////////////

  // check error comming from mongoose { name: ValidationError }
  if (_error.name === 'ValidationError') {
    const validationWarning = Object.values(_error.errors).map((value) => value.message);
    const validationField = Object.values(_error.errors).map((value) => value.path);
    error_code = StatusCodes.BAD_REQUEST;
    error_message = `[Schema Validation] ${validationField.join(', ')}: ${validationWarning.join(', ')}`;
  }

  ///////////////////////////////////////////////

  // check errors for general not found resources
  if (error_code === StatusCodes.NOT_FOUND) {
    error_code = StatusCodes.NOT_FOUND;
    error_message = `The requested resource was not found: ${_request.originalUrl}`;
  }

  ///////////////////////////////////////////////

  // ------ HANDLE ERRORS ------ //
  _response
    .status(error_code)
    .json(utl_error_send(error_code, error_message, error_stack));

  _next();

  // ------ END ------ //
};

export default mdwr_handle_error;
