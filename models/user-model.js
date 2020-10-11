const mongoose = require('mongoose');
const {isEmail} = require('validator').default;

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'You should provide an email'],
        unique:true,
        validate:[isEmail, 'You should provide a valid email']
    },
    password:{
        type:String,
        required:[true,'You should provide a password'],
        minlength:[6,'Your password should be atleast 6 symbols long'],
    }
});

module.exports = mongoose.model('User',userSchema);