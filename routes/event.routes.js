const express = require('express');
const router = express.Router();
const Event = require("../models/Event.model")

/* Event routes */

router.get('/', (req, res, next) => {
  Event.find()
    .then(allEvents => res.render('events', {
      events: allEvents,
      user: req.user
    }))
    .catch(err => console.log(err))
});

router.get('/api', (req, res, next) => {
  Event.find()
    .then(allEvents => res.json(allEvents))
    .catch(err => console.log(err))
});

module.exports = router;