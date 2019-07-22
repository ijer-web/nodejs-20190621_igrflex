const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {session: false,
      usernameField: 'email',
    },
    async function(email, password, done) {
      try {
        const user = await User.findOne({email: email});

        if (!user) return done(null, false, 'Нет такого пользователя');

        const isValidPass = await user.checkPassword(password);

        if (!isValidPass) return done(null, false, 'Невереный пароль');


        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
);
