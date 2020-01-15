const router = require('express').Router();

const verifyToken = require('../verificators/verifyToken');
const verifyRole = require('../verificators/verifyRole');

// Public API
router
    .use('/user/', require('./auth'));

// Private API Endpoints
// Only users can see
router
    .use(verifyToken)
    ;// .use('/me/', require('./me'));

// Only users with access level 'user' can see
router
    .use(verifyRole('user'))
    .use('/profile/', require('./profile'))
    .use('/section/', require('./section'))
    .use('/category/', require('./category'))
    .use('/thread/', require('./thread'))
    .use('/comment/', require('./comment'));

module.exports = router;