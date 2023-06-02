import mongoose from 'mongoose'

const casteSchema = new mongoose.Schema({

    religion: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

})

const Caste = mongoose.model('Caste', casteSchema)

export default Caste