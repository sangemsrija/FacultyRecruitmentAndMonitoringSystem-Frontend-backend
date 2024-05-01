const mongoose = require('mongoose');

const applySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    dob:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    experience:{
        type:String,
        required:true,
    },
    institute:{
        type:String,
        required:true,
    },
    postAvailable:{
        type:String,
        required:true,
    },
   resume:{
      type:String,
       required: true,
   }
});
const Apply=mongoose.model('Apply',applySchema);
module.exports=Apply;