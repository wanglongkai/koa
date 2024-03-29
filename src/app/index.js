const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const mount = require('koa-mount');
const { koaBody } = require('koa-body');
const errHandler = require('./errHandler')
const Router = require('../router');
const { accessLogger } = require('../utils/logger');


const App = new Koa();
// 注册全局日志记录
App.use(accessLogger())

// 注册静态资源托管中间件
App.use(
    mount('/static', static(path.resolve(__dirname, '../public')))
);

// 注册body解析中间件
App.use(koaBody({
    multipart: true, // 支持文件上传
    formidable: {
        uploadDir: path.resolve(__dirname, '../upload'), // 文件上传缓存路径，业务真正执行分件管理后，需要删除
        keepExtensions: true, // 保留文件后缀名
        filename: (name, ext) => { // 重命名保存名称
            return `${new Date().getTime()}-${name}${ext}`
        }
    }
}));

// 注册路由
App.use(Router.routes()).use(Router.allowedMethods());


// 统一的错误处理
App.on('error', errHandler)

module.exports = App;

