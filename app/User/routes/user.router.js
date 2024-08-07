import express from 'express';
import ctrl_user_create from '../controllers/user_create.ctrl.js';
import ctrl_user_login from '../controllers/user_login.ctrl.js';
import ctrl_user_logout from '../controllers/user_logout.ctrl.js';
import ctrl_user_get from '../controllers/user_get.ctrl.js';
import ctrl_user_patch from '../controllers/user_patch.ctrl.js';
import mdwr_authenticate_route from '../../../middlewares/authenticate_route.mdwr.js';
import { path_strings } from '../../../constants/path_strings.cnst.js';

/**
 * ## User Router
 * @route `/v1/users`
 * @controller `ctrl_user_create()` POST `/v1/users/create`
 * @controller `ctrl_user_login()` POST `/v1/users/login`
 * @controller `ctrl_user_logout()` POST `/v1/users/logout`
 * @controller `ctrl_user_get()` GET `/v1/users/:username`
 * @controller `ctrl_user_patch()` PATCH `/v1/users/:username`
 */
const user_router = express.Router();

// TODO [validate] validate and sanitize user input data:
user_router.post(path_strings.user.create, ctrl_user_create);

user_router.post(path_strings.user.login, ctrl_user_login);

user_router.post(path_strings.user.logout, ctrl_user_logout);

user_router.get(path_strings.user.username, mdwr_authenticate_route, ctrl_user_get);

user_router.patch(path_strings.user.username, mdwr_authenticate_route, ctrl_user_patch);

export default user_router;
