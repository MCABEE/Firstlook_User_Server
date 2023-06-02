import mongoose from 'mongoose'

const religionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    }

})

const Religion = mongoose.model('Religion', religionSchema)

export default Religion