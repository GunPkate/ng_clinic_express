// import {work} from './route/work.js''
const express = require('express')
const app = express();
const morgran = require('morgan')
const connectDB = require('./db/ngClinic')
const cors = require('cors')

let port = 3000

connectDB
app.use(morgran('dev'))
app.use(express.json())
app.use(cors())

const work = require('./route/work.js')
app.use("/",work)
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(port,()=>{console.log(`localhost/${port}`);})