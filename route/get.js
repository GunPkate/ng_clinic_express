const express = require('express')
const work = express.Router()
const mongoose = require('mongoose')
const clinicSchema = mongoose.model("clinic",require("../Schema/clinic.js"))

work.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET','POST')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With','content-type')
    res.setHeader('Access-Control-Allow-Credential',true)
    next()
})

work.post("/test",async(req,res,next)=>{
    let obj = {
        name: "name",
        tel: "0822",
        tax: "8510",
        address: "BKK"
    }

    let result = await clinicSchema.create(obj)
    res.status(200).json(result)
})

work.get("/find",async(req,res)=>{
    let result = await clinicSchema.find({})
    res.status(200).json(result)
    // console.log(result);
    // res.status(200).json(result)
    // res.send()
})

work.get("/ss",(req,res,next)=>{
    let obj = {
        name: "name",
        tel: "0822",
        tax: "8510",
        address: "BKK"
    }

    res.status(200).json(obj)
})

module.exports = work;