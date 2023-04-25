const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const mount = require('koa-mount');
const UserRouter = require('./router/user.route');
const IndexRouter = require('./router/index.route');
const {APP_PORT} = require('./config/config.default');

const App = new Koa();

App.use(async (ctx, next) => {
    try{
        await next();
    }catch(err){
        ctx.status = 500;
        ctx.body = err.message;
    }
})
App.on('error', err => {
    console.log('app error', err);
})

App.use(
    mount('/static', static(path.resolve(__dirname, '../public')))
);

App.use(UserRouter.routes()).use(UserRouter.allowedMethods());
App.use(IndexRouter.routes()).use(IndexRouter.allowedMethods());


App.listen(APP_PORT, () => {
    console.log(`server in running at http://localhost:${APP_PORT}`);
});