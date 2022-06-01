const express   = require('express');
const { route } = require('express/lib/application');
const router    = express.Router();
const multer    = require('multer');
const path      = require('path');
const fs        = require('fs');

// middleware
const auth      = require('../middleware/auth');

// Controller
const fileController  = require('../controllers/fileController');
const { append }      = require('express/lib/response');

// Configure Multer
const storage = multer.diskStorage({
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

// INIT
const upload = multer({ storage })

// Route
router.get ('/'          , auth                           , fileController.index );
router.post('/uploadfile', [auth, upload.single('files')] , fileController.upload);

// Export
module.exports = router;
