'use strict'

const { json } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const { connect } = require('./database')
const session = require('express-session')
const bcrypt = require('bcrypt')
const app = express()
const PORT = process.env.PORT || 3000

app.use(json())
app.use('/api/', routes)


// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST,HEAD, OPTIONS,PUT, DELETE, PATCH");
//   next();
// });


connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch(console.error)
