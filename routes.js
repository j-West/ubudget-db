const { Router } = require('express')
const router = Router()

const { createBudget, getAllBudgets, signUp } = require('./controllers')

router.post('/signup', signUp)
router.post(`/addbudget`, createBudget)
router.get(`/getbudgets`, getAllBudgets)



module.exports = router