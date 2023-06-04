import mongoose from 'mongoose'

const institutionSchema = new mongoose.Schema({

    country: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    }

})

const Institution = mongoose.model('Institution', institutionSchema)

export default Institution