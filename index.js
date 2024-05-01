// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5002;
const app = express();

app.use(cors());
app.use(bodyParser.json());

//const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sangemsrija29:P6xNl0qP2gB3oSsQ@cluster0.5qg9nf2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    serverSelectionTimeoutMS: 30000,
});

const db = mongoose.connection;

// Event listener for successful connection
db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

// Event listener for connection error
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Event listener for disconnection
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});



// Define User Schema
const User = require('./models/UsersignupSchema');
const Recruiter=require('./models/RecruitersignupSchema');


const Apply=require('./models/ApplySchema');
const  Post=require('./models/PostSchema');
const Jobs =require('./models/JobsavailSchema');
const Application =require('./models/ApplicationSchema');

// Import authenticateToken middleware
const authenticateToken =require('./middleware/authMiddleware');

//import routes
const UsersignupRouter=require('./routes/Usersignup');
app.use('/api',UsersignupRouter);
const RecruitersignupSchema=require('./routes/Recruitersignup');
app.use('/api', RecruitersignupSchema);
const UserloginRouter=require('./routes/Userlogin');
app.use('/api', UserloginRouter);
const RecruiterLoginRouter=require('./routes/Recruiterlogin');
app.use('/api', RecruiterLoginRouter);


const ApplyRouter=require('./routes/apply');
app.use('/api',ApplyRouter);

const PostjobRouter=require('./routes/postjob');
app.use('/api',PostjobRouter);

const JobsavailRouter= require('./routes/jobsavail');
app.use('/api',JobsavailRouter);

const ApplicationRouter=require('./routes/application');
app.use('/api',ApplicationRouter);

const hiredApplicants=require('./routes/hiredapplicants');
app.use('/api',hiredApplicants);

const newfaculty=require('./routes/newfaculty');
app.use('/api',newfaculty);

const workingfaculty=require('./routes/workingfaculty');
app.use('/api',workingfaculty);

const retiredFaculty=require('./routes/retired');
app.use('/api', retiredFaculty);

const notification=require('./routes/notify');
app.use('/api', notification);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 
