import mongoose from 'mongoose'

const streamSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true, 
        unique: true 
    }

})

const Stream = mongoose.model('Stream', streamSchema)

export default Stream