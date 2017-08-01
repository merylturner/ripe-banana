const Router = require('express').Router;
const router = Router();
const Review = require('../../lib/models/review');
const jsonParser = require('body-parser').json();

router
    .post('/', jsonParser, (req, res, next) => {
        new Review(req.body)
            .save()
            .then(review => {
                res.send(review);
            })
            .catch(next);
    })

    // TODO: make film.title populate instead of the film id
    .get('/', (req, res, next) => {
        Review.find()
            .lean()
            .populate({
                path: 'reviews',
                select: 'rating review film.title _id __v',
                options: { limit: 100 }
            })
            .then(reviews => {
                console.log('reviews is', reviews);
                res.send(reviews);
            })
            .catch(next);
    });

module.exports = router;