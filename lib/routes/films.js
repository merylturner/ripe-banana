const express = require('express');
const router = express.Router();
const Film = require('../../lib/models/film');
const jsonParser = require('body-parser').json();

router
    .use(jsonParser)
    .post('/', (req, res, next) => {
        new Film(req.body)
            .save()
            .then(film => res.send(film))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Film.getReviews(req.params.id)
            .then(film => {
                console.log('film is', film);
                if(!film) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(film);
            })
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Film.find()
            .lean()
            .select('title released studio')
            .populate({
                path: 'studio',
                select: 'name'
            })
            .then(films => {
                res.send(films);
            })
            .catch(next);
    });

module.exports = router;