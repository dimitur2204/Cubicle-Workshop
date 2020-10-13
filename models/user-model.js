const mongoose = require('mongoose');
const {isEmail} = require('validator').default;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, 'You should provide an email'],
        unique:true,
        validate:[isEmail, 'You should provide a valid email'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'You should provide a password'],
        minlength:[8,'Your password should be atleast 8 symbols long'],
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if (user) {
       const auth = await bcrypt.compare(password,user.password);
       if (auth) {
           return user;
       }
       throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}


module.exports = mongoose.model('User',userSchema);