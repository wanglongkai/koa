const dotenv = require('dotenv');

// 将.env配置文件读取到process.env变量中
dotenv.config();

module.exports = process.env;