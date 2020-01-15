const router = require('express').Router();

const verifyRole = require('../verificators/verifyRole');
const { validateId, validateThreadRequest, validateThreadPutRequest } = require('../utility/validators');

const Thread = require('../models/Thread');
const Comment = require('../models/Comment');

router.get('/:id', [validateId], (req, res) => {
    Thread
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
router.get('/category/:id', [validateId], (req, res) => {
    Thread
        .find({ category: req.params.id })
        .populate('createdBy', 'username')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.post('/', [validateThreadRequest], (req, res) => {
    const thread = new Thread({
        title: req.body.title,
        threadText: req.body.threadText,
        category: req.body.category,
        createdBy: req.user._id
    });

    thread.save()
        .then(data => {
            return Thread
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

router.put('/:id', [validateThreadPutRequest, validateId], async (req, res) => {
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).send({ error: 'Thread not found' });
    if (thread.createdBy != req.user._id) return res.status(401).send({ error: 'Access Denied' });

    Thread.updateOne(
        { _id: req.params.id },
        { $set: { threadText: req.body.threadText, edited: true } })
        .then(data => {
            return Thread
                .findById(req.params.id)
                .populate('createdBy', 'username');
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/:id', [validateId], async (req, res) => {
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).send({ error: 'Thread not found' });
    if (thread.createdBy != req.user._id) return res.status(401).send({ error: 'Access Denied' });

    Thread.findByIdAndDelete(req.params.id)
        .then(async data => {
            await Comment.deleteMany({ thread: data._id });
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/asModerator/:id', [verifyRole('moderator'), validateId], async (req, res) => {
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).send({ error: 'Thread not found' });

    Thread.findByIdAndDelete(req.params.id)
        .then(async data => {
            if (data) {
                await Comment.deleteMany({ thread: data._id });
                res.status(200).send(data);
            }
            else
                res.status(404).send({ error: 'Thread not found!' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.put('/like/:id', [validateId], async (req, res) => {
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).send({ error: 'Thread not found' });

    thread.update({ $addToSet: { likes: req.user._id } })
        .then(data => {
            return Thread
                .findById(req.params.id)
                .populate('createdBy', 'username');
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/like/:id', [validateId], async (req, res) => {
    const thread = await Thread.findById(req.params.id);

    if (!thread) return res.status(404).send({ error: 'Thread not found' });

    thread.update({ $pull: { likes: req.user._id } })
        .then(data => {
            return Thread
                .findById(req.params.id)
                .populate('createdBy', 'username');
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

module.exports = router;