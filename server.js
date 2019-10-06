const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');
const session = require('koa-session');
const path = require('path');
const fs = require('fs');
const config = require('./config');

// 创建服务
const server = new Koa();
server.listen(config.PORT, () => {
  console.log(`server running at ${config.PORT}`);
});

// 中间件 上传路径
server.use(body({
  uploadDir: config.UPLOAD_DIR
}));

// 数据库
// server.context.db = require('./libs/database');

server.context.config = config;

// 路由
const router = new Router();

router.use('/login', require('./router/login'));

server.use(router.routes());