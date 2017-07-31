const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URL = 'mongodb://localhost:27017/ripe-banana-test';
require('../../lib/connect');

const connection = require('mongoose').connection;
const app = require('../../lib/app');
const request = chai.request(app);

describe('REST API for reviewers', () => {

    before(() => connection.dropDatabase());

    const siskel = {
        name: 'Siskel',
        company: 'Siskel Reviews'
    };

    const ebert = {
        name: 'Ebert',
        company: 'Ebert Reviews'
    };

    const nice = {
        name: 'Mr. Nice',
        company: 'Nice Reviews'
    };

    function saveReviewer(reviewer) {
        return request.post('/reviewers')
            .send(reviewer)
            .then(({ body }) => {
                reviewer._id = body._id;
                reviewer.__v = body.__v;
                reviewer.name = body.name;
                reviewer.company = body.company;
                return reviewer;
            });
    }

    xit('GETs a reviewer if exists', () => {

        return request.get(`/reviewers/${siskel._id}`)
            .then(res => res.body)
            .then(reviewer => {
                console.log('reviewer is', reviewer);
                assert.deepEqual(reviewer, siskel);
            }
            );
    });

    it('GETs all reviewers', () => {
        return Promise.all([
            saveReviewer(siskel),
            saveReviewer(ebert),
            saveReviewer(nice),
        ])
            .then(res => {
                const reviewers = res.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    else if(a.name < b.name) return -1;
                    else return 0;
                });
                assert.deepEqual(reviewers, [ebert, nice, siskel]);
            });
    });








});