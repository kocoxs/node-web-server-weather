const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocodeAPI = require('./utils/goecode.js') 
const weatherAPI = require('./utils/weather.js') 

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(partialsPath)

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Consulta el Clima',
        name: 'Aaron Contreras' 
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Aaron Contreras' 
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Aaron Contreras' 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'hace falta el parametro ?address=""'
        });
    }

    geocodeAPI.geocode(req.query.address, (error, {latitude, longitude, place_name } = {}) => {
        if(error){
            return res.send({
                error
            });
        }else{
            weatherAPI.weather({lat: latitude, long: longitude}, (error, {summary, temperature, precipProbability } = {}) => {
                if(error){
                    return res.send({
                        error
                    });
                }else{
                    res.send({
                        location: req.query.address,
                        weather: `El clima en ${place_name} : es ${summary} con una temperaruta de ${temperature} y una probabilidad de lluvia de ${precipProbability}`
                    })
                    
                }
            })
        }
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'hace falta el parametro search'
        });
    }

    res.send({
        parametro:req.query.search
    })
})

app.get('/help/*', (req, res) => {
    res.render('not_found',{
        title: 'AYUDA no encontrada',
        name: 'no encontrado' 
    })
})

app.get('*', (req, res) => {
    res.render('not_found',{
        title: 'Pagina no encontrada 404',
        name: 'no encontrado' 
    })
})

app.listen(3000, () => {
    console.log("Servidor esta corriendo")
})