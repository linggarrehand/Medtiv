const express = require('express')
const app = express()
const router = require('./routes')
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        sameSite: true
    }
}))
app.use(router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})