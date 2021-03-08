import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import hbs from 'hbs';
import request from 'postman-request';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rob Walker'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rob Walker'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Me!',
        name: 'Rob Walker'
    })
});

// app.com/weather

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "You must provide a valid address!" });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({ forecast: forecastData,
                        location,
                        address: req.query.address });
          })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.lat) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'Help article not found',
        name: 'Rob Walker'
    });
});

// 404

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'Page not found',
        name: 'Rob Walker'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});