const User = require('../model/user.model');

class UserService{
    async createUser(UserInfo){
        const res = await User.create(UserInfo);
        return res.dataValues;
    }
}

module.exports = new UserService;