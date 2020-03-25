var express = require('express')
var router = express.Router()
var { cartController } = require('../controllers');

router.get('/cart', cartController.cart);
router.get('/cartproduct', cartController.cartProduct)
router.post('/cartplus', cartController.cartplus);
router.put('/editcart/:id', cartController.editcart);
router.put('/protectcart/:id', cartController.protectCart)
router.delete('/deletecart/:id', cartController.deleteCart);
router.post('/listorder', cartController.daftarOrder);
router.post('/detailorder', cartController.detailOrder);
router.post('/addwishlist', cartController.wishlist);
router.get('/wishlist', cartController.getWishlist);
router.get('/allwishlist', cartController.allWishlist);
router.get('/getprotectwishlist', cartController.getProtectWishlist);
router.get('/protectwishlist/:id', cartController.protectWishlist);
router.delete('/deletewishlist/:id', cartController.deleteWishlist);
router.delete('/deleteallwishlist/:id', cartController.deleteAllWishlist)
router.get('/daftarorder', cartController.listOrder);
router.get('/joindaftarorder', cartController.joinDaftarOrder)
router.get('/orderdetail', cartController.detailOrders);
router.post('/confirmorder', cartController.confirmOrder);
router.get('/getconfirm', cartController.getConfirm);
// router.put('/confirm/:id', cartController.adminConfirmOrder);
router.put('/editadmin/:id', cartController.editAdmin)
router.delete('/deleteorderbyadmin/:invoice', cartController.deleteOrderConfirm);
router.put('/editstatus', cartController.editStatus)
router.put('/editstatusexpired', cartController.editStatusExpired)
router.put('/editStock',cartController.editStock)
router.put('/tambahStock',cartController.TambahStock)
router.get('/getdaftarorder',cartController.getDaftarorder)
router.get('/getpromo',cartController.getPromo)
router.post('/tambahrating', cartController.tambahRating);
router.put('/editalamat',cartController.editAlamat)
// router.get('/invoice',cartController.invoice)
router.get('/getalamat',cartController.getAlamat)
router.get('/getallpromo',cartController.getAllPromo)
router.post('/postpromo', cartController.postPromo);
router.put('/editpromo',cartController.editPromo)
router.get('/getallcategory',cartController.getAllCategory)
router.post('/postcategory', cartController.postCategory);
router.put('/editcategory',cartController.editCategory)
router.delete('/deletepromo/:id', cartController.deletePromo);
module.exports = router;