import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configs/env/env.cnfg.js';

/**
 * ### utl_sign_jwt: Sign JWT data.
 * @param {object} _payload - Payload data to sign.
 * @param {string} _expiresIn - Expiry time for the JWT token.
 * @returns {string} Signed JWT token.
 * @example
 * ```javascript
 * const signed_jwt_token = utl_sign_jwt({ username: 'JohnDoe' }, '30d');
 * ```
 */

const utl_sign_jwt = (_payload, _expiresIn) => {
  // ------ START ------ //

  // sanitazion:
  if (!_payload) throw new Error('Payload is required');
  if (!_expiresIn) throw new Error('ExpiresIn is required');

  // validation:
  if (typeof _payload !== 'object') throw new Error('Payload must be an object');
  if (typeof _expiresIn !== 'string') throw new Error('ExpiresIn must be a string');

  // signed JWT token
  const sign_jwt_token = jwt.sign(_payload, JWT_SECRET, { expiresIn: _expiresIn });

  return sign_jwt_token;

  // ------ END ------ //
};

export default utl_sign_jwt;
