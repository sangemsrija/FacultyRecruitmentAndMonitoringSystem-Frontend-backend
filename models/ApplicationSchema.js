const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: {
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
    email: {
        type: String,
        required: true,
    },
    postAvailable: {
        type: String,
        required: true,
    },
    institute:{
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['applied', 'hired', 'retired'],
        default: 'applied'
    },
    hiringDate: {
        type: Date,
        required: false,
    },
    retirementDate:{
        type: Date,
        required: false,
    },

},
{
    collection: "applies",
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
