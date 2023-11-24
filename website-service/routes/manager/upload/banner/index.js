
module.exports = app => {
    const experss = require("express");
    const router = experss.Router(); //experss子路由
    const adminUser = require("../../../../models/adminUser")
    const jwt = require("jsonwebtoken") //token 加密使用
    const assert = require("http-assert") //http错误返回

    //白名单
    const whiteList = [
        '/users/login',
        '/registeruser',
        '/checkuser'
    ]

    //登录校验中间件
    const authMiddleWare = async (req, res, next) => {
        
        if (!whiteList.includes(req.url)) {
            //获取请求头的token
            const token = req.headers.authorization && req.headers.authorization.split(' ').pop();
            assert(token, 401, '请先登录')

            //取回加密后的用户id
            const {
                id
            } = jwt.verify(token, app.get('secret'));
            assert(id, 401, '请先登录')

            //通过id查用户,并将用户信息挂载到req上
            req.user = adminUser.findById(id);
            assert(req.user, 401, '请先登录')
        }
        await next()
    }

    //图片上传相关
    const multer = require("multer");
    const upload = multer({
        dest: __dirname + "/../../../../uploads/banner"//上传的图片存储路径
    });
    app.post('/backstage/upload/banner', authMiddleWare, upload.single('file'), async (req, res) => {
        const file = req.file; //req上本来是没有file属性的 通过multer这个中间件实现的 upload.single代表单张图片
        file.url = `http://localhost:3000/uploads/banner/${file.filename}`;
        // file.url = `https://www.lxzhan.cn/uploads/banner/${file.filename}`;
        res.send({
            code: 200,
            message: "上传成功",
            data: file
        })
    })

   // 第2个参数是登录校验中间件
//    app.use('/backstage', authMiddleWare, router); //挂载子路由

    //错误统一处理(只要上面的路由有异常抛出，这里err都会拦截)
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    });
}
