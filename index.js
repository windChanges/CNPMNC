const express = require("express")
const app = express()
const cloudinary = require("./configs/cloudinary")
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Bank',
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
})
const upload = multer({
    storage: storage
})




app.use(express.json())

app.post('/upload', upload.fields([{ name: "img", maxCount: 1 }]), (req, res) => {
    const link_img = req.files['img'][0];
    res.send(link_img)
})

app.listen(5000, () => {
    console.log("server run at port 5000");
})