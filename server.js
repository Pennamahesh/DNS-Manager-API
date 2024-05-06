const express=require("express");
const DNS=require("./Routes/DNSRout")
const ErrorHandler=require("./ErrorHandler/ErrorHandler")
const mangoConnect =require('./DbConnection/DbConnect')
mangoConnect()
const app=express()
require('dotenv').config();
const port= process.env.PORT || 5000

// add cors
const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use('/api/DNS',DNS)
app.use(ErrorHandler)

app.listen(port,()=>{   
    console.log(`the server is running in the port ${port}`);
})