const router = require('express').Router();

const verifyRole = require('../verificators/verifyRole');
const { validateId, validateCategoryRequest } = require('../utility/validators');

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
router.get('/:id', [validateId], (req, res) => {
    Category.findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});
router.get('/section/:id', [validateId], (req, res) => {
    Category.find({ section: req.params.id })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.post('/', [verifyRole('moderator'), validateCategoryRequest], (req, res) => {
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

router.put('/:id', [verifyRole('moderator'), validateCategoryRequest, validateId], (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body)
        .then(async data => {
            if (data)
                res.status(202).send(await Category.findById(req.params.id));
            else
                res.status(404).send({ error: 'Category with given id not found' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/:id', [verifyRole('moderator'), validateId], (req, res) => {
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