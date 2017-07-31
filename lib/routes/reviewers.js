const express = require('express');
const router = express.Router();
const Reviewer = require('../../lib/models/reviewer');
const jsonParser = require('body-parser').json();

router
    .post('/', jsonParser, (req, res, next) => {
        const reviewer = new Reviewer(req.body);
        reviewer
            .save()
            .then(reviewer => res.send(reviewer))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Reviewer.findById(req.params.id)
            .lean()
            .then(reviewer => {
                if(!reviewer) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(reviewer);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Reviewer.find()
            .lean()
            .select('name company _id __v')
            .then(reviewers => res.send(reviewers))
            .catch(next);
    });


module.exports = router;