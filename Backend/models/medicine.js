const { Schema, default:mongoose} = require('mongoose')

const MedicineSchema = new Schema({
    name: String,
  
    registrationId: String,
    medicines: [{type: Schema.Types.ObjectId, ref: 'Medicines'}]
})

const Medicine = mongoose.model('Medicine', MedicineSchema)
module.exports = {Medicine, MedicineSchema}