const express=require('express');
//schema
const Apply= require('../models/ApplySchema');
//const Jobs=require('../models/JobsavailSchema');
const User = require('../models/UsersignupSchema');
//router
const router=express.Router();

//define apply router
router.post('/apply', async(req,res)=> {
  try{
    const { name, dob, gender, mobile, email, address, qualification, experience,institute, postAvailable, resume} =req.body;

    //check
    let existingPost= await User.findOne({name});
    if(existingPost){
      return res.status(400).json({message: 'already applied for this job'});
    }

    // create
    const newApplie= new Apply({
      name,
      dob,
      gender,
      mobile,
      email,
      address,
      qualification,
      experience,
      institute,
      postAvailable,
      resume,
     // lastDate
    });
    await newApplie.save();
    res.send({message: 'user applied for job successively'});
  }catch(error){
    console.log('error during applying', error);
    res.status(500).json({success: false, message: 'error during applying'});
  }
});
module.exports=router;