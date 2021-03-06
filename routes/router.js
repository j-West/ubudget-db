'use strict'


const passportStrategies = require('../strategies/passport');
const passport = require('passport');

const { Router } = require('express')
const router = Router()

const { signUp, signIn } = require('../controllers/userCtrl');
const { createBudget, getUserBudgets, addExpense } = require('../controllers/monthlyBudgetCtrl')


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });


router.get('/', requireAuth, function(req, res) {
  res.send({ message: 'Cool, it works!' });
});
router.post('/signin', requireSignIn, signIn)
router.post('/signup', signUp);
router.post('/addbudget', createBudget)
router.post('/getbudgets', getUserBudgets)
router.post('/addexpense', addExpense)


module.exports = router
