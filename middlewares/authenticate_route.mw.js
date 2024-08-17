import asyncHandler from 'express-async-handler';

/**
 * ### Middleware for authenticating routes.
 */

const mw_authenticate_route = asyncHandler(
  async (_request, _response, _next) => {
    // ------ START ------ //
    // TODO [cookie w/JWT] protect routes with JWT cookie:
    _next();
    // ------ END ------ //
  },
);

export default mw_authenticate_route;
