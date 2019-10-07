const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const util = require('../libs/util');


const router = new Router();

router.post('/', async (ctx) => {
  const { username, password } = ctx.request.fields || {};
  // 获取管理员数据
  let adminData = fs.readFileSync(
    path.resolve(__dirname, '../admin/admin.json'),
    () => { }
  );
  adminData = JSON.parse(adminData.toString());
  const adminInfo = adminData.filter((item) => item.username === username)[0] || {};

  if (!adminInfo.username) {
    ctx.body = { state: false, msg: 'username err' };;
  } else if (util.sha512(password) !== adminInfo.password) {
    ctx.body = { state: false, msg: 'password err' };
  } else {
    ctx.body = { state: true, msg: 'success', name: username };
  }

})

module.exports = router.routes();