const bcrypt = require('bcryptjs');
const { getUerInfo } = require('../service/user.service')
const {
    userFormateError,
    userAlreadyExited,
    userRegisterError,
    userLoginError,
    userDoesNotExist,
    invalidPassword,
} = require('../constant/err.type')

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

// 密码加密中间件
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(String(password), salt);
    ctx.request.body.password = hash;
    await next();
}

const verifyLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;
    try {
        // 1. 用户是否存在
        const res = await getUerInfo({ user_name });
        if (!res) {
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        // 2. 用户名与密码是否匹配
        if (!bcrypt.compareSync(String(password), res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (error) {
        console.error(error);
        return ctx.app.emit('error', userLoginError, ctx);
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}