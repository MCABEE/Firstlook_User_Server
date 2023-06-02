import mongoose, { Types } from 'mongoose'

const districtSchema = new mongoose.Schema({

    state: { 
        type: Types.ObjectId, 
        ref: 'State', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    }

})

const District = mongoose.model('District', districtSchema)

export default District