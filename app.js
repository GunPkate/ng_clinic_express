// import {work} from './route/get.js'
const express = require('express')
const app = express();
const morgran = require('morgan')

app.use(morgran('dev'))

const work = require('./route/get.js')
app.use("/",work)
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(3000)