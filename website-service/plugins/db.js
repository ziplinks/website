//数据库插件
module.exports = app => {
    const mongoose = require("mongoose");
    mongoose.connect('mongodb://127.0.0.1:27017/website', {
        useNewUrlParser: true
    })
    mongoose.connection.on('error', function (error) {
        console.log("website数据库连接失败：" + error);
    });
    mongoose.connection.once('open', function () {
        console.log("------website数据库连接成功！------");
    });


}