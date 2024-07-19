const mongoose = require ('mongoose')

async function connectDB(){
    try {
        // Database URL
        return await mongoose.connect('mongodb+srv://psarojkumar9:diagnosis123456789saroj@diagnosiscluster.qnlfbbp.mongodb.net/')
    } catch(error){
        console.log(error);
    }
}

module.exports = connectDB