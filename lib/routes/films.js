const express = require('express');
const router = express.Router();
const Film = require('../../lib/models/film');
const jsonParser = require('body-parser').json();

router
    .use(jsonParser)
    .post('/', (req, res, next) => {
        new Film(req.body)
            .save()
            .then(film => res.send(film))
            .catch(next);
    });

module.exports = router;