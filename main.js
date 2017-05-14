'use strict'

const express = require('express')
const { json } = require('body-parser')
const mongoose = require('mongoose')
const { connect } = require('./database')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = express()

app.use(json())
app.use('/api/', routes)

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch(console.error)
