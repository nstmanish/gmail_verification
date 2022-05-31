const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register'              , userController.register );
router.post('/login'                 , userController.login    );
router.get ('/verification/:type/:employeeId', userController.verify   );

module.exports = router;
