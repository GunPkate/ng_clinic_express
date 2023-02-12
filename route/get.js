const express = require('express')
const work = express.Router()
const mongoose = require('mongoose')
const clinicSchema = mongoose.model("clinic",require("../Schema/clinic.js"))
const customerSchema = mongoose.model('customer',require("../Schema/customer"))
const petSchema = mongoose.model('pet',require("../Schema/pet"))
// work.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*')
//     res.setHeader('Access-Control-Allow-Methods','GET','POST')
//     res.setHeader('Access-Control-Allow-Headers','X-Requested-With','content-type')
//     res.setHeader('Access-Control-Allow-Headers','Authorization')
//     res.setHeader('Access-Control-Allow-Credential',true)
//     next()
// })

work.post("/clinicSave",async(req,res,next)=>{
    let obj = {
        name: req.body.name ,
        tel: req.body.tel ,
        tax: req.body.tax ,
        address: req.body.address
    }

    let result = await clinicSchema.create(obj)
    res.status(200).json(result)
})

work.get("/getInfo",async(req,res)=>{
    const getInfo = await clinicSchema.findOne({})
    .then((err,rs)=>{
        if(err)res.send(err)
        else res.send(rs)
    })

    getInfo


    // console.log(result);
    // res.status(200).json(result)
    // res.send()
})

work.get("/find",async(req,res)=>{
    const findall = await clinicSchema.find({});
    res.status(200).json({
      resultCode: 20000,
      resultData: findall,
    });
    // console.log(result);
    // res.status(200).json(result)
    // res.send()
})

work.post("/clinicUpdate",async(req,res)=>{
    const findall = await clinicSchema.findOneAndUpdate({_id:req.body._id},req.body).then(
        (err,result)=>{
            err?res.status(400):res.status(200).json({
              resultCode: 20000,
              resultData: result,
            });
        }
    );
    // console.log(result);
    // res.status(200).json(result)
    // res.send()
})

work.post("/customerSave",async(req,res)=>{
    await customerSchema.insertMany(req.body).then((err,result)=>{
        err?res.send(err):res.send(result)
    })
})

work.get("/customerGet",async (req,res)=>{
    await customerSchema.find({}).then((err,result)=>{err?res.send(err):res.send(result)})
})

work.post("/customerDelete",async (req,res)=>{
    await customerSchema.findOneAndDelete({_id: req.body._id}).then((err,result)=>{err?res.send(err):res.send(result)})
})

work.post("/customerUpdate",async (req,res)=>{
        const re = await customerSchema.updateOne({_id: req.body._id},req.body).then((err,result)=>{err?res.send(err):res.send(result)})
        console.log(re)
})

work.post("/petSave",async (req,res)=>{
    await petSchema.insertMany(req.body).then((err,result)=>{
        err?res.send(err):res.send(result)
    })
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