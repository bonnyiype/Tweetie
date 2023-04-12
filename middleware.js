
//If users logged in or NOT ====> Redirecting users to login Page 

exports.requireLogin = (req, res, next) => {

if (req.session && req.session.user) {

    return next();
} else {
 return res.redirect('/login')

}


}
