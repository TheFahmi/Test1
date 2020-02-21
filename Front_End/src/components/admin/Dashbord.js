import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import HomeDashbord from './HomeDashbord';

class Dashbord extends Component {

    render() {
    
        // if((this.props.myRole === "SUPERADMIN" || this.props.myRole === 'ADMIN PAYMENT' || this.props.myRole === 'EDITOR') && this.props.username !== "") {
        if(this.props.myRole === 'SUPERADMIN' &&  this.props.username !== ""){
          return (
                <div className="" style={{ padding: "20px", fontSize: "13px"}}>
                    <div className="row">
                        <div className="col-lg-2" style={{ marginBottom: "20px" }}>
                            <div className="list-group">
                                <a href="/admin/dashbord" className="list-group-item active">Dashbord</a>
                                <a href="/admin/confirmtransaction" className="list-group-item">Transaction Confirmation</a>
                                <a href="/admin/productslist" className="list-group-item">Manage Products</a>
                                <a href="/admin/manageusers" className="list-group-item">Manage Users</a>
                                <a href="/admin/managetrx" className="list-group-item">Manage Transsction</a>
                                <a href="/admin/confirmtransaction" className="list-group-item">See Wishlist</a>
                            </div>
                        </div>
                        <div className="col-lg-10 card bg-light border" style={{height: '600px'}}>
                            <h1 className="text-center pt-5 text-uppercase pb-5">Dashbord</h1>
                        <div>
                        <HomeDashbord/>
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
  return { username: state.auth.username, myRole: state.auth.role }
}

export default connect(mapStateToProps)(Dashbord);