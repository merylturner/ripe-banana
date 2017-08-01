const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URL = 'mongodb://localhost:27017/bananas-test';
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

    it('saves a reviewer', () => {
        return saveReviewer(siskel)
            .then(savedRev => {
                assert.ok(savedRev._id);
                assert.deepEqual(savedRev, siskel);
            });
    });
    
    it('GETs a reviewer if exists', () => {
        return request.get(`/reviewers/${siskel._id}`)
            .then(res => res.body)
            .then(reviewer => {
                assert.deepEqual(reviewer.name, siskel.name);
                assert.deepEqual(reviewer.company, siskel.company);
                assert.ok(reviewer.reviews);
            }
            );
    });

    it('returns 404 if tries to GET reviewer that does not exist', () => {
        return request.get('/reviewers/123412345567898765466676')
            .then(() => { throw new Error('received 200 code when expected 404'); },
                ({ response }) => {
                    assert.ok(response.notFound);
                    assert.ok(response.error);
                }
            );
    });

    it('GETs all reviewers', () => {
        return Promise.all([
            saveReviewer(ebert),
            saveReviewer(nice),
        ])
            .then(res => {
                const reviewers = res.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    else if(a.name < b.name) return -1;
                    else return 0;
                });
                assert.deepEqual(reviewers, [ebert, nice]);
            });
    });

    it('PATCHes a reviewer by id', () => {
        return request.patch(`/reviewers/${nice._id}`)
            .send({ name: 'Nice Reviewer' })
            .then(res => assert.equal(res.body.name, 'Nice Reviewer'));
    });

});