const Koa = require('koa');
const app = new Koa();

const users = {};

app.use(async (ctx, next) => {
  if (ctx.method !== 'POST') return next();

  let body = '';
  for await (const chunk of ctx.req) {
    body+=chunk;
  }
  body = JSON.parse(body);
  ctx.request.body = body;
  return next();
});

app.use(async (ctx, next) => {
  if (ctx.url !== '/') return next();
  ctx.body = {result: 'hello'};
});

app.use(async (ctx, next) => {
  console.log('method', ctx.method);
  console.log('ctx.url', ctx.url);
  return next();
});

app.use(async (ctx, next) => {
  if ((ctx.url !=='/register') || (ctx.method !== 'POST')) return next();
  console.log('register ctx.url', ctx.url);

  if (users[ctx.request.body.username]) {
    ctx.throw(400, 'user already exists');
  } else {
    users[ctx.request.body.username] = ctx.request.body.password;
  }

  ctx.status = 201;
  ctx.body = '';
});

app.use(async (ctx, next) => {
  if ((ctx.url !== '/login') || (ctx.method !== 'POST')) return next();
  console.log('login ctx.url', ctx.url);

  if (!users[ctx.request.body.username]) {
    ctx.throw(400, 'user not registered');
  } else if (users[ctx.request.body.username] !== ctx.request.body.password) {
    ctx.throw(400, 'password not valid');
  } else {
    ctx.body = `Welcome ${ctx.request.body.username}`;
  }
});

app.listen(3000);
