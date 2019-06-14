const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));

//Setup static directory to serve
app.get('', (req,res) => {
    res.render('index', {
        'title': 'Index',
        'name': 'Nicolas'
    });
})

app.get('/about', (req,res) => {
    res.render('about', {
        'title': 'About',
        'name': 'Nicolas'
    });
})

app.get('/help', (req,res) => {
    res.render('help', {
        'title': 'Help',
        'name': 'Nicolas'
    });
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        'title': 'Error',
        'error': 'Article not found',
        'name': 'Nicolas'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            'error': 'Debes buscar'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, fdata) => {
            if(error){
                return res.send({error})
            }
            console.log(location)
            console.log(fdata)
            res.send({
                location,fdata
            })  
        })
    })
     
})

app.get('/products', (req,res) => {
    console.log(req.query);
    if(!req.query.search) {
        return res.send({
            'error': 'Debes buscar'
        })
    }    
    res.send({
        'products' : []
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        'title': 'Error',
        'error': '404 - Page not found',
        'name': 'Nicolas'
    });
})


app.listen(3000, () => {
    console.log('El servidor se esta ejecutando')
})