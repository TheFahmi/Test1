import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ListCategory from './ListCategory';

class ManageCategory extends Component {

  render() {

   if (this.props.myRole === 'SUPERADMIN') {
      return (
        <div style={{ padding: "20px", fontSize: "13px", height: '800px' }}>
          <div className="row">
            <div className="col-lg-2" style={{ marginBottom: "20px", marginTop: "50px" }}>
              <div className="list-group">
                <a href="/admin/Dashboard" className="list-group-item">Dashboard</a>
                <a href="/admin/confirmtransaction" className="list-group-item">Transactions Confirmation</a>
                <a href="/admin/manageproducts" className="list-group-item">Manage Products</a>
                <a href="/admin/manageusers" className="list-group-item">Manage Users</a>
                <a href="/admin/managepromo" className="list-group-item">Manage Promo</a>
                <a href="/admin/managecategory" className="list-group-item active">Manage Category</a>
                <a href="/admin/managetrx" className="list-group-item">Manage Transactions</a>
                <a href="/admin/managepromo" className="list-group-item">Manage Promo</a>
                <a href="/admin/managewishlist" className="list-group-item">See Wishlist</a>
                <a href="/admin/pagereport" className="list-group-item">See Report</a>
              </div>
            </div>
            <div className="col-lg-10 card bg-light border">
              <h1 className="text-center pt-5 text-uppercase pb-5">List Products</h1>
              <div>
                <ListCategory />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return <Redirect to='/login' />
    }

  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    myRole: state.auth.role
  }
}

export default connect(mapStateToProps)(ManageCategory);