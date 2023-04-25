const Router = require('@koa/router');
const UserController = require('../controller/user.controller');
const UserRouter = new Router({prefix: '/users'});


// post /users/
UserRouter.post('/', UserController.register);

module.exports = UserRouter;