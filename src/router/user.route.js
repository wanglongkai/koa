const Router = require('@koa/router');
const UserController = require('../controller/user.controller');
const UserRouter = new Router({ prefix: '/users' });
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware');
const { auth } = require('../middleware/auth.middleware');


// post /users/
UserRouter.post('/', auth, userValidator, verifyUser, cryptPassword, UserController.register);
UserRouter.post('/login', userValidator, verifyLogin, UserController.login);

module.exports = UserRouter;