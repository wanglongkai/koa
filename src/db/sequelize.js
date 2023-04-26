const { Sequelize } = require('sequelize');
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB, 
} = require('../config/config.default');

// 本地的mysql没有设置密码
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
  });

  // 测试连接是否成功
//   sequelize.authenticate().then(() => console.log('success')).catch(err => console.log(err))

module.exports = sequelize;