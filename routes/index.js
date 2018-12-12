var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.post('/signup', function(req, res, next){
  User.createUser(req.body).then(user => res.send(user)).catch(err => res.send(err));
})

router.post('/login',
  function(req, res, next) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (user == null) { return next(err);}
      verified = user.verifyPassword(req.body.password);
      if (err || !verified) { return next(err); }
      user.setToken();
      res.send(user.getToken());
    });
});
module.exports = router;
