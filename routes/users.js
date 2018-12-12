var express = require('express');
var passport = require('../passport');
var router = express.Router();
var User = require('../models/user.model')

router.route('/', passport.authenticate('bearer', { session: false }))
  .get(function(req, res, next) {
    User.findAll().then(user => res.send(user)).catch(err => res.send(err));
  })
  .post(function(req, res, next){
    User.createUser(req.body).then(user => res.send(user)).catch(err => res.send(err));
  });

router.route('/:id', passport.authenticate('bearer', { session: false }))
  .delete(function(req, res, next){
    User.removeUser(req.params.id).then(user => res.send(user)).catch(err => res.send(err));
  })
  .put(function(req, res, next){
    User.updateUser(req.params.id, req.body).then(user => res.send(user)).catch(err => res.send(err));
  });

module.exports = router;
