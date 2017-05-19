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
  const newExpense = {
    "expense" : req.body.values.expense,
    "category" : req.body.values.category      
  }

  if(req.body.values._id) {
    newExpense._id = req.body.values._id

    MonthlyBudget
    .findOneAndUpdate({"_id" : req.body._id, "expenses._id" : req.body.values._id}, { "expenses.$.expense" : req.body.values.expense }, { "new" : true})
    .then(response => {
      res.status(200).json({msg: "Success"})
    })
    .catch(error => { next(error) })
  } else {
      MonthlyBudget
      .findOne({ "_id" : req.body._id, "budgetName" : req.body.values.month })
      .then(budget => {
        budget.expenses.push(newExpense)
        budget.save()
        .then(updatedBudget => {
          res.status(200).json({msg: "Success"})
        })
        .catch(error => { next(error) })
      })
      .catch(error => { next(error) })
    }
}
 
module.exports.getUserBudgets = (req, res, next) => {
  MonthlyBudget
  .find({ "_creator" : req.body.userId })
  .then((budgets) => {
    res.status(200).json(budgets)
  })
  .catch(error => { next(error) }) 
}
