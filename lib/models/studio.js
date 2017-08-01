const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Film = require('./film');

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    name: requiredString,
    address: {
        city: String,
        state: String,
        country: String
    }, 
    // film: Film.schema
});

module.exports = mongoose.model('Studio', schema);