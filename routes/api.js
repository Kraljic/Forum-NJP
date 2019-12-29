const router = require('express').Router();

const verifyToken = require('../verificators/verifyToken');
const verifyRole = require('../verificators/verifyRole');

const authRouter = require('./auth');
const profileRouter = require('./profile');
const sectionRouter = require('./section');
const categoryRouter = require('./category');
const threadRouter = require('./thread');
const commentRouter = require('./comment');


// Public API
router.use('/user/', authRouter);

//  Private API
router.use('/profile/', [verifyToken, verifyRole('user')], profileRouter);
router.use('/section/', [verifyToken, verifyRole('user')], sectionRouter);
router.use('/category/', [verifyToken, verifyRole('user')], categoryRouter);
router.use('/thread/', [verifyToken, verifyRole('user')], threadRouter);
router.use('/comment/', [verifyToken, verifyRole('user')], commentRouter);

module.exports=router;