'use strict'

const mongoose = require('mongoose')

const jwt = require('jwt-simple')
const { User, MonthlyBudget } = require('./models')
const { secretJWT } = require ('./configs.js')

const userToken = user => {
  const timeStamp = new Date().getTime()
  return jwt.encode({ sub: user._id, iat: timeStamp }, secretJWT.secret)
}


// MONTHLY BUDGETS

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

// USERS

module.exports.signUp = ({body: { email, password}}, res, next) => {
  if (!email || !password) {
    return res.status(422).send({msg: "You must provide an email and password."})
  }

  User
  .findOne({email})
  .then((error, existingUser) => {
    if (error) { return next(error) }

    if (existingUser) {
      return res.status(422).send({msg: "That email is already in use."})
    }
    
    const user = new User({ email, password })
    
    user.save(error => {
      if (error) { return next(error) }

      res.json({ token: userToken(User) })
    })
})
}

