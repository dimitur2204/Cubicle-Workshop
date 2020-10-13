const handleErrors = (req, _, next) => {
    const errorMessage = req.query.message;

    next();
}

module.exports = handleErrors;

