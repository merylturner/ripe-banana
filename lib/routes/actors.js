const express = require('express');
const router = express.Router();
const Actor = require('../../lib/models/actor');
const jsonParser = require('body-parser').json();

router
    .use(jsonParser)
    .post('/', (req, res, next) => {
        const actor = new Actor(req.body);
        actor
            .save()
            .then(actor => res.send(actor))
            .catch(next);

    })
    .get('/actors', (req, res, next) => {
        Actor.find()
            .lean()
            .select('name')
            .then(actors => res.send(actors))
            .catch(next);
    });

// .get()


// .populate({
//     name: 'film',
//     select: 'title released'
// })
module.exports = router;