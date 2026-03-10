import multer from "multer"

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {   // giving destinaton and call back
        cb(null, file.originalname) // call back and file name
    }
})

const upload = multer({ storage: storage })

export default upload 