const {assert} = require('chai');
const Review = require('../../lib/models/review');
const Reviewer = require('../../lib/models/reviewer');
const Film = require('../../lib/models/film');

describe('Review Model unit tests', () => {
    it('validates the review model required fields', () => {
        const reviewer = new Reviewer ({name: 'Marty Baller', company: 'Balling Corporation'});
        const film = new Film({ 
            title: 'Finding Nemo', 
            studio: '123456789009876543211234',
            released: 2003, 
            cast: [
                { role: 'Nemo', actor: '123456789098765432123456' },
                { role: 'Dory', actor: '123456789098765432123456' },
                { role: 'Marlin', actor: '123456789098765432123456' }              
                ]
            });
        const review = new Review ({
          rating: 2, 
          reviewer: reviewer._id, 
          review: 'It was aight!!!!', 
          film: film._id, 
          createdAt: new Date,
          updatedAt: new Date 
        });
        return review.validate();
    });

    it.skip('fails validation when required fields are missing', () => {
        const review = new Review();

    });
});