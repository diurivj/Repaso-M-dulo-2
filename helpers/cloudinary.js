const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "diurivj",
  api_key: "722289662448675",
  api_secret: "IctCtzBR9sjoz2YjVnNpPGXGqFo"
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'Repaso', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage })

module.exports = uploadCloud;