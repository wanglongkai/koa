const User = require('../model/user.model');

class UserService {
    async createUser(UserInfo) {
        const res = await User.create(UserInfo);
        return res.dataValues;
    }

    async getUerInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        })

        return res ? res.dataValues : null
    }
}

module.exports = new UserService;