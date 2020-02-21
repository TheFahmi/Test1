// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import ProductsListView from '../ProductsListView';

// class ManageProducts extends Component {

//     render() {
    
//         if(this.props.myRole === "ADMIN" && this.props.username !== "") {
//           return (
//               <div style={{ fontSize: "13px" }}>
//                 <div className="card bg-white" style={{ padding: "20px" }}>
//                     <div className="row">
//                         <div className="col-lg-2" style={{ marginBottom: "20px" }}>
//                             <div className="list-group">
//                                 <a href="/admin/confirmtransaction" className="list-group-item">Konfirmasi Transaksi</a>
//                                 <a href="/admin/manageproducts" className="list-group-item active">Manage Produk</a>
//                                 <a href="/admin/productslist" className="list-group-item">List Produk</a>
//                                 <a href="/admin/manageusers" className="list-group-item">Manage User</a>
//                                 <a href="/admin/managetrx" className="list-group-item">Manage Transaksi</a>
//                               <a href="/admin/managecategory" className="list-group-item">Manage Kategori</a>
//                               <a href="/admin/managewishlist" className="list-group-item">See Wishlist</a>
//                             </div>
//                         </div>
//                         <div className="col-lg-10 card bg-light border" style={{ padding: "20px" }}>
//                         <h1 className="text-center pb-5 text-uppercase">Manage Produk
//                         </h1>
//                         <ProductsListView />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//           )
//         } else {
//           return <Redirect to='/login' />
//         }

//     }
// }

// const mapStateToProps = (state) => {
//   return { username: state.auth.username, myRole: state.auth.role }
// }

// export default connect(mapStateToProps)(ManageProducts);