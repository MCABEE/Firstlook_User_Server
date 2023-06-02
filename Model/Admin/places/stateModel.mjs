import mongoose from 'mongoose'

const stateSchema = new mongoose.Schema({

    country: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

})

const State = mongoose.model('State', stateSchema)

export default State