const Router = require('@koa/router');
const UserController = require('../controller/user.controller');
const UserRouter = new Router({ prefix: '/users' });
const { userValidator, verifyUser, cryptPassword } = require('../middleware/user.middleware');


// post /users/
UserRouter.post('/', userValidator, verifyUser, cryptPassword, UserController.register);

module.exports = UserRouter;