const Router = require('@koa/router');
const IndexController = require('../controller/index.controller');

const IndexRouter = new Router();

IndexRouter.get('/', IndexController.register);

module.exports = IndexRouter;