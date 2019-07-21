const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {session: false},
    async function(email, password, done) {
      // console.log('пришли в стратегию локальную');

      try {
        // console.log('TRY ');
        const user = await User.findOne({email: email});
        if (!user) return done(null, false, 'Нет такого пользователя');

        const isValidPass = await user.checkPassword(password);

        if (!isValidPass) return done(null, false, 'Невереный пароль');


        return done(null, user);
      } catch (err) {
        // console.log(' ОШибка пришли в стратегию локальную');

        done(err);
      }
    }
);
