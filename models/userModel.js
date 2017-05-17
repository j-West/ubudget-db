'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const { monthlyBudgetSchema } = require('./budgetModel')

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true
  },
  password: String,
  budgets: [{ type: Schema.Types.ObjectId, ref: 'MonthlyBudget' }]
})

userSchema.pre('save', function(next) {
  const user = this

  bcrypt.genSalt(5, (error, salt) => {
    if (error) { return next(error)}

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(error)}

      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function(pwToCompare, cb) {
  bcrypt.compare(pwToCompare, this.password, (error, isMatch) => {
    if (error) { return cb(error) }
    cb(null, isMatch)
  })
}

const User = mongoose.model('user', userSchema)

module.exports = User
