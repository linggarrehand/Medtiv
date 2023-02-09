const {Category, Medicine, Transaction, User, UserProfile} = require ('../models')
const bcrypt = require ('bcryptjs')
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
        res.render ('category')
    }
}


module.exports = Controller