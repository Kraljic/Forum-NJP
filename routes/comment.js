const router = require('express').Router();

const verifyToken = require('../verificators/verifyToken');
const verifyModerator = require('../verificators/verifyModerator');
const { validateRequestId, validateCommentRequest, validateCommentPutRequest } = require('../utility/validators');

const Comment = require('../models/Comment');
const Thread = require('../models/Thread');

router.get('/:id', [validateRequestId], (req, res) => {
    Comment
        .findById(req.params.id)
        .populate('createdBy', 'username')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});
router.get('/thread/:id', [validateRequestId], (req, res) => {
    Comment
        .find({ thread: req.params.id, commentParent: null })
        .populate('createdBy', 'username')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});
router.get('/parentComment/:id', [validateRequestId], (req, res) => {
    Comment
        .find({ commentParent: req.params.id })
        .populate('createdBy', 'username')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.post('/', [verifyToken, validateCommentRequest], (req, res) => {
    const comment = new Comment({
        commentText: req.body.commentText,
        thread: req.body.thread,
        commentParent: req.body.commentParent,
        createdBy: req.user._id
    });

    comment.save()
        .then(async data => {
            if (data.commentParent) {
                await Comment.findByIdAndUpdate(
                    data.commentParent,
                    { $push: { comments: data._id } }
                );
            } else {
                await Thread.findByIdAndUpdate(
                    data.thread,
                    { $push: { comments: data._id } }
                );
            }

            return Comment
                .findById(data._id)
                .populate('createdBy', 'username');
        })
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.put('/:id', [verifyToken, validateCommentPutRequest, validateRequestId], async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).send({ error: 'Comment not found' });
    if (comment.createdBy != req.user._id) return res.status(401).send({ error: 'Access Denied' });
    if (comment.deleted) return res.status(400).send({ error: 'Comment deleted' });

    Comment.updateOne(
        { _id: req.params.id },
        { $set: { commentText: req.body.commentText, edited: true } })
        .then(data => {
            return Comment
                .findById(req.params.id)
                .populate('createdBy', 'username')
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/:id', [verifyToken, validateRequestId], async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).send({ error: 'Comment not found' });
    if (comment.createdBy != req.user._id) return res.status(401).send({ error: 'Access Denied' });
    if (comment.deleted) return res.status(400).send({ error: 'Comment deleted' });

    Comment.updateOne(
        { _id: req.params.id },
        { commentText: '[DELETED]', deleted: true })
        .then(async data => {
            let updated = await Comment
                .findById(req.params.id)
                .populate('createdBy', 'username')
            res.status(200).send(updated);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/asModerator/:id', [verifyToken, verifyModerator, validateRequestId], async (req, res) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).send({ error: 'Comment not found' });
    if (comment.deleted) return res.status(400).send({ error: 'Comment deleted' });

    Comment.updateOne(
        { _id: req.params.id },
        { commentText: '[DELETED BY MODERATOR]', deleted: true })
        .then(async data => {
            let updated = await Comment
                .findById(req.params.id)
                .populate('createdBy', 'username')
            res.status(200).send(updated);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});


module.exports = router;