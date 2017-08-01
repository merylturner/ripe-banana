const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URL = 'mongodb://localhost:27017/bananas-test';
require('../../lib/connect');

const connection = require('mongoose').connection;
const app = require('../../lib/app');
const request = chai.request(app);

describe.only('REST API for reviews', () => {

    before(() => connection.dropDatabase());

    let actor = null;
    let studio = null;
    let film = null;
    let reviewer = null;

    before(() => {
        actor = {
            name: 'meryl',
            dob: '1990, 10,08',
            pob: 'portland'
        };
        return request.post('/actors')
            .send(actor)
            .then(({ body }) => {
                actor._id = body._id;
                return body;
            })
            .then(savedActor => actor = savedActor);
    });



    before(() => {
        studio = {
            name: 'cool studio'
        };
        return request.post('/studios')
            .send(studio)
            .then(({ body }) => {
                studio._id = body._id;
                console.log('studio id is', studio._id);
                return body;
            })
            .then(savedStudio => studio = savedStudio);
    });

    before(() => {
        reviewer = {
            name: 'joe schmoe',
            company: 'joe company'
        };
        return request.post('/reviewers')
            .send(reviewer)
            .then(({ body }) => {
                reviewer._id = body._id;
                return body;
            })
            .then(savedReviewer => reviewer = savedReviewer);
    });



    before(() => {
        film = {
            title: 'batman',
            studio: studio._id,
            released: 2017,
            cast: [
                { role: 'dude', actor: actor._id }
            ]
        };
        return request.post('/films')
            .send(film)
            .then(({ body }) => {
                film._id = body._id;
                return body;
            })
            .then(savedFilm => film = savedFilm);
    });

    let revThree = null;

    function saveReview(review) {
        return request.post('/reviews')
            .send(review)
            .then(({ body }) => {
                review._id = body._id;
                review.rating = body.rating;
                review.reviewer = body.reviewer;
                review.review = body.review;
                review.film = body.film;
                return review;
            });
    }

    it('saves a review', () => {
        const revOne = {
            rating: 3,
            reviewer: reviewer._id,
            review: 'It was okay. Could have been better. Oh well.',
            film: film._id
        };
        return saveReview(revOne)
            .then(savedRev => {
                assert.ok(savedRev._id);
                assert.deepEqual(savedRev, revOne);
            });
    });

    it('GETs up to 100 reviews', () => {

        const revTwo = {
            rating: 4,
            reviewer: reviewer._id,
            review: 'Yay!',
            film: film._id
        };
        revThree = {
            rating: 1,
            reviewer: reviewer._id,
            review: 'Blarg.',
            film: film._id
        };
        return Promise.all([
            saveReview(revTwo),
            saveReview(revThree)
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
                console.log('review is', review);
                assert.equal(review.rating, 5);
            });
    });
});