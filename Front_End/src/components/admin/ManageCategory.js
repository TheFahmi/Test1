// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import CategoryList from './CategoryList';

// class ManageCategory extends Component {

//     render() {
    
//         if(this.props.myRole === "ADMIN" && this.props.username !== "") {
//           return (
//                 <div className="card bg-white" style={{ padding: "20px", fontSize: "13px" }}>
//                     <div className="row">
//                         <div className="col-lg-2" style={{ marginBottom: "20px" }}>
//                             <div className="list-group">
//                               <a href="/admin/confirmtransaction" className="list-group-item">Konfirmasi Transaksi</a>
//                               <a href="/admin/manageproducts" className="list-group-item">Manage Produk</a>
//                               <a href="/admin/productslist" className="list-group-item">List Produk</a>
//                               <a href="/admin/manageusers" className="list-group-item">Manage User</a>
//                               <a href="/admin/managetrx" className="list-group-item">Manage Transaksi</a>
//                               <a href="/admin/managecategory" className="list-group-item active">Manage Kategori</a>
//                               <a href="/admin/managewishlist" className="list-group-item">See Wishlist</a>
//                             </div>
//                         </div>
//                         <div className="col-lg-10 card bg-light border" style={{ padding: "20px" }}>
//                         <h2 className="text-center text-uppercase pb-5">Manage Kategori</h2>
//                         <CategoryList />
//                         </div>
//                     </div>
//                 </div>
//           )
//         } else {
//           return <Redirect to='/login' />
//         }

//     }
// }

// const mapStateToProps = (state) => {
//   return { username: state.auth.username, myRole: state.auth.role }
// }

// export default connect(mapStateToProps)(ManageCategory);