const User = require('../models/user-model');
const jwt = require('jsonwebtoken')

const MAX_AGE_SECONDS = 365 * 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: MAX_AGE_SECONDS
    });
}

const getLogin = (req,res) => {
    res.render('login',{errorMessage:req.query.message});
}

const postLogin = async (req,res) => {
    const {email,password} = req.body;
        try {
            const user = await User.login(email,password);
            const token = createToken(user._id);
            res.cookie('jwt',token, { httpOnly:true, maxAge: MAX_AGE_SECONDS * 1000});
            res.status(200).redirect('/');
        } catch (error) {
            res.status(401).redirect(`/login?error=true&message="${error.message}"`);
            return;
        }
}

const getRegister = (req,res) => {
    res.render('register',{errorMessage:req.query.message});
}

const postRegister = async (req,res) => {
    const {email,password,repeatPassword} = req.body;
    if (password !== repeatPassword) {
        res.status(401).redirect(`/register?error=true&message="Passwords do not match"`);
        return;
    }

    try{
        const user = await User.create({email,password});
        const token = createToken(user._id);
        res.cookie('jwt',token, { httpOnly:true, maxAge: MAX_AGE_SECONDS * 1000});
        res.status(201).redirect('/');
    }catch(error){
        res.status(401).redirect(`/register?error=true&message="${error.message}"`);
        return;
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