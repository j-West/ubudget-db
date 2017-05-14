'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monthlyBudgetSchema = {
  monthName: {
     type: String,
     required: true,
  },
  categories: {
    type: [String],
  },
  expenses: [Number]
}

const MonthlyBudget = mongoose.model('monthly_budget', monthlyBudgetSchema)

module.exports = { MonthlyBudget, monthlyBudgetSchema }
