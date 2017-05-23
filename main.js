'use strict'

const express = require('express')
const { json, urlencoded } = require('body-parser')
const mongoose = require('mongoose')
const { connect } = require('./database')
const router = require('./routes/router')
const cors = require('cors')
const { auths } = require('./config')
const mongoose = require('mongoose')

const app = express()

const MONGODB_URL = `mongodb://${auths.user}:${auths.pw}@ds139761.mlab.com:39761/ubudget`
mongoose.Promise = Promise


app.set('port', (process.env.PORT || 5000));

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cors())
app.use("/api/", router)


mongoose.connect(MONGODB_URL)
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch(console.error)
