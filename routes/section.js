const router = require('express').Router();

const verifyToken = require('../verificators/verifyToken');
const verifyAdmin = require('../verificators/verifyAdmin');
const verifyRole = require('../verificators/verifyRole');
const { validateRequestId, validateSectionRequest } = require('../utility/validators');

const Section = require('../models/Section');

router.get('/', (req, res) => {
    Section.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});
router.get('/:id', [validateRequestId], (req, res) => {
    Section.findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.post('/', [verifyToken, verifyRole(['admin']), validateSectionRequest], (req, res) => {
    const section = new Section({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user._id
    });

    section.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.put('/:id', [verifyToken, verifyAdmin, validateSectionRequest, validateRequestId], (req, res) => {
    Section.updateOne({ _id: req.params.id }, req.body)
        .then(async data => {
            res.status(202).send(await Section.findById(req.params.id));
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});

router.delete('/:id', [verifyToken, verifyAdmin, validateRequestId], (req, res) => {
    Section.findByIdAndDelete(req.params.id)
        .then(data => {
            if (data)
                res.status(200).send(data);
            else
                res.status(404).send({ error: 'Section with given id not found' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ error: err });
        });
});


module.exports = router;