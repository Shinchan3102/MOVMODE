const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect(`${process.env.MONGODB_URL}`).then(()=> console.log('Mongo connection successfull...')).catch((err)=> console.log("mongoose connection error "+err));