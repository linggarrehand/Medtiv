const {Category, Medicine, Transaction, User, UserProfile} = require ('../models')
const bcrypt = require ('bcryptjs')
const { formatCurrency } = require('../helpers')
class Controller {
    static landingPage (req, res) {
        res.render ('landing-page')
    }
    static registerForm (req, res) {
        res.render ('register-form')
    }
    static postRegister (req, res) {
        const {email, password, role} = req.body
        User.create ({email, password, role})
        .then (() => res.redirect ('/login'))
        .catch (err => res.send (err))
    }
    static loginForm (req, res) {
        const {error} = req.query

        res.render ('login-form', {error})
    }
    static postLogin (req, res) {
        const {email, password} = req.body
        User.findOne ({where : {email} })
            .then (user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync (password, user.password)
                    if (isValidPassword) {
                        req.session.userId = user.id
                        return res.redirect ('/category')
                    } else {
                        const err = 'Invalid password'
                        return res.redirect (`/login?error=${err}`)
                    }
                } else {
                    const err = 'Invalid email'
                    return res.redirect (`/login?error=${err}`)
                }
            })
            .catch (err => res.send(err))
    }
    static showCategory(req, res) {
        Category.findAll()
            .then(category => res.render('category', { category }))
            .catch(err => res.send(err))
    }
    static showMedicineCategory(req, res) {
        const { categoryId } = req.params
        Category.findByPk(categoryId, { include: Medicine })
            .then((category) => res.render('detail-category', { category, formatCurrency }))
            .catch(err => res.send(err))
    }
    static addMedicine (req, res) {
        const { categoryId } = req.params
        Category.findByPk(categoryId)
            .then(category => res.render('add-medicine', { category }))
            .catch(err => res.send(err))
    }
    static createMedicine (req, res) {
        let { categoryId } = req.params
        let CategoryId = categoryId
        const { name, description, medicineLevel, stock, price } = req.body
        Medicine.create({ name, description, medicineLevel, stock, price, CategoryId })
            .then(() => res.redirect(`/category/${CategoryId}`))
            .catch(err => res.send(err))
    }
    static editMedicine (req, res) {
        res.send ('ok')
    }
    static updateMedicine (req, res) {
        res.send ('ok')
    }
    static deleteMedicine (req, res) {
        res.send ('ok')
    }
}


module.exports = Controller