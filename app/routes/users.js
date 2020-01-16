const router = require('express').Router();

const { validateId, validateRolePutRequest } = require('../utility/validators');
const User = require('../models/User');

router.get('/', (req, res) => {
    User.find({}, 'username email role')
        .then(d => {
            res.status(200).send(d);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.get('/:id', [validateId], (req, res) => {
    User.findById(req.params.id, 'username email role')
        .then(d => {
            res.status(200).send(d);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.put('/role/:id', [validateId, validateRolePutRequest], async (req, res) => {
    User.updateOne(
        { _id: req.params.id },
        { $set: { role: req.body.role } })
        .then(d => {
            return User.findById(req.params.id, 'username email role')
        })
        .then(d => {
            res.status(200).send(d);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

module.exports = router;