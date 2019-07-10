const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const fs = require('fs');
const Router = require('koa-router');

app.use(bodyparser());
const router = new Router();

router.get('/user/:username', async (ctx, next) => {
  ctx.body = `hi ${ctx.params.username}`;
} );

router.post('/upload', async (ctx, next) => {
  const stream = fs.createWriteStream('file.txt');
  ctx.req.pipe(stream);

  await new Promise((resolve) => {
    stream.on('close', resolve);
  });

  ctx.body = 'uploaded';
});


app.use(router.routes());
app.listen(3000);
