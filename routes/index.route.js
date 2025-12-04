const express = require("express");
const authMiddleware = require("../middleware/auth");
const cloudinary = require("../config/cloudinary"); 
const router = express.Router();
const fileModel = require("../models/file.model");
const upload = require("../config/multer");

router.get('/home',authMiddleware,async (req, res) => {
  const userFiles = await fileModel.find({
    user:req.user.userId
  });
  console.log(userFiles);
  
  res.render('home',{files:userFiles});
});


router.post("/upload-file", authMiddleware, upload.single("file"), async (req, res) => {
  await fileModel.create({
    path: req.file.path, 
     resourceType: req.file.resource_type,         
    originalName: req.file.originalname,  
    user: req.user.userId 
  });

  
  res.redirect("/home");
});



router.get("/view", authMiddleware, async (req, res) => {
  const fileUrl = req.query.url;

  if (!fileUrl) {
    return res.status(400).send("File URL missing");
  }

  res.redirect(fileUrl); 
});

router.get("/download", authMiddleware, async (req, res) => {
  const fileUrl = req.query.url;
  if (!fileUrl) return res.status(400).send("File URL missing");

  let downloadUrl = fileUrl;

  
  if (fileUrl.includes('.pdf')) {
    downloadUrl = fileUrl.replace("/upload/", "/raw/upload/fl_attachment/");
  } else {
    downloadUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");
  }
  

  res.redirect(downloadUrl);
});


module.exports = router;