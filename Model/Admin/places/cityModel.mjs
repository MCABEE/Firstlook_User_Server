import mongoose, { Types } from 'mongoose'

const citySchema = new mongoose.Schema({

    state: { 
        type: Types.ObjectId, 
        ref:'State', 
        required: true
    },
    name: { 
        type: String, 
        required: true
    }

})

const City = mongoose.model('City', citySchema)

export default City