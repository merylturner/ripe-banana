const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    title: requiredString,
    studio: {
        type: Schema.Types.ObjectId,
        ref: 'Studio',
        required: true
    },
    released: {
        type: Number,
        required: true
    },
    cast: [{
        role: String,
        actor: {
            type: Schema.Types.ObjectId,
            ref: 'Actor',
            required: true
        }
    }]
});

module.exports = mongoose.model('Film', schema);