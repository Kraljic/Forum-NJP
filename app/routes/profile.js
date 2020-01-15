const router = require('express').Router();

const verifyToken = require('../verificators/verifyToken');
const { validateId, validateProfileRequest } = require('../utility/validators');

const Profile = require('../models/Profile');

router.get('/:id', [validateId], (req, res) => {
    Profile
        .findOne({ user: req.params.id })
        .populate('user', 'username role')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.get('/', (req, res) => {
    const id = req.user._id;

    Profile
        .findOne({ user: id })
        .populate('user', 'username role email')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.put('/', [validateProfileRequest], async (req, res) => {
    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
        profile = await new Profile({ user: req.user._id }).save();  // Create user profile for user
    }

    profile.update({ $set: req.body })
        .then(data => {
            return Profile
                .findOne({ user: req.user._id })
                .populate('user', 'username role email')
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

module.exports = router;