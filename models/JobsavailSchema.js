const mongoose = require('mongoose');

const jobsavailSchema = new mongoose.Schema({
    institute: {
        type: String,
        required: true,
    },
    postAvailable: {
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
    postedDate:{
        type: Date,
        required: true,
    },
    endDate: {
        type: Date, // Assuming you want endDate to be a Date type
        required: true,
    }
}, {
    collection: "posts", // This line should be inside the options object
});

const Jobs = mongoose.model('posts', jobsavailSchema);
module.exports = Jobs;
