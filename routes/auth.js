const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Profile = require('../models/Profile');

const { validateLoginRequest, validateRegisterRequest } = require('../utility/validators');
const password = require('../utility/password');


router.get('/register/username/:username', (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .then(d => {
            res.status(200).send({ available: d == null });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.get('/register/email/:email', (req, res) => {
    const email = req.params.email;

    User.findOne({ email: email })
        .then(d => {
            res.status(200).send({ available: d == null });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

// REGISTER ROUTE
router.post('/register', [validateRegisterRequest], async (req, res) => {
    const passwordHash = await password.hashPassword(req.body.password);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        passwordHash: passwordHash,
    });

    user.save()
        .then(async data => {
            await new Profile({ user: data._id }).save();  // Create user profile for user

            res.header('Authorization', signToken(data));
            res.status(201).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err.toString() });
        });
});

// LOGIN ROUTE
router.post('/login', [validateLoginRequest], async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('User with that username does not exist.');

    const validPass = await password.comparePasswords(req.body.password, user.passwordHash);
    if (!validPass) return res.status(400).send("Incorect password.");

    const token = signToken(user);
    res.header('Authorization', token).send(token);
});

function signToken(user) {
    const token = jwt.sign(
        {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        },
        process.env.JWT_TOKEN_SECRET);

    return token;
}

module.exports = router;