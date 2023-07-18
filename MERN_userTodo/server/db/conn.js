const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose.connect(DB).then (()=>{
  // console.log(`Database Connection established successfully`)
}).catch((err)=>{
  console.log(`SERVER NOT CONNECTED ${err}`)
})