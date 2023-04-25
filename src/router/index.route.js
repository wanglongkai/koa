const Router = require('@koa/router');

const IndexRouter = new Router();


// get /
IndexRouter.get('/', (ctx, next) => {
    ctx.body = 'this is IndexRouter';
})

module.exports = IndexRouter;