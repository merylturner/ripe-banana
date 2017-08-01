const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../lib/app');
const request = chai.request(app);

let actor = null;
let studio = null;
let film = null;
let reviewer = null;

function beforeSaveActor() {
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
}

function beforeSaveStudio() {
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
}

function beforeSaveReviewer() {
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
}

function beforeSaveFilm() {
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
}

module.exports = {
    beforeSaveActor,
    beforeSaveFilm,
    beforeSaveReviewer,
    beforeSaveStudio
};