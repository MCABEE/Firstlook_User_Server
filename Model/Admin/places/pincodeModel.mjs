import mongoose, { Types } from 'mongoose'

const pincodeSchema = new mongoose.Schema({

    district: { 
        type: Types.ObjectId, 
        ref:'State', 
        required: true 
    },
    code: { 
        type: Number, 
        required: true 
    },
    postOffice: { 
        type: String, 
        required: true, 
        unique: true 
    }

})

const Pincode = mongoose.model('Pincode', pincodeSchema)

export default Pincode