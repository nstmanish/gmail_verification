// Require
const express = require('express');
const router = express.Router();

// Controller
const userController = require('../controllers/userController');

// Route
router.post('/register'                         , userController.register );
router.post('/login'                            , userController.login    );
router.get ('/verification/:type/:employeeId'   , userController.verify   );

module.exports = router;
