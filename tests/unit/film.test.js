const { assert } = require('chai');
const Film = require('../../lib/models/film');
const Actor = require('../../lib/models/actor');
const Studio = require('../../lib/models/studio');

describe('Film model unit tests', () => {
    it('validates with required fields', () => {
        const actorOne = new Actor({ name: 'Tina Fey' });
        const actorTwo = new Actor({ name: 'Brad Pitt' });
        const actorThree = new Actor({ name: 'Amy Poehler' });
        const studio = new Studio({ name: 'Sarah Joy Studios' });
        const film = new Film({
            title: 'Mean Girls',
            studio: studio._id,
            released: 2004,
            cast: [
                { role: 'Miss Norbury', actor: actorOne._id },
                { role: 'Cady Heron', actor: actorTwo._id },
                { role: 'Regina George', actor: actorThree._id }
            ]
        });
        return film.validate();
    });

//TODO: what other validations do we need for the film unit tests?



});