'use strict'

const mongoose = require('mongoose')

const { MonthlyBudget } = require('../models/budgetModel')
const User = require('../models/userModel');

module.exports.createBudget = (req, res, next) => {
    MonthlyBudget
  .create(req.body)
  .then((budget) => {
    res.status(200).json({msg: "Success"})
  })
  .catch(error => { next(error) }) 
}

module.exports.addExpense = (req, res, next) => {
  MonthlyBudget
  .findOne({ "_creator" : req.body._id, "monthName" : req.body.monthName })
  .then(budget => {
    budget.expenses.push(req.body.newExpense)
    budget.save()
    .then(updatedBudget => {
      res.status(200).json({msg: "Success", updatedBudget})
    })
  })
}
 
module.exports.getUserBudgets = (req, res, next) => {
  MonthlyBudget
  .find({ "_creator" : req.body.userId })
  .then((budgets) => {
    console.log('budgets', budgets)
    res.status(200).json(budgets)
  })
  .catch(error => { next(error) }) 
}
