const productController = require('./productController');
const loginController = require('./loginController');
const cartController = require('./cartController');
const alldashboard = require('./dashboardController');
const allUser = require('./userController');
const allTrans = require('./transController')

module.exports = {
    productController,
    loginController,
    cartController,
    alldashboard,
    allUser,
    allTrans
}