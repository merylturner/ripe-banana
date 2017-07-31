const Router = require('express').Router;
const router = Router();
const Review = require('../../lib/models/review');
const jsonParser = require('body-parser').json();

router
    .post('/', jsonParser, (req, res, next) => {
        new Review(req.body)
            .save()
            .then(review => res.send(review))
            .catch(next);
    });


module.exports = router;