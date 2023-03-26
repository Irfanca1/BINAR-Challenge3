const http = require('http')
const { PORT = 8000 } = process.env

const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const PUBLIC_DIRECTORY = path.join(__dirname, '../public');
const PUBLIC_DIRECTORY_CSS = path.join(__dirname, '../public/css');
const PUBLIC_DIRECTORY_IMAGES = path.join(__dirname, '../public/images/home');

app.get("/", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIRECTORY, 'index.html'))
})

app.get("/cars", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIRECTORY, 'cariMobil.html'))
})

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(PUBLIC_DIRECTORY_CSS, 'style.css'))
})

app.get("/images/home/:imageName", (req, res) => {
    const imageName = req.params.imageName
    res.sendFile(path.join(PUBLIC_DIRECTORY_IMAGES, `${imageName}`))
})

app.use((req, res) => {
    res.status(404).sendFile(PUBLIC_DIRECTORY, '404.html');
});

app.listen(PORT, () => {
    console.log("Server sudah berjalan, silakan buka http://localhost:%d", PORT)
})