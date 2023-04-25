const Router = require('@koa/router');
const UserController = require('../controller/user.controller');
const UserRouter = new Router({prefix: '/users'});


// get /users/
UserRouter.get('/', UserController.register);

module.exports = UserRouter;