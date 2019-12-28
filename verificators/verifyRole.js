

module.exports = function(roles) {
    return async function (req, res, next) {    
        if (!req.user) return res.status(401).send('Access Denied');
        
        const role = req.user.role;
    
        if (roles.find(r => r == role) == false) return res.status(401).send('Access Denied');
    
        req.isAdmin = true;
        next();
    };
}