const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    institute:{
        type: String,
        required: true,
    },
    postAvailable:{
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    postedDate: {
        type: Date,
        default: Date.now
      }
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;