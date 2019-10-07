const path = require('path')
const Router = require('koa-router');

const router = new Router();

const returnParams = { state: true, msg: 'success' };

// nba数据列表
router.post('/nba/list', async (ctx) => {
  const { title } = ctx.request.fields || {};
  // const res = await ctx.db.query(`SELECT * FROM nba_tbl WHERE title LIKE '%${title}%'`);
  const res = await ctx.db.query(`SELECT * FROM nba_tbl WHERE title LIKE '%${title}%'`);
  ctx.body = res;
})

// nba添加数据
router.post('/nba/add', async ctx => {
  const { title, content, fileName } = ctx.request.fields || {};
  const res = await ctx.db.query(`INSERT INTO nba_tbl (title, content, img) VALUES('${title}', '${content}', '${fileName}')`);
  ctx.body = returnParams;
})

// nba修改数据
router.post('/nba/edit', async ctx => {
  const { title, content, fileName, id } = ctx.request.fields || {};
  const res = await ctx.db.query(`UPDATE nba_tbl SET title='${title}', content='${content}', img='${fileName}' WHERE nba_id='${id}'`);
  ctx.body = returnParams;
})

// nba删除数据
router.post('/nba/del', async ctx => {
  const { nba_id } = ctx.request.fields || {};
  await ctx.db.query(`DELETE FROM nba_tbl WHERE nba_id='${nba_id}'`);
  ctx.body = returnParams;
})

// nba详情
router.post('/nba/detail', async ctx => {
  const { id } = ctx.request.fields || {};
  const res = await ctx.db.query(`SELECT * FROM nba_tbl WHERE nba_id='${id}'`);
  ctx.body = { state: true, msg: 'success', data: (res || [])[0] };
})

// nba图片上传
router.post('/nba/upload', async ctx => {
  const fileName = path.basename((ctx.request.fields.img || [])[0].path);
  ctx.body = { ...returnParams, fileName };
})



module.exports = router.routes();