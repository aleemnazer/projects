var mongoose = require('mongoose');
var Schema = mongoose.Schema
var userSchema = new Schema({
    name: { type: String },
    role: { type: String },
})

userSchema.statics.findAll = function(){
    return this.find({});
}

userSchema.statics.createUser = function(user){
    newUser = new this(user);
    return newUser.save();
}

userSchema.statics.removeUser = function(id){
    return this.findOneAndDelete(id);
}

userSchema.statics.updateUser = function(id, params){
    return this.findOneAndUpdate(id, { $set: params }).exec();
}
module.exports = mongoose.model('User', userSchema);