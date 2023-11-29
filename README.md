<div align="center">
  <h1>网站首页模板</h1>
</div>

## ⚡ 简介

一个免费开源的中后台管理系统基础解决方案，前端基于 Vue3、TypeScript、Element Plus、Pinia 和 Vite 等主流技术.

后端服务是基于Express，它是一个流行的 Node.js Web 应用程序框架。数据库采用的是MongoDB，一种流行的开源 NoSQL 数据库管理系统，它以高性能、可扩展性和灵活性而闻名。主要技术点有cors、http-assert、jsonwebtoken、multer、nodemon等
## 特性

- **Vue3**：采用 Vue3 + script setup 最新的 Vue3 组合式 API
- **Element Plus**：Element UI 的 Vue3 版本
- **Pinia**: 传说中的 Vuex5
- **Vite**：真的很快
- **Vue Router**：路由路由
- **TypeScript**：JavaScript 语言的超集
- **PNPM**：更快速的，节省磁盘空间的包管理工具
- **Scss**：和 Element Plus 保持一致
- **CSS 变量**：主要控制项目的布局和颜色
- **ESlint**：代码校验
- **Prettier**：代码格式化
- **Axios**：发送网络请求（已封装好）
- **UnoCSS**：具有高性能且极具灵活性的即时原子化 CSS 引擎
- **注释**：各个配置项都写有尽可能详细的注释
- **cors**：跨域
- **http-assert**：断言
- **multer**：图片上传
- **jsonwebtoken**：加密
- **nodemon**：nodejs热启动



## 功能

- **网站首页配置化**：由后台管理进行统一配置网站首页风格

## 页面预览
![img.gif](img.gif)

## 注意
若想运行效果和页面预览一致，请在本地启动服务。需先安装 [mongodb数据库](https://www.mongodb.com/try/download/community)

```bash

# 进入目录
cd mongodb/bin

# 连接本地数据库
mongod --dbpath=..\data\db

```

## 🚀 开发

```bash
# 配置
1. 一键安装 .vscode 目录中推荐的插件
2. node 版本 16+
3. pnpm 版本 8.x

# 克隆项目
git clone https://github.com/Ziplinks/website.git

# 1、进入前端项目目录
cd website-web

# 安装依赖
pnpm i

# 启动服务
pnpm run dev

# 2、进入后台管理项目目录
cd website-backstage

# 安装依赖
pnpm i

# 启动服务
pnpm run dev

# 3、进入服务端项目目录
cd website-service

# 安装依赖
pnpm i

# 启动服务
pnpm run serve
```

## ✔️ 预览

```bash
# 预览预发布环境
pnpm preview:stage

# 预览正式环境
pnpm preview:prod
```

## 📦️ 多环境打包

```bash
# 构建预发布环境
pnpm build:stage

# 构建正式环境
pnpm build:prod
```

## 🔧 代码检查

```bash
# 代码格式化
pnpm lint

# 单元测试
pnpm test
```




## 💕 感谢 Star

小项目获取 star 不易，如果你喜欢这个项目的话，欢迎支持一个 star！这是作者持续维护的唯一动力（小声：毕竟是免费的）



## 📄 License

[MIT](./LICENSE)

Copyright (c) 2022-present 
