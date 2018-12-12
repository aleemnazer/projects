const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const User = require('./models/user.model');

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById({id})
  .then((user) => { done(null, user); })
  .catch((err) => { done(err, null); });
});
module.exports = passport;