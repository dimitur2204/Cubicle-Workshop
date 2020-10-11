const User = require('../models/user-model');

const getLogin = (_,res) => {
    res.render('login');
}

const postLogin = (req,res,next) => {

}

const getRegister = (_,res) => {
    res.render('register');
}

const postRegister = (req,res,next) => {

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