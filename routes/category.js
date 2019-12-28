const router = require('express').Router();

const verifyToken = require('../verificators/verifyToken');
const verifyModerator = require('../verificators/verifyModerator');
const { validateRequestId, validateCategoryRequest } = require('../utility/validators');

const Category = require('../models/Category');

router.get('/', (req, res) => {
    Category.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});
router.get('/:id', [validateRequestId], (req, res) => {
    Category.findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});
router.get('/section/:id', [validateRequestId], (req, res) => {
    Category.find({ section: req.params.id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.post('/', [verifyToken, verifyModerator, validateCategoryRequest], (req, res) => {
    const category = new Category({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user._id,
        section: req.body.section
    });

    category.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.put('/:id', [verifyToken, verifyModerator, validateCategoryRequest, validateRequestId], (req, res) => {
    Category.updateOne({ _id: req.params.id }, req.body)
        .then(async data => {
            res.status(202).send(await Category.findById(req.params.id));
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/:id', [verifyToken, verifyModerator, validateRequestId], (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(data => {
            if (data)
                res.status(200).send(data);
            else
                res.status(404).send({ error: 'Category with given id not found' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

module.exports = router;