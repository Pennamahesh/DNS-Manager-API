const mangose= require("mongoose");
require('dotenv').config();

const mangoConnect= async () => {
    try{
        const Connection= await mangose.connect(process.env.MongoDB);
        console.log("conneted",Connection.connection.host,Connection.connection.name);
    }catch(err){
        console.log("there is an Error",err);
        process.exit(1)
    }
}

module.exports=mangoConnect