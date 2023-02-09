const {Category, Medicine, Transaction, User, UserProfile} = require ('../models')
const bcrypt = require ('bcryptjs')
const { formatCurrency } = require('../helpers')
const { Op } = require('sequelize')
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
        const { success, search } = req.query
        const { categoryId } = req.params
        let options = {
            include: Medicine,
        }
        if (search) {
            options = {
                include : {
                    model : Medicine,
                    where : {
                        name : {
                            [Op.iLike] : `%${search}%`
                        }
                    }
                }
            }
        }
        Category.findByPk(categoryId, options)
            .then((category) => res.render('detail-category', { category, formatCurrency, success }))
            .catch(err => res.send(err))
    }
    static addMedicine (req, res) {
        const { categoryId } = req.params
        const {error} = req.query
        Category.findByPk(categoryId)
            .then(category => res.render('add-medicine', { category, error }))
            .catch(err => res.send(err))
    }
    static createMedicine (req, res) {
        let { categoryId } = req.params
        let CategoryId = categoryId
        const { name, description, medicineLevel, stock, price } = req.body
        Medicine.create({ name, description, medicineLevel, stock, price, CategoryId })
            .then(() => res.redirect(`/category/${CategoryId}`))
            .catch (err => {
                if (err.name === 'SequelizeValidationError') {
                    const errors = err.errors.map ((el) => el.message)
                    res.redirect (`/category/${categoryId}/medicine/add?error=${errors}`)
                } else {
                    res.send (err)
                }
            })
    }
    static editMedicine (req, res) {
        const { categoryId, medicineId } = req.params
        let medicineData
        Medicine.findByPk(medicineId)
            .then(medicine => {
                medicineData = medicine
                return Category.findByPk(categoryId)
            })
            .then(category => res.render('edit-medicine', { category, medicineData }))
            .catch(err => res.send(err))
    }
    static updateMedicine (req, res) {
        const { categoryId, medicineId } = req.params
        const id = medicineId
        const CategoryId = categoryId
        const { name, description, medicineLevel, stock, price } = req.body
        Medicine.update({ name, description, medicineLevel, stock, price, CategoryId }, {
            where: {
                id
            }
        })
            .then(() => res.redirect(`/category/${CategoryId}`))
            .catch(err => res.send(err))
    }
    static deleteMedicine (req, res) {
        const { categoryId, medicineId } = req.params
        let medicineName
        let medicineLevel
        Medicine.findByPk(medicineId)
            .then(medicine => {
                medicineName = medicine.name
                medicineLevel = medicine.medicineLevel
                const id = medicine.id
                return Medicine.destroy({
                    where: {
                        id
                    }
                })
            })
            .then(() => {
                res.redirect(`/category/${categoryId}?success=Medicine ${medicineName} with level ${medicineLevel} has been removed`);
            })
            .catch(err => res.send(err))
    }
}


module.exports = Controller