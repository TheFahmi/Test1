const db = require('../database');

module.exports = {
    // dahboard
    totalUsers: (req, res) => {
        var sql = `select * from user`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    totalProduts: (req, res) => {
        var sql = `select * from products`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    totalOrder: (req, res) => {
        var sql = `select * from daftarorder`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    totalOrderNeedConfirmation: (req, res) => {
        var sql = `select * from daftarorder where status = 'pending'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    totalWishlist: (req, res) => {
        var sql = `select * from wishlist`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    }, 
    orderSuccess: (req, res) => {
        var sql = `select * from daftarorder where status = 'sent'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    }
}