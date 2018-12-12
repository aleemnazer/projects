var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String },
    role: { type: String },
    username: { type: String, required: true, unique: true },
    salt: { type: String },
    hash: { type: String },
    token: { type: String },
})

userSchema.statics.findAll = function(){
    return this.find({}, { salt: 0, hash: 0 });
}

userSchema.statics.createUser = function(user){
    newUser = new this(user);
    newUser.setPassword(user.password);
    return newUser.save();
}

userSchema.statics.removeUser = function(id){
    return this.findOneAndDelete(id);
}

userSchema.statics.updateUser = function(id, params){
    return this.findOneAndUpdate(id, { $set: params }).exec();
}

userSchema.methods.setPassword = function(password) {
    password = new Buffer(password, 'binary');
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.verifyPassword = function(password) {
    password  = new Buffer(password, 'binary')
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.getToken = function() {
    return this.token;
};

userSchema.methods.setToken = function() {
    token = crypto.randomBytes(16).toString('hex');
    this.token = token;
    this.save();
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);