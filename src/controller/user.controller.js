const { createUser } = require('../service/user.service');
class UserController{
    async register(ctx, next){
        const userInfo = ctx.request.body;
        const res = await createUser(userInfo);
        ctx.body = res;
    }
}

module.exports = new UserController;