const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  try {
    if (!email) {
      return done(null, false, 'Не указан email');
    }


    // HERE!!  why STOPPED ?
    if (!/^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(email)) {
      return done(null, false, 'ValidationError');
    }

    let user = await User.findOne({email});

    if (!user) {
      user = new User({
        email: email,
        displayName: displayName,
      });
      user = await user.save();
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
};
