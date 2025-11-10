import Course from "../models/course.model.js";


const createCourse = async (req, res) => {
    try {
        const { title, courseImage, instructorName, category, description, duration, price } = req.body;
        const data = await Course.create({
            title,
            courseImage,
            instructorName,
            category,
            description,
            duration,
            price,
        });
        res.status(201).json({
            success: true,
            message: "Course Created Successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Somthing went Wrong.",
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const facetStage = {
            $facet: {
                totalCount: [{ $count: "count" }],
                course: [
                    { $sort: { createAt: -1 } },
                    {
                        $project: {
                            title: 1,
                            courseImage: 1,
                            instructorName: 1,
                            category: 1,
                            description: 1,
                            duration: 1,
                            price: 1,
                        },
                    },
                ],
            },
        };

        const course = await Course.aggregate([facetStage]);
        res.status(201).json({
            success: true,
            message: "Courses fatched Successfully",
            totalCourse: course[0].totalCount[0].count,
            data: course[0].course,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Somthing went Wrong.",
        });
    }
};

const getSingleCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Course.findById(id);
        res.status(201).json({
            success: true,
            message: "Course fatched Successfully",
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Somthing went Wrong.",
        });
    }
};


const updateSingleCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = await Course.findByIdAndUpdate(id, req.body, { new: true, });
        res.status(201).json({
            success: true,
            message: "Courses Update Successfully",
            data: updateData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Somthing went Wrong.",
        });
    }
};


const deleteSingleCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteData = await Course.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "Course Delete Successfully",
            data: deleteData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Somthing went Wrong.",
        });
    }
};

const courseControllers = { createCourse, getAllCourses, getSingleCourse, updateSingleCourse, deleteSingleCourse };
export default courseControllers;