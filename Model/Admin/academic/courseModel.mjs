import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

    stream: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
