'use strict'

const mongoose = require('mongoose')

const { MonthlyBudget } = require('../models/budgetModel')

module.exports.createBudget = (req, res, next) => {
    MonthlyBudget
  .create(req.body)
  .then((budget) => {
    res.status(200).json({msg: "Success"})
  })
  .catch(error => { next(error) }) 
}
 
module.exports.getAllBudgets = (req, res, next) => {
  MonthlyBudget
  .find()
  .then((budgets) => {
    res.send(budgets)
  })
  .catch(error => { next(error) }) 
}
