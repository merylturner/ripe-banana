const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../lib/app');
const request = chai.request(app);

let actor = {
    name: 'meryl',
    dob: '1990, 10, 08',
    pob: 'portland'
};

let studio = {
    name: 'cool studio'
};

let reviewer = {
    name: 'joe schmoe',
    company: 'joe company'
};

let film = {
    title: 'batman',
    studio: studio._id,
    released: 2017,
    // cast: [
    //     { role: 'dude', actor: actor._id }
    // ]
};

function beforeSaveActor() {

    return request.post('/actors')
        .send(actor)
        .then(({ body }) => {
            actor._id = body._id;
            return body;
        })
        .then(savedActor => actor = savedActor);
}

function beforeSaveStudio() {
    return request.post('/studios')
        .send(studio)
        .then(({ body }) => {
            studio._id = body._id;
            film.studio = studio._id;
            return body;
        })
        .then(savedStudio => studio = savedStudio);
}

function beforeSaveReviewer() {

    return request.post('/reviewers')
        .send(reviewer)
        .then(({ body }) => {
            reviewer._id = body._id;
            return body;
        })
        .then(savedReviewer => reviewer = savedReviewer);
}

function beforeSaveFilm() {

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
    beforeSaveStudio,
    actor,
    studio,
    reviewer,
    film
};