import mongoose from 'mongoose'

const countrySchema = new mongoose.Schema({

    name: { 
        type: String, 
        require: true, 
        unique: true 
    }

})

const Country = mongoose.model('Country', countrySchema)

export default Country