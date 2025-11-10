import mongoose from "mongoose";


const courseSchema = new mongoose.Schema(
    {
        title: String,
        courseImage: String,
        instructorName: String,
        category: String,
        description: String,
        duration: String,
        price: String,
    },
    {
        timestamps: true,
        versionKey: false,
    },
);


const Course = mongoose.model("Course", courseSchema);

export default Course;