const express = require('express')
const router = express()
const Controller = require('../controllers/controller')

router.get ('/', Controller.landingPage)
router.get ('/register', Controller.registerForm)
router.post ('/register', Controller.postRegister)
router.get ('/login', Controller.loginForm)
router.post ('/login', Controller.postLogin)

router.use((req, res, next) => {
  console.log (req.session)
  // need to add session condition
  console.log('Time: ', Date.now())
  next()
})

router.get ('/category', Controller.showCategory)



module.exports = router
