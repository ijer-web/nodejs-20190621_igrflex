const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    async function(email, password, done) {
      console.log('before try');

      try {
        console.log('try');
        const user = await User.findOne({email});
        console.log('user', user);

        if (!user) {
          return done(null, false, 'Нет такого пользователя');
        }

        const isValidPassword = await user.checkPassword(password);

        if (!isValidPassword) {
          return done(null, false, 'Невереный пароль');
        }

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
);
