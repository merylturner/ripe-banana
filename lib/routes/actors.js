const Router = require('express').Router;
const router = Router();
const Actor = require('../../lib/models/actor');

router
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