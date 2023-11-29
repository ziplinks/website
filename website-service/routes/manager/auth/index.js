
module.exports = app => {
    const experss = require("express");
    const router = experss.Router(); //experss子路由
    const adminUser = require("../../../models/adminUser")
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
        // console.log(req)
        if (!whiteList.includes(req.url)) {
            //获取请求头的token
            const token = req.headers.authorization&&req.headers.authorization.split(' ').pop();
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

    // -------用户相关------
    //注册用户
    router.post('/registeruser', async (req, res) => {
        let params = {
            username: req.body.username,
            password: req.body.password
        }
        await adminUser.create(params);
        return res.send({
            code: 200,
            message: "注册成功",
            data: null
        });
    });

    //校验用户
    router.get('/checkuser', async (req, res) => {
        const user = await adminUser.find().limit();
        if (user.length) {
            res.send({
                code: 200,
                message: "账号已存在",
                data: true
            });
        } else {
            res.send({
                code: 200,
                message: "验证通过",
                data: false
            });
        }
    });

    //登出
    router.post('/logout', async (req, res) => {
        res.send({
            code: 200,
            token: null,
            message: "退出成功"
        });
    });

    //登录
    router.post('/users/login', async (req, res) => {
        const {
            username,
            password
        } = req.body;
        const user = await adminUser.findOne({
            username: username
        });
        //1.找用户 改用assert 返回
        //   assert(user,422,"账号错误")

        if (!user) {
            res.send({
                code: 400,
                message: "账号错误",
                data: null
            })
            return;
        }

        //2.校验密码 bcrypt 散列后的值需要解密才能对比 user.password是散列的值
        const isValid = require("bcrypt").compareSync(password, user.password) //校验两个密码是否相同

        if (!isValid) {
            res.send({
                code: 400,
                message: "密码错误",
                data: null
            })
            return;
        }

        //3.返回token
        //生成token
        const token = jwt.sign({
            id: user._id,
            // exp: Math.floor(Date.now() / 1000) + (60 * 1),
        }, app.get("secret"));
        res.send({
            code: 200,
            token: token,
            userInfo: {
                userName: user.username,
                id: user._id
            },
            message: "登录成功"
        })

    });

    app.use('/backstage', authMiddleWare, router); //挂载子路由


    //错误统一处理(只要上面的路由有异常抛出，这里err都会拦截)
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    });
}
