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
  // uploadDir: 'node-manage/static/upload'
  uploadDir: config.UPLOAD_DIR
}));

// 允许跨域
server.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  await next();
})

// 数据库
server.context.db = require('./libs/database');

server.context.config = config;

// 路由
const router = new Router();

// 捕获错误
router.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.body = { state: false, msg: '服务端出错' };
    console.log(e)
    // ctx.throw(500, 'Internal Server Error');
  }
});

router.use('/login', require('./router/login'));
router.use('/home', require('./router/home'));

server.use(router.routes());