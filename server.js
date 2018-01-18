const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    // fs.appendFile('server.log', log + '\n', (err) => {
    //     if (err) {
    //         console.log('Log error')
    //     }
    // })
    // res.render('maintenance.hbs', {
    //     pageTitle: 'Oh no...'
    // })
   next()
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

app.get('/', (req, res)  => {
    res.send({
        name: 'Some name',
        likes: [
            'soaring', 'family'
        ]
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Dynamic about page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        status: 'ERROR',
        errorMessage: 'Something went wrong'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})