module.exports = async function (req, res, next) {
    if (!req.user) return res.status(401).send('Access Denied');

    const role = req.user.role;

    if ((role === 'moderator' || role === 'admin') == false)
        return res.status(401).send('Access Denied');

    req.isModerator = true;
    next();
};