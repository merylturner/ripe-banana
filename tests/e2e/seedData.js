const chai = require('chai');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../lib/app');
const request = chai.request(app);

// actor seed data:
let merylActor = {
    name: 'meryl',
    dob: '1990, 10, 08',
    pob: 'portland'
};

let angelaActor = {
    name: 'angela',
    dob: '1980, 10, 08',
    pob: 'boston'
};

let peterActor = {
    name: 'peter',
    dob: '2000, 10, 08',
    pob: 'austin'
};

// studio seed data:
let coolStudio = {
    name: 'cool studio'
};

let sillyStudio = {
    name: 'silly studio'
};

let altStudio = {
    name: 'alternative studio'
};

// reviewer seed data:
let joeReviewer = {
    name: 'joe schmoe',
    company: 'joe company'
};

let salReviewer = {
    name: 'sal gal',
    company: 'sal reviews'
};

let rogReviewer = {
    name: 'roger reviewer',
    company: 'roger review co'
};

// movie seed data:
let batmanMovie = {
    title: 'batman',
    studio: null,
    released: 2017,
    cast: [
        { role: 'batman', actor: null }
    ]
};

let sneakersMovie = {
    title: 'sneakers',
    studio: null,
    released: 2017,
    cast: [
        { role: 'dude', actor: null }
    ]
};

let anotherMovie = {
    title: 'another',
    studio: null,
    released: 2017,
    cast: [
        { role: 'dude', actor: null }
    ]
};

// review seed data:
let medReview = {
    rating: 3,
    reviewer: null,
    review: 'It was okay. Could have been better. Oh well.',
    film: null
};

let goodReview = {
    rating: 5,
    reviewer: null,
    review: 'It was great!',
    film: null
};

let badReview = {
    rating: 1,
    reviewer: null,
    review: 'It was terrible.',
    film: null
};

function saveActor(actor = merylActor) {
    return request.post('/actors')
        .send(actor)
        .then(({ body }) => {
            actor._id = body._id;
            return body;
        });
        // .then(savedActor => actor = savedActor);
}

function saveStudio(studio = coolStudio) {
    return request.post('/studios')
        .send(studio)
        .then(({ body }) => {
            studio._id = body._id;
            return body;
        });
        // .then(savedStudio => studio = savedStudio);
}

function saveReviewer(reviewer = joeReviewer) {
    return request.post('/reviewers')
        .send(reviewer)
        .then(({ body }) => {
            reviewer._id = body._id;
            reviewer.__v = body.__v;
            return body;
        })
        .then(savedReviewer => reviewer = savedReviewer);
}

function saveFilm(film = batmanMovie) {
    return request.post('/films')
        .send(film)
        .then(({ body }) => {
            console.log('film is', film, 'body is', body);
            film._id = body._id;
            return body;
        })
        .then(savedFilm => film = savedFilm);
}

function saveReview(review = medReview) {
    return request.post('/reviews')
        .send(review)
        .then(({ body }) => {
            review._id = body._id;
            review.__v = body.__v;
            review.createdAt = body.createdAt;
            review.updatedAt = body.updatedAt;
            return body;
        })
        .then(savedReview => review = savedReview);
}

let returnedArray = [];

function addProps() {
    return Promise.all([
        saveStudio(coolStudio),
        // saveStudio(sillyStudio),
        // saveStudio(altStudio),
        // saveActor(merylActor),
        // saveActor(peterActor),
        saveActor(angelaActor)
    ])
        .then(([coolStudio, angelaActor]) => {
            console.log('cool studio and angela actor are', [coolStudio, angelaActor]);
        })
        // .then(returned => {
        //     coolStudio = returned[0];
        //     // sillyStudio = returned[1];
        //     // altStudio = returned[2];
        //     // merylActor = returned[3];
        //     // peterActor = returned[4];
        //     angelaActor = returned[5];
    // })
        .then(() => {
            return Promise.all([
                saveFilm(batmanMovie)
            ])
                .then(([batmanMovie]) => {
                    batmanMovie = batmanMovie[0];
                    batmanMovie.studio = returnedArray[0]._id;
                    batmanMovie.cast.actor = returnedArray[3]._id;
                    console.log('batmanmovie is', batmanMovie);
                    return batmanMovie;
                });

        });


}

addProps();


module.exports = {
    saveActor,
    saveFilm,
    saveReviewer,
    saveStudio,
    saveReview,
    actorOne: merylActor,
    actorTwo: angelaActor,
    actorThree: peterActor,
    studioOne: coolStudio,
    studioTwo: sillyStudio,
    studioThree: altStudio,
    reviewerOne: joeReviewer,
    reviewerTwo: salReviewer,
    reviewerThree: rogReviewer,
    filmOne: batmanMovie,
    filmTwo: sneakersMovie,
    filmThree: anotherMovie,
    reviewOne: medReview,
    reviewTwo: goodReview,
    reviewThree: badReview
};