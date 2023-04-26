const Router = require('@koa/router');
const UserController = require('../controller/user.controller');
const UserRouter = new Router({ prefix: '/users' });
const { userValidator, verifyUser } = require('../middleware/user.middleware');


// post /users/
UserRouter.post('/', userValidator, verifyUser, UserController.register);

module.exports = UserRouter;