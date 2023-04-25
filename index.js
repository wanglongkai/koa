const Koa = require('koa');
const Router = require('@koa/router');

const path = require('path');
const static = require('koa-static');
const mount = require('koa-mount');

const compose = require('koa-compose');

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
    mount('/static', static(path.join(__dirname, './public')))
);

App.use(router.routes()).use(router.allowedMethods());

router.get('/', (ctx, next) => {
    ctx.body = 'koa router get /';
    next();
})

const one = (ctx, next) => {
    console.log('>> one');
    next();
    console.log('<< one');
}
const two = (ctx, next) => {
    console.log('>> two');
    next();
    console.log('<< two');
}
const three = (ctx, next) => {
    console.log('>> three');
    next();
    console.log('<< three');
}

App.use(compose([one, two, three]));

App.listen(3000);