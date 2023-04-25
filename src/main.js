const Koa = require('koa');
const Router = require('@koa/router');
const path = require('path');
const static = require('koa-static');
const mount = require('koa-mount');

const {APP_PORT} = require('./config/config.default');

const App = new Koa();
const router = new Router();

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

App.use(router.routes()).use(router.allowedMethods());

router.get('/', (ctx, next) => {
    ctx.body = 'koa router get /';
    next();
})


App.listen(APP_PORT, () => {
    console.log(`server in running at http://localhost:${APP_PORT}`);
});