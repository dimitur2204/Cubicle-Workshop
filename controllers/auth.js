const User = require('../models/user-model');

const handleErrors = (error) => {
    const errors = { email: '', password:''};

    if (error.code === 11000) {
        errors.email = "That email already exists";
        return errors;
    }

    if (error.message.includes('User validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const getLogin = (_,res) => {
    res.render('login');
}

const postLogin = (req,res,next) => {

}

const getRegister = (_,res) => {
    res.render('register');
}

const postRegister = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.create({email,password});
        res.status(201).json(user);
    }catch(error){
        res.status(401).json(handleErrors(error));
    }
}

const getLogout = (req,res,next) => {

}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getLogout
}