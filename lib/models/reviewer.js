const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
};
const schema = new Schema({
    name: requiredString,
    company: requiredString
});

module.exports = mongoose.model('Reviewer', schema);