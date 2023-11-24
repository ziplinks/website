const nodemailer = require("nodemailer");

// 发送邮件函数

var sendMail = function (to,subject,html) {

  // 创建一个smtp客户端配置

  const config = {

    host: "smtp.163.com", // 注意事项
    port: 465,
    auth: {

    // 发件人邮箱账号

    user: 'm18117517749@163.com',

    //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一

    pass: 'TRYMWIYFXVOESXCG' //授权码生成之后，要等一会才能使用，否则验证的时候会报错

    }

  }

  const transporter = nodemailer.createTransport(config)

  //创建一个收件人对象

  const mail = {

    // 发件人 邮箱 '昵称<发件人邮箱>'

    from: `小程序乐享栈<m18117517749@163.com>`,

    // 主题

    subject: subject,

    // 收件人 的邮箱

    to: to,

    //这里可以添加html标签

    html: html

  }

  transporter.sendMail(mail, function(error, info) {

    if (error) {

      return console.log(error);

    }

    transporter.close()

    console.log('mail sent:', info.response)

  })

}

module.exports = {

  sendMail

};
