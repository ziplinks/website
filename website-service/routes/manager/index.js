
module.exports = app => {
    const experss = require("express");
    const router = experss.Router(); //experss子路由
    const adminUser = require("../../models/adminUser")

    const managerBanner = require("../../models/manager/banner")
    const cardHorizontal = require("../../models/manager/cardHorizontal")
    const cardVertical = require("../../models/manager/cardVertical")
    const cardScroll = require("../../models/manager/cardScroll")
    const footer = require("../../models/manager/footer")
    const jwt = require("jsonwebtoken") //token 加密使用
    const assert = require("http-assert") //http错误返回

    const tools = require("../../plugins/tools") //工具类


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
            try {
                //取回加密后的用户id
                const {
                    id,
                    exp
                } = jwt.verify(token, app.get('secret'));
                assert(id, 401, '请先登录')
                // if (Date.now() >= exp * 1000) {
                //     throw new Error('token失效');
                //   }
                //   // 检查访问令牌是否即将过期（例如，过期前 1 分钟）
                // const expirationThreshold = 30; // 单位：秒
                // const currentTime = Math.floor(Date.now() / 1000);
                // if (exp - currentTime <= expirationThreshold) {
                //     // 访问令牌即将过期，延长过期时间
                //     jwt.sign({ id }, app.get('secret'), { expiresIn: 60 });
                // }
        
                //通过id查用户,并将用户信息挂载到req上
                req.user = adminUser.findById(id);
                assert(req.user, 401, '请先登录')
            }catch (error) {
                return res.status(401).json({ message: 'token失效' });
            }
        }

        await next()
    }

    //banner新增
    router.post('/banner/add', async (req, res) => {
        let obj = {
            createdUser: req.user._conditions._id,
            createdTime: tools.createdTime()
        }
        await managerBanner.create(Object.assign({}, req.body, obj));
        res.send({
            code: 200,
            message: "新增成功",
            data: null
        });
    });

     //banner编辑
    router.put('/banner/edit', async (req, res) => {
        await managerBanner.updateOne({
            _id: req.body._id
        }, {
            $set: {
                mainTitle: req.body.mainTitle,
                subTitle: req.body.subTitle,
                banner: req.body.banner,
            }
        })
        res.send({
            code: 200,
            data: null,
            message: "修改成功",
        });
    });

    //banner删除
    router.delete('/banner/:id', async (req, res) => {
        await managerBanner.findByIdAndDelete(req.params.id);
        res.send({
            code: 200,
            data: null,
            message: "删除成功",
        });
    });

    //banner列表
    router.get('/banner/list', async (req, res) => {
        const userid = req.user._conditions._id;
        const {size, currentPage} = req.query;
        const list = await managerBanner.find({
            createdUser: userid
        }).limit(Number(size)).skip(Number(size)*(Number(currentPage) - 1)).sort({"createdTime": -1});
        const count = await managerBanner.find({
            createdUser: userid}).count();
        const resultData = {
            data: list,
            total: count
        }
        res.send({
            code: 200,
            data: resultData,
            message: "查询成功",
        });
    });

       //水平card新增
    router.post('/card/horizontal/add', async (req, res) => {
        let obj = {
            createdUser: req.user._conditions._id,
            createdTime: tools.createdTime()
        }
        await cardHorizontal.create(Object.assign({}, req.body, obj));
        res.send({
            code: 200,
            message: "新增成功",
            data: null
        });
    });

    //获取水平card详情
    router.get('/card/horizontal/list', async (req, res) => {
        const userid = req.user._conditions._id;
        const list = await cardHorizontal.find({
            createdUser: userid
        }).limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });

    //水平card编辑
    router.put('/card/horizontal/edit', async (req, res) => {
        await cardHorizontal.updateOne({
            _id: req.body._id
        }, {
            $set: {
                mainTitle: req.body.mainTitle,
                subTitle: req.body.subTitle,
                cardList: req.body.cardList,
            }
        })
        res.send({
            code: 200,
            data: null,
            message: "修改成功",
        });
    });

       //垂直card新增
       router.post('/card/vertical/add', async (req, res) => {
        let obj = {
            createdUser: req.user._conditions._id,
            createdTime: tools.createdTime()
        }
        await cardVertical.create(Object.assign({}, req.body, obj));
        res.send({
            code: 200,
            message: "新增成功",
            data: null
        });
    });

    //获取垂直card详情
    router.get('/card/vertical/list', async (req, res) => {
        const userid = req.user._conditions._id;
        const list = await cardVertical.find({
            createdUser: userid
        }).limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });

    //垂直card编辑
    router.put('/card/vertical/edit', async (req, res) => {
        await cardVertical.updateOne({
            _id: req.body._id
        }, {
            $set: {
                cardList: req.body.cardList,
            }
        })
        res.send({
            code: 200,
            data: null,
            message: "修改成功",
        });
    });


      //滚动card新增
      router.post('/card/scroll/add', async (req, res) => {
        let obj = {
            createdUser: req.user._conditions._id,
            createdTime: tools.createdTime()
        }
        await cardScroll.create(Object.assign({}, req.body, obj));
        res.send({
            code: 200,
            message: "新增成功",
            data: null
        });
    });

    //获取滚动card详情
    router.get('/card/scroll/list', async (req, res) => {
        const userid = req.user._conditions._id;
        const list = await cardScroll.find({
            createdUser: userid
        }).limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });

    //滚动card编辑
    router.put('/card/scroll/edit', async (req, res) => {
        await cardScroll.updateOne({
            _id: req.body._id
        }, {
            $set: {
                mainTitle: req.body.mainTitle,
                cardList: req.body.cardList,
            }
        })
        res.send({
            code: 200,
            data: null,
            message: "修改成功",
        });
    });

      //footer新增
      router.post('/footer/add', async (req, res) => {
        let obj = {
            createdUser: req.user._conditions._id,
            createdTime: tools.createdTime()
        }
        await footer.create(Object.assign({}, req.body, obj));
        res.send({
            code: 200,
            message: "新增成功",
            data: null
        });
    });

    //获取footer详情
    router.get('/footer/list', async (req, res) => {
        const userid = req.user._conditions._id;
        const list = await footer.find({
            createdUser: userid
        }).limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });

    //footer编辑
    router.put('/footer/edit', async (req, res) => {
        await footer.updateOne({
            _id: req.body._id
        }, {
            $set: {
                tel: req.body.tel,
                email: req.body.email,
                cardList: req.body.cardList,
            }
        })
        res.send({
            code: 200,
            data: null,
            message: "修改成功",
        });
    });


   
    // 第2个参数是登录校验中间件
    app.use('/backstage', authMiddleWare, router); //挂载子路由


    //错误统一处理(只要上面的路由有异常抛出，这里err都会拦截)
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    });
}
