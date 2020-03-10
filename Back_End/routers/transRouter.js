var express = require('express')
var router = express.Router()
var { allTrans } = require('../controllers');

router.get('/trxlist', allTrans.getTransaction);
router.delete('/deletetrx/:id', allTrans.deleteTransaction);

module.exports = router;