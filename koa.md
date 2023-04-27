# Koa笔记
## Koa的优势
1. 使用async函数，丢弃回调函数
2. 增强了错误处理
3. koa本身没有捆绑任何中间件，而是提供一套优雅的方法来扩展中间件


## Koa的路由
koa本身是没有路由功能的，需要自定义实现。    
推荐koa的官方路由中间件：**@koa/router**    
```javascript
const Koa = require('koa');
const Router = require('@koa/router');

const App = new Koa();
const router = new Router();

App.use(router.routes()).use(router.allowedMethods());

router.get('/', ctx => {
    ctx.body = 'koa router get /';
})

App.listen(3000);
```

## Koa的静态资源托管
推荐koa官方的静态资源托管中间件：**koa-static**   
1. 推荐使用绝对路径，path模块
2. 使用`koa-mount`给静态资源路径取个别名
```javascript
const path = require('path');
const static = require('koa-static');
const mount = require('koa-mount');

App.use(
    mount('/static', static(path.join(__dirname, './public')))
);
``` 

## Koa中间件执行栈
koa中间件以一种**先进后出**的栈结构执行的。俗称**洋葱模型**。    
`next`用于会交出中间件的执行权，然后执行中间件列表中的下一个中间件，等下一个中间件出栈后，再执行当前中间件。    
比如绑定了如下三个中间件，他们的执行顺序是：
```javascript
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

App.use(one).use(two).use(three);

/**
>> one
>> two
>> three
<< three
<< two
<< one
*/
```

## 多个中间件合并处理
通过**koa-compose**处理。
```javascript
const compose = require('koa-compose');
App.use(compose([one, two, three]));
```

## Koa异常处理
**方案一**：使用最外层中间件捕获异常（基于koa的洋葱模型）    
```javascript
App.use(async (ctx, next) => {
    try{
        await next();
    }catch(err){
        ctx.status = 500;
        ctx.body = err.message;
    }
})
```
**方案二**：添加'error'事件监听`app.on('error', callback)`
```javascript
App.on('error', err => {
    console.log('app error', err);
})
```
Koa异常处理的注意点：    
1. 中间件推荐使用标准写法，因为异步错误需要通过`async/await`方式才能向外抛出来，顶层中间件或者error事件监听才能接收到。
   ```javascript
   App.use(async (ctx, next) => {
        await next()
   })
   ```
2. 当同时使用了`顶层错误处理中间件`又使用了`error事件监听`时，需要在`顶层中间件`触发error事件监听，不然顶层处理了，就不会触发error事件监听。
   ```javascript
    App.use(async (ctx, next) => {
        try{
            await next();
        }catch(err){
            ctx.status = 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx); // 透传异常，根据情况判断有无需要
        }
    })
   ```

## Koa请求解析中间件
**koa-body**

## koa常用中间件
```json
  {
    "@koa/router": "^12.0.0", // 路由
    "bcryptjs": "^2.4.3", // 加密
    "dotenv": "^16.0.3", // 环境变量获取
    "jsonwebtoken": "^9.0.0", // token颁发
    "koa-body": "^6.0.1", // 请求体解析，支持文件上传等很多功能
    "koa-compose": "^4.1.0", // 组合中间件为一个中间件
    "koa-mount": "^4.0.0", // 重命名
    "koa-static": "^5.0.0", // 静态资源配置
    "mysql2": "^3.2.4", // mysql数据库驱动
    "sequelize": "^6.31.0" // sequelize ORM数据库映射
  }
```



