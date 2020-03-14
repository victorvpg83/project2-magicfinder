const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  description: String,
  lugar: String,
  phone: String,
  date: String,
  location: {type: {type: String},coordinates: [Number]}},
  {
    timestamps: true

  })

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;