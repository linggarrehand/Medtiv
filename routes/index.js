const express = require('express')
const router = express()
const Controller = require('../controllers/controller')

router.get ('/', Controller.landingPage)
router.get ('/register', Controller.registerForm)
router.post ('/register', Controller.postRegister)
router.get ('/login', Controller.loginForm)
router.post ('/login', Controller.postLogin)

router.use((req, res, next) => {
  // need to add session condition
  // console.log('Time: ', Date.now())
  next()
})

router.get ('/category', Controller.showCategory)
router.get ('/category/:categoryId', Controller.showMedicineCategory)
router.get('/category/:categoryId/medicine/add', Controller.addMedicine)
router.post('/category/:categoryId/medicine/add', Controller.createMedicine)
router.get('/category/:categoryId/medicine/:medicineId/edit', Controller.editMedicine)
router.post('/category/:categoryId/medicine/:medicineId/edit', Controller.updateMedicine)
router.get('/category/:categoryId/medicine/:medicineId/delete', Controller.deleteMedicine)



module.exports = router
