const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const mount = require('koa-mount');

const UserRouter = require('../router/user.route');
const IndexRouter = require('../router/index.route');

const App = new Koa();

App.use(
    mount('/static', static(path.resolve(__dirname, '../public')))
);

App.use(UserRouter.routes()).use(UserRouter.allowedMethods());
App.use(IndexRouter.routes()).use(IndexRouter.allowedMethods());

module.exports = App;

