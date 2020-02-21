import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { keepLogin, cookieChecked } from './actions';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import ProductsListView from './components/ProductsListView';
import ProductsGridView from './components/ProductsGridView';
import ProductsDetails from './components/ProductsDetails';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import _History from './components/History';
import ManageUsers from './components/admin/ManageUsers';
import ManageProducts from './components/admin/ManageProducts';
import ManageTrx from './components/admin/ManageTrx';
import ManageCategory from './components/admin/ManageCategory';
import Spinner from './components/Spinner';
import AddProduct from './components/admin/AddProduct';
import WishListCart from './components/WishList';
import WaitingVerification from './components/WaitingVerification';
import Verified from './components/UserVerified';
import ConfirmTrx from './components/admin/ConfirmTrx';
import ListProducts from './components/admin/ListProducts';
import ConfirmOrder from './components/ConfirmOrder';
import SeeWishlist from './components/admin/SeeWishlist';
import Dashbord from './components/admin/Dashbord';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';

const cookies = new Cookies();

class App extends Component {

  componentDidMount() {
    const newCookie = cookies.get('usernameCookie');
    if(newCookie) {
        this.props.keepLogin(newCookie);
    } else {
        this.props.cookieChecked();
    }
  }

  render() {

    if(this.props.cookie) {
      return (
        <div>
        {/* <div className="container-fluid"> */}
          <Header />
        <div className="container-fluid">
        <Switch>      
        <Route exact path="/" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage} />
        <Route path="/waitingverification" component={WaitingVerification} />
        <Route path="/verified" component={Verified}/>
        <Route path="/productslistview" component={ProductsListView}/>
        <Route path="/productsgridview" component={ProductsGridView}/>
        <Route path="/productsdetails" component={ProductsDetails}/>
        <Route path="/cart" component={Cart} />
        <Route path="/wishlist" component={WishListCart}/>
        <Route path="/history" component={_History}/>
        <Route path="/checkout" component={CheckOut} />
        <Route path="/confirmorder" component={ConfirmOrder}/>
        <Route path="/admin/manageusers" component={ManageUsers}/>
        <Route path="/admin/manageproducts" component={ManageProducts}/>
        <Route path="/admin/managetrx" component={ManageTrx}/>
        <Route path="/admin/managecategory" component={ManageCategory}/>
        <Route path="/admin/addproduct" component={AddProduct} />
        <Route path="/admin/confirmtransaction" component={ConfirmTrx}/>
        <Route path="/admin/productslist" component={ListProducts}/>
        <Route path="/admin/managewishlist" component={SeeWishlist} />
        <Route path="/admin/dashbord" component={Dashbord} />
        <Route path="*" component={PageNotFound} />
        </Switch>
          </div>
          <div style={{ marginTop: '100px' }}>
            <Footer/>
          </div>
          </div>
      )
    }

    return (
      <div style={{ marginTop: "200px" }}>
        <center><Spinner /><br/>Loading...</center>
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  return { 
           cookie: state.auth.cookie,
           path: state.auth.path,
           myRole: state.auth.role
          }
}
export default withRouter(connect(mapStateToProps, { keepLogin, cookieChecked })(App));
