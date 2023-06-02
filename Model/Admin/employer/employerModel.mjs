import mongoose from 'mongoose'

const employerSchema = new mongoose.Schema({

    country: { 
        type: String, 
        required: true 
    },
    stream: { 
        type: String, 
        unique:true, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    }

})

const Employer = mongoose.model('Employer', employerSchema)

export default Employer