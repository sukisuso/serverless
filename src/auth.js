export { };

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwt = require('./jwt');

const userRepository = require('../api/user/user.repository');

passport.use(
  new localStrategy({ usernameField: 'username' },
    async (username, password, done) => {
      const user = await userRepository.findOne({ username });

      if (!user)
        return done(null, false);

      if (!jwt.verifyPassword(user, password))
        return done(null, false);

      return done(null, user);
    })
);