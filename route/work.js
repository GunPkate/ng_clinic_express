const express = require('express')
const work = express.Router()
const mongoose = require('mongoose')
const symptomSchema = mongoose.model("symptom",require('../Schema/symptom.js'))
const clinicSchema = mongoose.model("clinic",require("../Schema/clinic.js"))
const customerSchema = mongoose.model('customer',require("../Schema/customer"))
const petSchema = mongoose.model('pet',require("../Schema/pet"))
const medicalSupplySchema = mongoose.model('medicalSupply',require("../Schema/medicalSupply"))
const prescriptionSchema = mongoose.model('prescription',require("../Schema/prescription"))
const ObjectId = require('mongodb').ObjectId;
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
    const findall = await clinicSchema.updateOne({_id:req.body._id},req.body).then(
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

work.post("/petSaveUpdate",async (req,res)=>{
    if(req.body._id == null){
        req.body.customer_id = new ObjectId(req.body.customer_id) //convert string obj
        await petSchema.insertMany(req.body).then((err,result)=>{
            err?res.send(err):res.send(result)
        })
    }
    else{
        petSchema.updateOne({_id:req.body._id},req.body,(err,result)=>{err?res.send(err):res.send(result)})
    }


})

// work.get("/petAll",async (req,res)=>{petSchema.find().then((err,rs)=>{err?res.send(err):res.send(rs)})})
work.get("/petAll",async (req,res)=>{petSchema.aggregate([
    {
        "$lookup":{
            "from": 'customer', //collection
            "localField": 'customer_id',
            'foreignField': '_id',
            'as' : 'customer' //alias
        }
    }
]).then((err,rs)=>{err?res.send(err):res.send(rs)})})

work.post("/petDelete",async (req,res)=>{
    try {
        await petSchema.findOneAndDelete({_id: req.body._id}).then((err,result)=>{err?res.send(err):res.send(result)})
    } catch (error) {
        res.send(error)
    }
})

work.post("/petOfCustomer",async(req,res)=>{
    await petSchema.find({customer_id:req.body._id}).then((err,result)=>{err?res.send(err):res.send(result)}) //pet.customer_id = customer._id 
})

work.post("/symptom",async(req,res)=>{
    let data = {
        symptom: req.body.symptom,
        pet_id: req.body.pet._id = new ObjectId(req.body.pet._id) //convert string obj
    }
    console.log("in",data )
    if(req.body.symptom._id == undefined){
        // console.log("in",req.body.symptom._id )

        // console.log(data);
        await symptomSchema.insertMany(data).then((err,result)=>{err?res.send(err):res.send(result)})
    }else{
        console.log("update",req.body.symptom._id )
        await symptomSchema.updateOne({_id:req.body.symptom._id },data).then((err,result)=>{err?res.send(err):res.send(result)})
    }
})

work.post("/petCheckUp",async(req,res)=>{
    console.log(req.body.pet_id);
    await symptomSchema.find({pet_id:req.body.pet_id}).then((err,result)=>{err?res.send(err):res.send(result)}) //symptom.pet_id = pet._id 
})

work.post("/deleteSymptom",async(req,res)=>{ await symptomSchema.findOneAndDelete({_id: req.body._id}).then((err,result)=>{err?res.send(err):res.send(result)}) })

work.get("/ss",(req,res,next)=>{
    let obj = {
        name: "name",
        tel: "0822",
        tax: "8510",
        address: "BKK"
    }

    res.status(200).json(obj)
})

work.post("/saveSupply",async(req,res)=>{ 
    try {
        await medicalSupplySchema.insertMany(req.body).then((err,result)=>{ err?res.send(err):res.send(result)})
    } catch (error) {
        res.statusCode(400)
    }
})

work.post("/updateSupply",async(req,res)=>{
    console.log(req.body);
    console.log(req.body._id);
    await medicalSupplySchema.updateOne({_id:req.body._id},req.body).then(
        (err,result)=>{
            err?res.status(400):res.status(200).json({
              resultCode: 20000,
              resultData: result,
            });
        }
    );
})

work.get("/getSupply",async(req,res)=>{ await medicalSupplySchema.find({}).then((err,result)=>{ err?res.send(err):res.send(result)})})

work.post("/deleteSupply",async(req,res)=>{console.log(req.body); await medicalSupplySchema.findOneAndDelete({_id: req.body._id}).then((err,result)=>{err?res.send(err):res.send(result)}) })


work.post("/savePrescription",async(req,res)=>{
    console.log(req.body);
    await prescriptionSchema.insertMany(req.body).then((err,result)=>{err?res.send(err):res.send(result)})
})

work.post("/updatePrescription",async (req,res)=>{
        const re = await prescriptionSchema.updateOne({_id: req.body._id},req.body).then((err,result)=>{err?res.send(err):res.send(result)})
        console.log(re)
})

work.post("/getHistory", async (req,res)=>{
    console.log("Body",req.body);
    await prescriptionSchema.find({symptom_id:req.body._id}).then((err,result)=>{err?res.send(err):res.send(result)})
})

module.exports = work;