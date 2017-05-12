'use strict'

const auth = require('./dbAuth')

const mongoose = require('mongoose')

const MONGODB_URL = `mongodb://${auth.user}:${auth.pw}@ds139761.mlab.com:39761/ubudget`

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)

