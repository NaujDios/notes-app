helpers = {};

helpers.isAuthenticated = (req, res ,next) =>{
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'You have to sign in');
    return res.redirect('/users/signin');
}


module.exports = helpers