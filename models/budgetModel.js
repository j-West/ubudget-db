'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const monthlyBudgetSchema = {
  _creator: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  monthName: {
     type: String,
     required: true,
  },
  expenses: [{
    expense: Number,
    category: String
  }]
}
const MonthlyBudget = mongoose.model('monthly_budget', monthlyBudgetSchema)

module.exports = { MonthlyBudget, monthlyBudgetSchema }
