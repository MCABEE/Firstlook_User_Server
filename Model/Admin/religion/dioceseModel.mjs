import { Schema } from "mongoose";

const dioceseSchema = new Schema({
    caste: { type: String, required: true, },
    name: { type: String, required: true, }
})

const Diocese = mongoose.model('Diocese', dioceseSchema)

export default Diocese