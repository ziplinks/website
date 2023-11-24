
module.exports = app => {
    const experss = require("express");
    const router = experss.Router(); //experss子路由
    const managerBanner = require("../../models/manager/banner")
    const cardHorizontal = require("../../models/manager/cardHorizontal")
    const cardVertical = require("../../models/manager/cardVertical")
    const cardScroll = require("../../models/manager/cardScroll")
    const footer = require("../../models/manager/footer")
    //banner列表
    router.get('/banner/list', async (req, res) => {
        const list = await managerBanner.find().limit().sort({"createdTime": -1});
        res.send({
            code: 200,
            data: list,
            message: "查询成功",
        });
    });

    //获取水平card详情
    router.get('/card/horizontal/list', async (req, res) => {
        const list = await cardHorizontal.find().limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });

    //获取垂直card详情
    router.get('/card/vertical/list', async (req, res) => {
        const list = await cardVertical.find().limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });

     //获取滚动card详情
     router.get('/card/scroll/list', async (req, res) => {
        const list = await cardScroll.find().limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });
    //获取footer详情
    router.get('/footer/list', async (req, res) => {
        const list = await footer.find().limit();
        res.send({
            code: 200,
            data: list[0] || null,
            message: "查询成功",
        });
    });

    app.use('/frontstage', router); //挂载子路由


    //错误统一处理(只要上面的路由有异常抛出，这里err都会拦截)
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    });
}
