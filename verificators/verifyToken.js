const jwt = require('jsonwebtoken');

const User = require('../models/User');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ error: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        User.findById(verified._id).then(data => {
            req.user = data;
            next();
        }).catch(err => {
            res.status(400).send({ error: err });
        });
    } catch (err) {
        res.status(400).send({ error: 'Invalid Token' });
    }
};