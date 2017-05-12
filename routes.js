const { Router } = require('express')
const router = Router()


app.post(`/api/addBudget`, (req, res, err) => {
  MonthlyBudget
  .create(req.body)
  .then((budget) => {
    res.send("done")
  })
  .catch(err) 
})

app.get(`/api/getBudgets`, (req, res, err) => {
  MonthlyBudget
  .find()
  .then((budget) => {
    res.send(budget)
  })
  .catch(err) 
})