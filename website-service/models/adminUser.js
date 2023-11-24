//建模
const mongoose = require("mongoose")
const adminUser = new mongoose.Schema({
    username:{type:String},
    password:{
        type: String,
        // select:false, //默认不查出来

        set(val){//set方法 处理密码的加密 使用bcrypt插件 用于密码的散列
            // 10 是散列的指数 也可以叫加密指数 指数越高越安全耗时越多 一般10-12即可   val 是明文密码
            //优点在于 同一个密码 加密后都不一样
            return require("bcrypt").hashSync(val,10)
        } 
    },
})
module.exports = mongoose.model('adminUser',adminUser)