var express = require('express')
var router = express.Router()
var { allUser,loginController } = require('../controllers');


router.post('/user', loginController.user);
router.get('/keeplogin', loginController.keeplogin)

router.post('/register', loginController.register);
router.post('/verified', loginController.verified);

// user
router.get('/listusers', allUser.getUsers);
router.delete('/deleteuser/:by', allUser.deleteUser)
router.post('/adduser', allUser.addUser);
router.put('/edituser/:id', allUser.editUser);

module.exports = router;