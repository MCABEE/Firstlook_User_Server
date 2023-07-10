import mongoose, { Types } from 'mongoose'

const pincodeSchema = new mongoose.Schema({

    district: {
        type: Types.ObjectId,
        ref: 'District',
        required: true
    },
    code: {
        type: Number,
        required: true
    }

})

const Pincode = mongoose.model('Pincode', pincodeSchema)

export default Pincode