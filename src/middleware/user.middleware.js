const { getUerInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExited, userRegisterError } = require('../constant/err.type')

// 用户名密码不能为空
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    if (!user_name || !password) {
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

// 用户已经存在
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    try {
        if (await getUerInfo({ user_name })) {
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (err) {
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser,
}