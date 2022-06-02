const multer    = require('multer');
const fs        = require('fs');
const path      = require('path');

exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const path = `uploads/${req.user.user_id}`
      fs.mkdirSync(path, { recursive: true })
      cb(null, path)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})