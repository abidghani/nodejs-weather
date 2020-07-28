const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Start up express web server
const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Routes

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kriss jong un'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Kriss jong un'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: '51/51 coming to lock me up y\'all',
        title: 'Help',
        name: 'Kriss jong un'
    })
})


app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    //

    geocode(req.query.address, (error, {long,lat, location} = {}) => {

        if(error) {
           return res.send({
               error: error
           })
        }
     
        forecast(long, lat, (error, forecastData) => {
         
        if (error) {
           return res.send({
               error: error
           })
          } 
     
        res.send({
            location: location,
            forecast: forecastData,
            address: req.query.address
          })
         })
     
     })
})


// send back some static JSON
app.get('/products', (req, res)=> {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kriss jong un',
        errorMessage: 'Help aticle not found'
    })
})


app.get('*',(req,res) => {
    res.render('404', {
        title: '404',
        name: 'Kriss jong un',
        errorMessage: 'Page not found'
    })
})

// Listening port 

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})



