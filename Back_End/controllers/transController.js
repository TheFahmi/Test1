const db = require('../database');
const Crypto = require('crypto');
const encrypt = 'takamoruchi'

module.exports = {
    getTransaction: (req, res) => {
        var sql = `select * from daftarorder`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    deleteTransaction: (req, res) => {
        var idtrx = req.params.id
        var sql = `select * from daftarorder where id = ${idtrx}`
        db.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                var sql = `delete from daftarorder where id = ${idtrx}`
                db.query(sql, (err1, results) => {
                    if (err) throw err;
                    var sql = `delete from detailorder where idtrx = ${idtrx}`
                    db.query(sql, (err2, resulth) => {
                        if (err) throw err;
                        console.log(`transaksi dengan id ${idtrx} berhasil dihapus dari tabel detailorder`)
                    })
                    res.send(results);
                })
            }
        })
    }
}