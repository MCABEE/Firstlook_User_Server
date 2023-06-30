import mongoose from 'mongoose'

const employerSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

})

const Employer = mongoose.model('Employer', employerSchema)

export default Employer