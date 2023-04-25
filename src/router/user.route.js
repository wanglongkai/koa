const Router = require('@koa/router');

const UserRouter = new Router({prefix: '/users'});


// get /users/
UserRouter.get('/', (ctx, next) => {
    ctx.body = 'this is UserRouter';
})

module.exports = UserRouter;