import uploadOnCloudinary from "../config/cloudinary.js"
import Course from "../model/courseModel.js"


export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body
        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" })
        }
        const course = await Course.create({
            title,
            category,
            creator: req.userId
        })
        return res.status(201).json({ course });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
        if (!courses) {
            return res.status(404).json({ message: "No courses found" })
        }
        return res.status(200).json({ courses })
    } catch (error) {
        return res.status(500).json({ message: `failed to get isPublished courses ${error}` })
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId // verify toker's user is inside isAuth middleware from there we are getting userId
        const courses = await Course.find({ creator: userId })
        if (!courses) {
            return res.status(404).json({ message: "No courses found" })
        }
        return res.status(200).json({ courses })
    } catch (error) {
        return res.status(500).json({ message: `failed to get creator courses ${error}` })
    }
}

export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params // when we create our course from there we are getting our course id
        const { title, subTitle, description, category, level, isPublished, price } = req.body
        let thumbnail
        if (req.file) {
            thumbnail = await uploadOnCloudinary(req.file.path)
        }

        if (!title || !category) {
            return res.status(400).json({ message: "Title and category are required" })
        }
        let course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        const updateData = {
            title,
            subTitle,
            description,
            category,
            level,
            isPublished,
            price,
            thumbnail
        }
        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })
        return res.status(200).json({ course });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
// for getting course ID without using any other controller
export const getCourseById = async (req, res) => { // it's a controller for getting courseId
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json({ course })
    } catch (error) {
        return res.status(500).json({ message: `failed to get course by id ${error}` })
    }
}

export const removeCourse = async (req, res) => {
    try {
        const { courseId } = req.params
        const course = await Course.findByIdAndDelete(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        return res.status(200).json({ message: "Course deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: `failed to delete course ${error}` })
    }
}
