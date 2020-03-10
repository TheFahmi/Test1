var express = require('express')
var router = express.Router()
var { allUser } = require('../controllers');

// user
router.get('/listusers', allUser.getUsers);
router.delete('/deleteuser/:by', allUser.deleteUser)
router.post('/adduser', allUser.addUser);
router.put('/edituser/:id', allUser.editUser);

module.exports = router;