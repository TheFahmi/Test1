const db = require('../database')
var fs = require('fs');
var { uploader } = require('../helpers/uploader');

module.exports = {


    getCategory: (req, res) => {
        var sql = `SELECT * FROM category`;
        
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    getNamaCat: (req, res) => {
        var sql = `SELECT nama FROM category`;
        
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    
    productdetail: (req, res) => {
        var product = req.query.id
        console.log(product)
        var sql = `select * from products where id = ${product}`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },
    // to get select options
    getProduct: (req, res) => {
        var sql = `select * from products`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    getProductHome: (req, res) => {
        var sql = `select * from products ORDER BY ID DESC LIMIT 6`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    getDataPenjualan: (req, res) => {
        var sql = `(select sum(dor.subtotal) as total, date as waktu from detailorder dtl
        join daftarorder dor
        on dtl.idtrx = dor.id
        join products p
        on dtl.idproduct = p.id
        join category c
        on p.idcategory = c.id
        
         where status='sent'
         group by waktu
         limit 7)
         order by waktu ASC`;
         db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    getJoinCategory: (req, res) => {
        var category = req.query.category
        var search = req.query.search

        if(!search){
            search = ''
        }
        var sql = `select p.id as id,p.nama as nama,harga,image,deskripsi,stok, c.nama as namacategory from products p 
        join category c 
        on p.idcategory = c.id
        where p.nama LIKE '%${search}%'`

        if(category != '' ){
            var sql = `select p.id as id,p.nama as nama,harga,image,deskripsi,stok, c.nama as namacategory from products p 
            join category c 
            on p.idcategory = c.id
            where p.nama LIKE '%${search}%' and c.nama = '${category}'`
        }

        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })

    },

    getDataCart: (req,res) => {
        var sql = `select sum(dor.totalquantity) as total, c.nama as nama from detailorder dtl
        join daftarorder dor
        on dtl.idtrx = dor.id
        join products p
        on dtl.idproduct = p.id
        join category c
        on p.idcategory = c.id
        
         where status='sent'
         group by nama
         
         `;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },


    ManageProducts: (req, res) => {
        var sql = `select p.id as id, p.nama as nama, deskripsi, image, stok, harga, rating, c.nama as namacategory, c.id as idcat from products p 
        join category c 
        on p.idcategory = c.id`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    },

    // deleteProduct: (req, res) => {
    //     var deletedpro = req.params.id;
    //     // var { nama, id } = req.body;
    //     var sql = `select * from products where id = ${deletedpro}`;
    //     db.query(sql, (err, results) => {
    //         if (err) throw err;
    //         if(results.length > 0) {
    //             sql = `delete from products where id = ${deletedpro}`;
    //             db.query(sql, (err1, results1) => {
    //                 if(err1) throw err1
    //                 sql = `select * from cart where product_id = ${deletedpro}`;
    //                 db.query(sql, (err,results2) => {
    //                     if (err) throw err;
    //                     if(results2 > 0) {
    //                         sql = `delete from cart where product_id = ${deletedpro}`;
    //                         db.query(sql, (err, results1) => {
    //                             if (err) throw err;
    //                         });
    //                         // res.send(results)
    //                     } 
    //                     res.send(results) 
    //                 });
    //             });
    //         }
    //     }); 
    
    // },

    deleteProduct: (req, res) => {
        var deletedpro = req.params.id;
        var sql = `select * from products where id = ${deletedpro}`;
        db.query(sql, (err, results) => {
            if (err) throw err;
            if(results.length > 0) {
                sql = `delete from products where id = ${deletedpro}`;
                db.query(sql, (err1, results1) => {
                    if(err1) throw err1
                    sql = `select * from cart where product_id = ${deletedpro}`;
                    db.query(sql, (err,results) => {
                        if (err) throw err;
                        if(results > 0) {
                            sql = `delete from cart where product_id = ${deletedpro}`;
                            db.query(sql, (err, results) => {
                                if (err) throw err;
                            });
                        }                       
                        sql = `select * from wishlist where product_id = ${deletedpro}`;
                        db.query(sql, (err3,results3) => {
                            if (err3) throw err;
                            if (results3.length > 0) {
                                sql = `delete from wishlist where product_id = ${deletedpro}`;
                                db.query(sql, (err4, result4) => {
                                    if (err4) throw err4;
                                    console.log('sukses')
                                })
                            }
        
                            res.send(results3);
                        });
                    });
                });
            }
        }); 
    
    },
    
    editProduct: (req,res) => {
        var brandId = req.params.id;
        var sql = `select * from products where id = ${brandId};`;
        db.query(sql, (err, results) => {
            if(err) throw err;
    
            if(results.length > 0) {
                const path = '/products/gambar'; //file save path
                const upload = uploader(path, 'PRO').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
                upload(req, res, (err) => {
                    if(err){
                        return res.status(500).json({ message: 'Upload brand picture failed !', error: err.message });
                    }
    
                    const { image } = req.files;
                    // console.log(image)
                    const imagePath = image ? path + '/' + image[0].filename : null;
                    const data = JSON.parse(req.body.data);
                    console.log(data)
                    data.image = imagePath;
    
                    try {
                        if(imagePath) {
                            data.image = imagePath
                            
                            sql = `update products set ? where id = ${brandId};`
                            db.query(sql, data, (err1,results1) => {
                                if(err1) {
                                    if(imagePath){
                                        fs.unlinkSync('./public' + imagePath);

                                    }
                                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                }
                                if(imagePath){
                                    if(results[0].image){
                                        fs.unlinkSync('./public' + results[0].image);
                                    }
                                }
                                                               
                                sql = `select * from products;`;
                                db.query(sql, (err2,results2) => {
                                    if(err2) {
                                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                    }
    
                                    res.send(results2);
                                })
                            })
                        }
                        else {
                            sql = `update products set ? where id = ${brandId};`
                            db.query(sql, data, (err1,results1) => {
                                if(err1) {
                                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                }
                                sql = `select * from products;`;
                                db.query(sql, (err2,results2) => {
                                    if(err2) {
                                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                                    }
    
                                    res.send(results2);
                                })
                            })
                        }
                    }
                    catch(err){
                        console.log(err.message)
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                })
            }
        })
    },

    addProduct: (req,res) => {
        try {
            const path = '/products/gambar'; //file save path
            const upload = uploader(path, 'PRO').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
    
                const { image } = req.files;
                const imagePath = image ? path + '/' + image[0].filename : null;
                const data = JSON.parse(req.body.data);
                console.log(req.body.data)
                data.image = imagePath;
                
                var sql = 'INSERT INTO products SET ?';
                db.query(sql, data, (err, results) => {
                    if(err) {
                        console.log(err.message)
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                   
                    // console.log(results);
                    sql = 'SELECT * from products;';
                    db.query(sql, (err, results) => {
                        if(err) {
                            console.log(err.message);
                            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                        }
                        // console.log(results);
                        
                        res.send(results);
                    })   
                })    
            })
        } catch(err) {
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    },
}