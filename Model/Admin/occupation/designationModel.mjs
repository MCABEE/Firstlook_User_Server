import mongoose from 'mongoose'

const designationSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
})

const Designation = mongoose.model('Designation', designationSchema)

export default Designation