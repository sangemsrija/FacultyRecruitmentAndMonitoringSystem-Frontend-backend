const express=require('express');
const User=require('../models/UsersignupSchema');
const bcrypt=require('bcrypt');
const router=express.Router();

//define router
router.post('/usersignup', async(req,res)=>{
  try{
    const {username, email, password} = req.body;

    let existingUser = await User.findOne(  { email });
    if (existingUser) {
      return res.status(422).json({ message: 'User already exists' });
    }
   const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({username, email, password: hashedPassword});
    
    // Save the new user to the database
    await newUser.save();
    res.send({message: 'user registered successfully'});


  }
  catch (error) {
    console.error('error registering user', error);
    res.status(500).json({ success: false, message: 'error registering user' });
  }
});
module.exports=router;