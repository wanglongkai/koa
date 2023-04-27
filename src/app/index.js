const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const mount = require('koa-mount');
const { koaBody } = require('koa-body');
const errHandler = require('./errHandler')
const Router = require('../router');

const App = new Koa();

// 注册静态资源托管中间件
App.use(
    mount('/static', static(path.resolve(__dirname, '../public')))
);

// 注册body解析中间件
App.use(koaBody());

// 注册路由
App.use(Router.routes()).use(Router.allowedMethods());


// 统一的错误处理
App.on('error', errHandler)

module.exports = App;

