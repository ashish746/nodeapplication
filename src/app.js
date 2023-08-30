const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for Express config.
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Ashish Sharma"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Ashish sharma"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "This is HELP PAGE",
        name: "Ashish sharma"
    })
})


app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide address for weather forecast'
        })
    }

    if(req.query.address){
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                } 
                res.send({
                    data: forecastData,
                    location: location
                })
            })
        })
    }
})

// app.get('/products', (req, res) => {
//     if(!req.query.model){
//         return res.send({
//             error: 'you must provide a search term'
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('help/*', (req, res) => {
    res.render('error', {
        title: "404",
        name: "Ashish sharma",
        msg: "Help article not found"
    })
})

app.get('*', (req, res) =>{
    res.render('error', {
        title: "404",
        name: "Ashish sharma",
        msg: "Page not found"
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})