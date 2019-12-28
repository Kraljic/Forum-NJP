module.exports = async function (req, res, next) {    
    if (!req.user) return res.status(401).send('Access Denied');
    
    const role = req.user.role;

    if (role != 'admin') return res.status(401).send('Access Denied');

    req.isAdmin = true;
    next();
};