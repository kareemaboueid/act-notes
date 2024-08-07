import asyncHandler from 'express-async-handler';

/**
 * ### Middleware for authenticating routes.
 */

const mdwr_authenticate_route = asyncHandler(async (_request, _response, _next) => {
  // ------ START ------ //
  // TODO [cookie w/JWT] protect routes with JWT cookie:
  _next();
  // ------ END ------ //
});

export default mdwr_authenticate_route;
