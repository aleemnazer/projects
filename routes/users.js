var express = require('express');
var router = express.Router();
var User = require('../models/user.model')

router.get('/', function(req, res, next) {
  User.findAll().then(user => res.send(user)).catch(err => res.send(err));
});

router.post('/', function(req, res, next){
  User.createUser(req.body).then(user => res.send(user)).catch(err => res.send(err));
});

router.delete('/:id', function(req, res, next){
  User.removeUser(req.params.id).then(user => res.send(user)).catch(err => res.send(err));
});

router.put('/:id', function(req, res, next){
  User.updateUser(req.params.id, req.body).then(user => res.send(user)).catch(err => res.send(err));
});

module.exports = router;
