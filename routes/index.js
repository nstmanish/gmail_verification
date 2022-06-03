const express   = require('express');
const { route } = require('express/lib/application');
const router    = express.Router();
const multer    = require('multer');

// middleware
const auth      = require('../middleware/auth');

// Controller
const fileController  = require('../controllers/fileController');
const { append }      = require('express/lib/response');

// helper
const storage         = require('../helper/file').storage;      

// INIT
const upload = multer({ storage })

// Route
router.get ('/'          , auth                           , fileController.index );
router.post('/uploadfile', [auth, upload.single('files')] , fileController.upload);

router.get('/tutorial', fileController.createTutorial);
router.get('/addComments/:tutorialId', fileController.addComments);
router.get('/displaydata', fileController.displaydata);

// Export
module.exports = router;
