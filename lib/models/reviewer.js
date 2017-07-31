const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: requiredString,
    company: requiredString
});

schema.statics.getReviews = function(id) {
    return Promise.all([
        this.findById(id)
            .lean(),
        Review.find({ film: id })
            .select('film.title rating review')
            .lean()    
    ])
        .then(([reviewers, reviews]) => {
            reviewers.reviews = [reviews];
            return reviewers;
        });
};

module.exports = mongoose.model('Reviewer', schema);