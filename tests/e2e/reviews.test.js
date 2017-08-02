const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URL = 'mongodb://localhost:27017/bananas-test';
require('../../lib/connect');

const beforeData = require('./_before');
const connection = require('mongoose').connection;
const app = require('../../lib/app');
const request = chai.request(app);

describe('REST API for reviews', () => {
    
    before(() => connection.dropDatabase());

    before(() => beforeData.saveActor());
    before(() => beforeData.saveStudio());
    before(() => beforeData.saveFilm());
    before(() => beforeData.saveReviewer());
    before(() => beforeData.saveReview());

    let revThree = null;

    let revOne = beforeData.revOne;
    
    // function saveReview(review) {
    //     return request.post('/reviews')
    //         .send(review)
    //         .then(({ body }) => {
    //             review._id = body._id;
    //             review.rating = body.rating;
    //             review.reviewer = body.reviewer;
    //             review.review = body.review;
    //             review.film = body.film;
    //             return review;
    //         });
    // }

    it('saves a review', () => {
        return beforeData.saveReview()
            .then(savedRev => {
                assert.ok(savedRev._id);
                assert.deepEqual(savedRev, revOne);
            });
    });

    it('GETs up to 100 reviews', () => {

        const revTwo = {
            rating: 4,
            reviewer: beforeData.reviewer._id,
            review: 'Yay!',
            film: beforeData.film._id
        };
        revThree = {
            rating: 1,
            reviewer: beforeData.reviewer._id,
            review: 'Blarg.',
            film: beforeData.film._id
        };
        return Promise.all([
            beforeData.saveReview(revTwo),
            beforeData.saveReview(revThree)
        ])
            .then(res => {
                const reviews = res.sort((a, b) => {
                    if (a.updatedAt > b.updatedAt) return 1;
                    else if (a.updatedAt < b.updatedAt) return -1;
                    else return 0;
                });
                assert.deepEqual(reviews, [revTwo, revThree]);
            });
    });

    it('updates a review by id', () => {
        return request.patch(`/reviews/${revThree._id}`)
            .send({ rating: 5 })
            .then(res => res.body)
            .then(review => {
                assert.equal(review.rating, 5);
            });
    });
});