const User = require('../models/user-model');
const jwt = require('jsonwebtoken')

const MAX_AGE_SECONDS = 365 * 3 * 24 * 60 * 60;

const handleErrors = (error) => {
    const errors = { email: '', password:''};

    if (error.code === 11000) {
        errors.email = "That email already exists";
        return errors;
    }

    if (error.message.includes('Passwords do not match')) {
        errors.password = error.message;
    }

    if (error.message.includes('Incorrect password')) {
        errors.password = error.message;
    }

    if (error.message.includes('Incorrect email')) {
        errors.email = error.message;
    }

    if (error.message.includes('User validation failed')) {
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: MAX_AGE_SECONDS
    });
}

const getLogin = (_,res) => {
    res.render('login');
}

const postLogin = async (req,res) => {
    const {email,password} = req.body;
        try {
            const user = await User.login(email,password);
            const token = createToken(user._id);
            res.cookie('jwt',token, { httpOnly:true, maxAge: MAX_AGE_SECONDS * 1000});
            res.status(200).json(user._id);
        } catch (error) {
            const errors = handleErrors(error);
            res.status(400).json({errors});
        }
}

const getRegister = (_,res) => {
    res.render('register');
}

const postRegister = async (req,res) => {
    const {email,password,repeatPassword} = req.body;
    if (password !== repeatPassword) {
        res.status(401).json(handleErrors({message:'Passwords do not match'}));
        return;
    }

    try{
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token, { httpOnly:true, maxAge: MAX_AGE_SECONDS * 1000});
        res.status(201).json({user:user._id});
    }catch(error){
        res.status(401).json(handleErrors(error));
    }
}

const getLogout = (_,res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    getLogout
}