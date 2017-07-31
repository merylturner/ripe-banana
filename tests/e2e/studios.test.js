const db = require('./_db');
const request = require('./_request');
const { assert } = require('chai');

describe('studios REST api', () => {
    before(db.drop);

    const warner = {
        name: 'Warner Bros Studios', 
        location: 'Los Angeles'
    };

    const fox = {
        name: 'Fox Studios', 
        location: 'New York'
    };

    const universal = {
        name: 'Universal Studios',
        location: 'Portland'
    };

    function saveStudio(studio) {
        return request.post('/api/studios')
            .send(studio)
            .then(( { studio }) => {
                studio._id = body._id;
                studio._v = body._v;
                return body
            });
    }
    

    it.only('GETs studio if it exists', () => {
        return request
            .get('/api/studios/`${warner._id}')
            .then(req => res.body)
            .then(studio => {
                assert.equal(studio.name, warner.name);
                assert.equal(studio.location, warner.location);
            });          
    });

it('returns 404 if otter does not exist', () => {
        return request.get('/api/studios/58ff9f496aafd447111c29b5')
        .then(
            () => {
                throw new Error('Unexpected Success In Error Test');
            },
            res => {
                assert.equal(res.status, 404);
                assert.equal(res.message, 'Not Found');
            }
        );
    });

    it('GET all Studios', () => {
        return Promise.all([
            saveStudio(warner),
            saveStudio(Fox),
        ])
            .then(() => request.get('/api/studios'))
            .then(res => {
                const studios = res.body;
                assert.equal(studios[2].name, warner.name);
                assert.equal(studios[1].type, fox.location);
            });
    });

    it('Replaces otter content', () => {
        const marvel = { name: 'Marvel Studios', location: 'Mars'};
        return request
            .put(`/api/studios/${warner._id}`)
            .send(marverl)
            .then(res => res.body)
            .then(studio => {
                assert.equal(warner.name, marvel.name);
                assert.equal(warner.location, marvel.location);
            });
    });

    it('deletes an studio by id',() => {
        return request
            .delete(`/api/studios/${warner._id}`)
            .then(res => {
                assert.deepEqual(JSON.parse(res.text), {removed: true});
            });
    });
});