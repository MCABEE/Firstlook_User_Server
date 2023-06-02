import mongoose, { Types } from 'mongoose'

const languageSchema = new mongoose.Schema({

    state: { 
        type: Types.ObjectId, 
        ref: 'State', 
        required: true 
    },
    languages: { 
        type: [String], 
        required: true 
    },

})

const Language = mongoose.model('Language', languageSchema)

export default Language