import React, { Component } from 'react';
import ProductsGridView from './ProductsGridView';
import { connect } from 'react-redux';
import Carousels from './Carousel';
import HomeCard from './HomeCard';
import Dashboard from './admin/Dashboard';
import ConfirmTrx from './admin/ConfirmTrx';
import ManageProducts from './admin/ManageProducts';

class HomePage extends Component {
  
  render() {
    if (this.props.myRole === 'SUPERADMIN'){
      return (
        <Dashboard />
      )
    } else if (this.props.myRole === 'ADMIN PAYMENT'){
      return (
        <ConfirmTrx/>
      )
    } else if (this.props.myRole === 'EDITOR'){
      return (
        <ManageProducts/>
      )
    } else if (this.props.myRole === 'MEMBER') {
      return (
        <ProductsGridView/>
      )
    } else {
      return (
        <div>
          <div style={{marginTop: '-29px'}}>
            <Carousels />
          </div>
          <div style={{paddingTop: '690px'}}>
            <HomeCard/>
          </div>
        </div>
        )
    }

      }
  }


const mapStateToProps = (state) => {
  return { username: state.auth.username, myRole: state.auth.role }
}

export default connect(mapStateToProps)(HomePage);