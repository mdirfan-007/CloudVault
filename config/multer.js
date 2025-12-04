const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    
    folder: "g-drive-uploads",     
     resource_type:  "raw",          
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
    // public_id: (req, file) => file.originalname.split(".")[0], 
  },
});

const upload = multer({ storage });

module.exports = upload;
