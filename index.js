const express = require('express')
const path = require('path')
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const app = express()
const PORT = process.env.PORT || 6000;
require('./config/mongoose');
const expressLayout = require("express-ejs-layouts")


app.use(expressLayout)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use("/images", express.static('uploads'))

app.use('/', require('./routes'));


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})