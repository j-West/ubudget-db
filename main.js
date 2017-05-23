'use strict'

const express = require('express')
const { json, urlencoded } = require('body-parser')
const mongoose = require('mongoose')
const { connect } = require('./database')
const router = require('./routes/router')
const cors = require('cors')

const app = express()

app.set('port', (process.env.PORT || 5000));

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors())
app.use("/api/", router)


connect()
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch(console.error)
