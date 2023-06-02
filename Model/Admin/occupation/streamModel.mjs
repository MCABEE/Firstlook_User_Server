import mongoose from 'mongoose'

const OccupationStreamSchema = new mongoose.Schema({

    name: { 
        type: String, 
        required: true, 
        unique: true 
    }

})

const OccupationStream = mongoose.model('OccupationStream', OccupationStreamSchema)

export default OccupationStream