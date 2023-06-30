import mongoose from 'mongoose'

const OccupationStreamSchema = new mongoose.Schema({

    category: {
        type: String,
        require: true
    },
    name: {
        type: String,
        required: true
    }

})

const OccupationStream = mongoose.model('OccupationStream', OccupationStreamSchema)

export default OccupationStream