import mongoose, { Types } from 'mongoose'

const homeTownSchema = new mongoose.Schema({

    district: { 
        type: Types.ObjectId, 
        ref: 'District', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    }

})

const HomeTown = mongoose.model('HomeTown', homeTownSchema)

export default HomeTown