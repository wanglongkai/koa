const path = require('path');
class UploadController {
    async smallFileUpload(ctx, next) {
        const file = ctx.request.files.file;
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