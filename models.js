'use strict'

const mongoose = require('mongoose')

const monthlyBudgetSchema = {
  month: {
     type: Date,
     required: true,
  },
  expenses: [Number]
}

const userSchema = {
  email: {
    type: String,
    lowercase: true,
    required: true,
    match: [HTML5_EMAIL_REGEX, 'Please enter a valid email address'],
    index: { unique: true },
  },
  password: {
    type: String,
    lowercase: true,
    required: true,
  },
  budgets: [monthlyBudgetSchema]
}

const MonthlyBudget = mongoose.model('monthly_budget', monthlyBudgetSchema)
const User = mongoose.model('user', userSchema)

module.exports = { User, MonthlyBudget }