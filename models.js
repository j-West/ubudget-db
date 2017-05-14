'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')


const monthlyBudgetSchema = {
  monthName: {
     type: String,
     required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  expenses: [Number]
}

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  budgets: [monthlyBudgetSchema]
})

userSchema.pre('save', function(next) {
  const user = this
  console.log(user)

  bcrypt.genSalt(15, (error, salt) => {
    if (error) { return next(error)}
      
    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) { return next(error)}

      user.password = hash
      next()
    })
  })
})

const MonthlyBudget = mongoose.model('monthly_budget', monthlyBudgetSchema)
const User = mongoose.model('User', userSchema)

module.exports = { User, MonthlyBudget }