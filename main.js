'use strict'

const express = require('express')
const { json } = require('body-parser')
const mongoose = require('mongoose')
const { connect } = require('./database')
const router = require('./routes/router')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const app = express()

app.use(json())
app.use(cors())
app.use("/api/", router)


connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch(console.error)
