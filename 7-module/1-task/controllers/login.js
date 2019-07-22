const uuid = require('uuid/v4');
const passport = require('../libs/passport');

module.exports.login = async function login(ctx, next) {
  // console.log('пришли в пост');
  // console.log('На входе ', ctx.body);
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    // console.log('err', err);
    console.log('user', user);
    console.log('info', info);
    if (!user) {
      ctx.status = 400;
      ctx.body = {error: info};
      return;
    }

    const token = uuid();

    ctx.body = {token};
  })(ctx, next);
};
