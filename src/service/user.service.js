class UserService{
    async createUser(UserInfo){
        console.log(UserInfo, 3);
        //todo:
        return '创建user成功'
    }
}

module.exports = new UserService;