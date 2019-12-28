const router = require('express').Router();

const authRouter = require('./auth');
const profileRouter = require('./profile');
const sectionRouter = require('./section');
const categoryRouter = require('./category');
const threadRouter = require('./thread');
const commentRouter = require('./comment');


router.use('/user/', authRouter);
router.use('/profile/', profileRouter);
router.use('/section/', sectionRouter);
router.use('/category/', categoryRouter);
router.use('/thread/', threadRouter);
router.use('/comment/', commentRouter);

module.exports=router;