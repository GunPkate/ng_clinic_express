const mongoose = require('mongoose');
const conString = 'mongodb://127.0.0.1:27017/';
const dbName = 'ExpressClinic';

async function connectDB(){
    mongoose.set('strictQuery',true)
    return connection = await mongoose.connect(`${conString}`+dbName).then(console.log(`Connect to MDB ${dbName}`));
}

module.exports = connectDB();