const router      = require('express').Router()
const Notita      = require('../models/Notita')
const User        = require('../models/User')
const uploadCloud = require('../helpers/cloudinary')

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.redirect('/login')
}

router.get('/create_new', isLogged, (req, res) => {
  res.render('notita/create_new')
})

router.post('/create_new', uploadCloud.single('photo'), (req, res, next) => {
  Notita.create({ ...req.body, photo: req.file.url, author: req.user._id })
  .then(notita => {
    User.findByIdAndUpdate(req.user._id,  { $push: { notitas: notita._id } }, { new: true })
    .then(user => {
      console.log(user)
      req.app.locals.loggedUser = user
      res.redirect('/profile')
    })
  })
})

module.exports = router