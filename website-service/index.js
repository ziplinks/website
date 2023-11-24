const express = require("express");
const app = express();

//跨域解决
app.use(require("cors")())

//表示要express识别客户端提交过来的json
app.use(express.json())

//托管静态文件
app.use('/uploads/banner',express.static(__dirname + '/uploads/banner'))
app.use('/uploads/card',express.static(__dirname + '/uploads/card'))

//托管静态页面
app.use('/',express.static(__dirname + '/public/manager'))

require("./routes/web")(app);
require("./routes/manager")(app);


//登录注册相关路由(放在子文件内)
require("./routes/manager/auth")(app);
//banner图片上传
require("./routes/manager/upload/banner")(app);
//card图片上传
require("./routes/manager/upload/card")(app);


require("./plugins/db")(app);

app.set("secret",'123789');//token 加密使用

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})
