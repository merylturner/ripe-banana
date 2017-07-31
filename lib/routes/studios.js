const { Router } = require('express');
const router = Router();
const Studios = require('../models/studio');
const Film = require('../models/film');

router
    .get('/', (req, res, next) => {
        Studio.find()
              .lean()
              .then(studios => res.send(studios))
              .catch(next);  
    })

    .get('/:id', (req, res, next) => {
        Studio.getDetail(req.params.id)
            .then(studio => res.send(studio))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        const { title } = req.body;

        const film = new Film({ title });
            film.populateFromTitle()
                .then(() => {
                    const studio = new Studio(req.body);
                    studio.film = film;
                    return studio.save();
                })
                .then(studio => res.send(studio))
                .catch(next);        
    })

    .delete('/:id', (req, res, next) => {
        Studio.verifyRemove(req.params.id)
              .then(studio => res.send({ removed: !!studio }))
              .catch(next);  
    });

module.exports = router;
