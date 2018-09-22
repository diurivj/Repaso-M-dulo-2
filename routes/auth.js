const router   = require('express').Router()
const User     = require('../models/User')
const passport = require('passport')

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.redirect('/login')
}

router.get('/signup', (req, res) => {
  configuration = {
    title: 'Sign Up',
    btnValue: 'Crear cuenta',
    url: '/signup'
  }
  res.render('auth/signup', configuration)
})

router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
  .then(user => {
    res.redirect('/login')
  })
  .catch(e => console.log(e))
})

router.get('/login', (req, res) => {
  if (req.user) req.logOut()
  else res.render('auth/login')
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/profile')
})

router.get('/profile', isLogged, (req, res) => {
  const {user} = req
  res.render('profile', user) //Lo que le tengo que pasar aquí es un objeto
})

router.get('/edit/:id', (req, res) => {
  configuration = {
    title: 'Edit Profile',
    btnValue: 'Save changes',
    url: '/edit'
  }
  res.render('auth/signup', configuration)
})

module.exports = router