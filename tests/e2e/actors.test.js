const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

process.env.MONGODB_URI = 'mongodb://localhost:27017/actors-test';

require('../../lib/connect');

const connection = require('mongoose').connection;

const app = require('../../lib/app');
const request = chai.request(app);


describe('actors REST api', () => {

    before(() => connection.dropDatabase());

    // let film = null;

    let amyPoehler = {
        name: 'Amy Poehler',
        dob: new Date(1971, 9, 16),
        pob: 'Newton'
    };

    // let willSmith = {
    //     name: 'Will Smith',
    //     dob: new Date(1968, 9, 25),
    //     pob: 'Philadelphia'
    // };

    // let bryanCranston = {
    //     name: 'Bryan Cranston',
    //     dob: new Date(1956, 3, 7),
    //     pob: 'Los Angeles'
    // };

    function saveActor(actor) {
        // actor.film = film._id;
        return request.post('/actors')
            .send(actor)
            .then(({ body }) => {
                actor._id = body._id;
                actor.__v = body.__v;
                return body;
            });
    }

    it('saves an actor', () => {
        console.log(saveActor(amyPoehler));
        return saveActor(amyPoehler)
            .then(savedActor => {
                console.log('savedActor is', savedActor);
                assert.ok(savedActor._id);
                assert.deepEqual(savedActor, amyPoehler);
            });

    });
});