const express = require('express');
const router = express.Router();
const Studio = require('../../lib/models/studio');
const Film = require('../models/film');
const jsonParser = require('body-parser').json();

router
.use(jsonParser)
 .post('/', (req, res, next) => {
        const studio= new Studio(req.body);
        studio.save()
            .then(studio => res.send(studio))
            .catch(next);        
    })

 .get('/:id', (req, res, next) => {
        Studio.findById(req.params.id)
            .then(studio => res.send(studio))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Studio.find()
              .lean()
              .select('name')
              .then(studios => res.send(studios))
              .catch(next);  
    })


    // .delete('/:id', (req, res, next) => {
    //     Studio.verifyRemove(req.params.id)
    //           .then(studio => res.send({ removed: !!studio }))
    //           .catch(next);  
    // });

module.exports = router;
