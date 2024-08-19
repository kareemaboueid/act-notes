import express from 'express';
import ctrl_user_create from '../controllers/user/user_create.ctrl.js';
import ctrl_user_login from '../controllers/user/user_login.ctrl.js';
import ctrl_user_logout from '../controllers/user/user_logout.ctrl.js';
import ctrl_user_get from '../controllers/user/user_get.ctrl.js';
import ctrl_user_patch from '../controllers/user/user_patch.ctrl.js';
import mw_authenticate_route from '../../middlewares/authenticate_route.mw.js';

/**
 * ## User Router
 * @description User router for user endpoints and controllers.
 * @route `/v1/users`
 * @endpoint `POST '/create'` - Create a new user by `ctrl_user_create()`
 * @endpoint `POST '/login'` - Login a user by `ctrl_user_login()`
 * @endpoint `POST '/logout'` - Logout a user by `ctrl_user_logout()`
 * @endpoint `GET '/:username'` - Get a user by `ctrl_user_get()`
 * @endpoint `PATCH '/:username'` - Patch a user data by `ctrl_user_patch()`
 */
const user_router = express.Router();

// TODO [sanitize] sanitize user input data:

user_router

  .post('/create', ctrl_user_create)

  .post('/login', ctrl_user_login)

  .post('/logout', ctrl_user_logout)

  .get('/:username', mw_authenticate_route, ctrl_user_get)

  .patch('/:username', mw_authenticate_route, ctrl_user_patch);

export default user_router;
