var express = require('express')
var router = express.Router()
var { alldashboard } = require('../controllers');


// dashsboard
router.get('/getusers', alldashboard.totalUsers);
router.get('/getproducts', alldashboard.totalProduts);
router.get('/getorder', alldashboard.totalOrder);
router.get('/getconfirm', alldashboard.totalOrderNeedConfirmation);
router.get('/getwishlist', alldashboard.totalWishlist);
router.get('/ordersuccess', alldashboard.orderSuccess);
module.exports = router;