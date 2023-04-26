const { createUser } = require('../service/user.service');
class UserController{
    async register(ctx, next){
        const userInfo = ctx.request.body;
        const res = await createUser(userInfo);
        ctx.body =  {
            code: 0,
            message: '用户注册成功',
            result: {
              id: res.id,
              user_name: res.user_name,
            },
          }
    }
}

module.exports = new UserController;