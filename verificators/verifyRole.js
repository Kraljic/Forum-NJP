const Role = require('../models/Role');

module.exports = function (roleName) {
    return async function (req, res, next) {
        if (!req.user) return res.status(401).send({ error: 'Access Denied' });

        const roleRequired = await Role.findOne({ name: roleName });
        if (!roleRequired) return res.status(500).send({ error: 'Internal Server Error' });

        const userRole = await Role.findOne({ name: req.user.role });
        if (!userRole) return res.status(500).send({ error: 'Internal Server Error' });

        if (userRole.priority < roleRequired.priority) return res.status(401).send({ error: 'Access Denied' });

        next();
    };
}