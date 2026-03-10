import { v2 as cloudinary } from "cloudinary"

import fs from "fs"


const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        if(!filePath){
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filePath, {resource_type:'auto'}) // upload the photo or video to cloudinary (any type of file)
        fs.unlinkSync(filePath) // delete the photo or video from public folder which created in multer
        return uploadResult.secure_url // return the url of the photo or video
    } catch (error) {
        fs.unlinkSync(filePath)
        console.log(error)
    }
}
export default uploadOnCloudinary