import mongoose from 'mongoose'

const designationSchema = new mongoose.Schema({

    stream: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true, 
        unique: true 
    }

})

const Designation = mongoose.model('Designation', designationSchema)

export default Designation