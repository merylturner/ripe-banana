const { assert } = require('chai');
const Film = require('../../lib/models/film');

describe('Film model unit tests', () => {
    it('validates with required fields', () => {
        const film = new Film({
            title: 'Mean Girls',
            studio: '123456789098765432123456',
            released: 2004,
            cast: [
                { role: 'Miss Norbury', actor: '123456789098765432123456' },
                { role: 'Cady Heron', actor: '123456789098765432123456' },
                { role: 'Regina George', actor: '123456789098765432123456' }
            ]
        });
        return film.validate();
    });





});