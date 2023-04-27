const Router = require('@koa/router');
const UploadController = require('../controller/upload.controller');

const UploadRouter = new Router();

UploadRouter.post('/', UploadController.smallFileUpload);

module.exports = UploadRouter;