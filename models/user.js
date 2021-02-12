const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bycrypt = require('bcrypt');

const usernameValidators = require('./UserValidators').usernameValidators;
const emailValidators = require('./UserValidators').emailValidators;
const passwordValidators = require('./UserValidators').passwordValidators;


const userSchema = new Schema({
    email: {
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true,
        validate: emailValidators
    },
    username: {
        type: String,
        required: true, 
        unique: true, 
        lowercase: true,
        validate: usernameValidators
    },
    password: {
        type: String, 
        required: true,
        validate: passwordValidators
    }
});

//Schema Middleware to Encrypt Password
userSchema.pre('save',function(next) {
    // Ensure password is new or modified before applying encrypion
    if(!this.isModified('password'))
        return next();
    
    // Apply encryption
    bycrypt.hash(this.password, 10, (err,hash)=> {
        if(err) 
            return next(err);
        this.password = hash;
        next();
    });
});



// Methods to compare password to encrypted password upon Login
userSchema.methods.comparePassword = function(password){
    return bycrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User',userSchema);