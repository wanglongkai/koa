const path = require('path');
const { logger } = require('../utils/logger')
class UploadController {
    async smallFileUpload(ctx, next) {
        const file = ctx.request.files.file;
        logger.error('我是错误');
        logger.info(file.filepath);
        if (file) {
            ctx.body = {
                code: 0,
                message: '文件上传成功',
                result: {
                    savedname: path.basename(file.filepath),
                    size: file.size
                }
            }
        }
    }
}

module.exports = new UploadController;