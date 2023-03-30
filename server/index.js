const http = require('http')
const { PORT = 8000 } = process.env

const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const car = require('../public/scripts/car.js')
const carsData = require('../data/cars.json')
const cars = carsData.map(carData => new car(carData))

const PUBLIC_DIRECTORY = path.join(__dirname, '../public');
const PUBLIC_DIRECTORY_CSS = path.join(__dirname, '../public/css');
const PUBLIC_DIRECTORY_IMAGES = path.join(__dirname, '../public/images/home');
const PUBLIC_DIRECTORY_IMAGES_CAR = path.join(__dirname, '../public/images');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIRECTORY, 'index.html'))
})

app.get("/cars", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIRECTORY, 'cariMobil.html'))
})

app.get("/filterAvailable", (req, res) => {
    const { available } = req.query
    const { date } = req.query
    const { time } = req.query
    const penumpang = req.query.penumpang

    console.log(penumpang)
    const filteredCars = cars.filter(car => {
        const dateValue = new Date(date)
        const year = dateValue.getFullYear()

        if (available == '') {
            console.log(car.available.length)
        } else if (available == 'true' && car.year == year && car.capacity >= penumpang) {
            return car.available == true && car.year == year && car.capacity >= penumpang
        } else if (available == 'false' && car.year == year && car.capacity >= penumpang) {
            return car.available == false && car.year == year && car.capacity >= penumpang
        }
    })

    if (filteredCars.length == 0) {
        const alert = `
        <div class="container alert alert-danger text-center" role="alert">
            <p class="alert-heading">
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/>
            </svg>
            </p>
            <p>Data yang anda cari tidak ditemukan!</p>
        </div>
        `
        res.send(alert)
    }
    // const renderedCars = filteredCars.map(car => car.render()).join('');
    // res.send(renderedCars)
    res.render('cariMobil', { cars: filteredCars })
})

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIRECTORY_CSS, 'style.css'))
})

app.get("/images/home/:imageName", (req, res) => {
    const imageName = req.params.imageName
    res.sendFile(path.join(PUBLIC_DIRECTORY_IMAGES, `${imageName}`))
})
app.get("/image/:imageName", (req, res) => {
    const imageName = req.params.imageName
    res.sendFile(path.join(PUBLIC_DIRECTORY_IMAGES_CAR, `${imageName}`))
})

app.use((req, res) => {
    res.sendFile(PUBLIC_DIRECTORY, '404.html');
});

app.listen(PORT, () => {
    console.log("Server sudah berjalan, silakan buka http://localhost:%d", PORT)
})