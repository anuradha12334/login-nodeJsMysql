const mysql = require('mysql2')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const exp = require('constants')

dotenv.config({ path : './.env'})

const app = express()

var connection = mysql.createConnection({
    host: process.env.Database_host,
    user: process.env.Database_user,
    password: process.env.Database_password,
    database:process.env.Database
})

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

//grab data from any forms
app.use(express.urlencoded({extended : false}))
//the values we grab from form comes as json
app.use(express.json())

app.set('view engine' , 'hbs')

connection.connect((err) => {
    if(err) throw err;

    console.log('Connected!')
})

app.use('/', require('./routes/pages'))
app.use('/auth' , require('./routes/auth'))

app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})

module.exports = connection