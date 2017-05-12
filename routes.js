const { Router } = require('express')
const router = Router()

const { MonthlyBudget } = require('./models')

router.post(`/addBudget`, (req, res, err) => {
  MonthlyBudget
  .create(req.body)
  .then((budget) => {
    res.send("done")
  })
  .catch(err) 
})

router.get(`/getBudgets`, (req, res, err) => {
  MonthlyBudget
  .find()
  .then((budgets) => {
    res.send(budgets)
  })
  .catch(err) 
})


module.exports = router