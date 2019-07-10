const Koa = require('koa');
const app = new Koa();
const fs = require('fs').promises;

app.use(async (ctx, next) => {
  console.log('middle chain has been started', ctx.url);

  let time = new Date();

  await next();

  time = new Date() - time;

  console.log('middle chain has been ended', time, 'ms');
});

app.use((ctx, next) => {
  console.log('--> add useful method');

  ctx.renderFile = async function(file) {
    return await fs.readFile(file, 'utf-8');
  };
  return next();
  // return next();
});

app.use( async (ctx, next) => {
  if (ctx.url !== '/favicon.ico') return next();

  ctx.body = await ctx.renderFile('favicon.ico');
});

app.use(async (ctx, next) => {
  console.log('-- work work');

  ctx.body = await ctx.renderFile(__filename);


  console.log('-- work complite');
});

app.listen(3000);


