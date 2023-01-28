const {Router} = require('express')
const express = require('express')
const work = express.Router()

work.get("/get",(req,res)=>{res.send('GET')})

module.exports = work;