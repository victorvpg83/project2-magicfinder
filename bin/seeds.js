// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Event = require("../models/Event.model")

const bcryptSalt = 10;

mongoose
  // .connect("mongodb+srv://victor:victor1@cluster0-stbd0.mongodb.net/test?retryWrites=true&w=majority", {
    .connect(process.env.DBL, {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [{
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  }
]
  
User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })

  .catch(err => {
    mongoose.disconnect()
    throw err
  })

let events = [{
    title: "Campeonato mundial",
    description: "final del campeonato mundial de Magic",
    lugar: "Centro de convenciones IFEMA",
    phone: 9135246525,
    date: "25 / 03 / 2020",
    location: {
      coordinates: [40.467443, -3.6190877]

    }
  },
  {
    title: "Jornada 3 de la liga local de Madrid",
    description: " Tercera jornada de la liga local",
    lugar: "Centro dotacional de arganzuela",
    phone: 913523425,
    date: "12 / 05 / 2020",
    location: {
      coordinates: [40.4027972, -3.698186]

    }
  },
  {
    title: "Torneo amateur de la comunidad de Madrid",
    description: "Torneo clasificatorio para el acceso a la liga profesional de Magic",
    lugar: "Facultad de medicina, ciudad universitaria",
    phone: 9135234432,
    date: "11 / 12 / 2019",
    location: {
      coordinates: [40.450639, -3.7426786]

    }
  }
]

Event.deleteMany()
  .then(() => {
    return Event.create(events)
  })
  .then(eventsCreated => {
    console.log(`${eventsCreated.location} coordenadas:`);
    console.log(eventsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })