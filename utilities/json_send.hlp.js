import { getStatusMessage } from 'http-status-message';

/**
 * ### Ready-to-use object to set server response in JSend format.
 * @param {string} _status The response status.
 * @param {any} _data The response data.
 */

const hlp_jsend = (_status, _data) => {
  // ------ START ------ //

  // return the response object:
  const jsend_object = {
    message: 'Success',
    status: {
      code: _status,
      message: getStatusMessage(_status, 'short').message,
    },
    data: Array.isArray(_data) ? _data : [_data],
    results: Array.isArray(_data) ? _data.length : 1,
  };

  return jsend_object;

  // ------ END ------ //
};

export default hlp_jsend;
