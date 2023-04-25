class UserController{
    async register(ctx, next){
        ctx.body = 'index controller'
    }
}

module.exports = new UserController;