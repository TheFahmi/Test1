import React, { Component } from 'react';
import axios from 'axios';

class HomeDashbord extends Component {
    state = {
        users: [],
        products: [],
        order: [],
        sales: [],
        confirm: [],
        wishlist: [],
        ordersuccess: []
    }

    componentDidMount() {
        this.totalUsers();
        this.totalProducts();
        this.totalOrder();
        this.totalOrderNeedConfirm();
        this.totalWishlist();
        // this.totalSales();
        this.orderSuccess();
    }

    totalUsers = () => {
        axios.get('http://localhost:2002/dashbord/getusers')
            .then((res) => {
                console.log(res);
                this.setState({ 
                    users: res.data
                });
            }).catch((err) => {
                console.log(err);
            })
    }

    totalProducts = () => {
        axios.get('http://localhost:2002/dashbord/getproducts')
            .then((res) => {
                console.log(res);
                this.setState({ products: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }

    totalOrder = () => {
        axios.get('http://localhost:2002/dashbord/getorder')
            .then((res) => {
                console.log(res);
                this.setState({ order: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }

    // totalSales = () => {
    //     axios.get('http://localhost:2002/dashbord/getorder')
    //         .then((res) => {
    //             console.log(res);
    //             var price = 0;
    //             res.data.forEach(element => {
    //                 price += element.sales;
    //             });
    //             this.setState({ 
    //                 sales: res.data
    //             });
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }

    totalOrderNeedConfirm = () => {
        axios.get('http://localhost:2002/dashbord/getconfirm')
            .then((res) => {
                console.log(res);
                this.setState({ confirm: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }

    totalWishlist = () => {
        axios.get('http://localhost:2002/dashbord/getwishlist')
            .then((res) => {
                console.log(res);
                this.setState({ wishlist: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }

    orderSuccess = () => {
        axios.get('http://localhost:2002/dashbord/ordersuccess')
            .then((res) => {
                console.log(res);
                this.setState({ ordersuccess: res.data });
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return(
        <div>
        <div className="row w-100">
            <div className="col-md-4">
            <div className="card border-info bg-info mx-sm-1 p-3 shadow" style={{height: '200px', borderRadius: '10px'}}>
                <a href="/admin/manageusers">
                <div className="card border-info shadow text-info p-3 my-card bg-light" style={{borderRadius: '7px'}}><h3 className="text-center text-uppercase">Manage Users</h3></div></a>
                <div className="text-info text-center mt-2 pt-4"><h1 className="text-light">Total Users</h1></div>
                <div className="text-info text-center mt-2"><h4><button className="btn btn-light" style={{height: '50px', width: '50px', borderRadius: '50px', fontSize: '20px',}}>{this.state.users.length}</button></h4></div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="card border-info bg-info mx-sm-1 p-3 shadow" style={{height: '200px', borderRadius: '10px'}}>
                <a href="/admin/productslist">
                <div className="card border-info shadow text-info p-3 my-card bg-light" style={{borderRadius: '7px'}}><h3 className="text-center text-uppercase">Manage Products</h3></div></a>
                <div className="text-info text-center mt-2 pt-4 text-white"><h1 className="text-light">Total Products</h1></div>
                <div className="text-info text-center mt-2"><h4><button className="btn btn-light" style={{height: '50px', width: '50px', borderRadius: '50px', fontSize: '20px'}}>{this.state.products.length}</button></h4></div>
            </div>
            </div>
            <div className="col-md-4">
            <div className="card border-info bg-info mx-sm-1 pt-3 pl-3 pr-3 shadow" style={{height: '200px', borderRadius: '10px'}}>
                <a href="/admin/managetrx">
                <div className="card border-info shadow text-info p-3 my-card bg-light" style={{borderRadius: '7px'}}><h3 className="text-center text-uppercase">Manage Transaction</h3></div></a>
                <div className="text-info text-center mt-2 pt-4"><h1 className="text-light">Total Order</h1></div>
                <div className="text-info text-center mt-2"><h4><button className="btn btn-light" style={{height: '50px', width: '50px', borderRadius: '50px', fontSize: '20px'}}>{this.state.order.length}</button></h4></div>
            </div>
            </div>
        </div>
                <div className="row w-100">
                <div className="col-md-4 pt-5">
                <div className="card border-info bg-info mx-sm-1 p-3 shadow" style={{height: '200px', borderRadius: '10px'}}>
                    <a href="/admin/confirmtransaction">
                    <div className="card border-info shadow text-info p-3 my-card bg-light" style={{borderRadius: '7px'}}><h3 className="text-center text-uppercase">Confirm Orders</h3></div></a>
                    <div className="text-info text-center mt-2 pt-4"><h1 className="text-light">Order Need Confirm</h1></div>
                    <div className="text-info text-center mt-2"><h4><button className="btn btn-light" style={{height: '50px', width: '50px', borderRadius: '50px', fontSize: '20px'}}>{this.state.confirm.length}</button></h4></div>
                </div>
                </div>
                <div className="col-md-4 pt-5">
                <div className="card border-info bg-info mx-sm-1 p-3 shadow" style={{height: '200px', borderRadius: '10px'}}>
                    <a href="/admin/managewishlist">
                    <div className="card border-info shadow text-info p-3 my-card bg-light" style={{borderRadius: '7px'}}><h3 className="text-center text-uppercase">See Wishlist</h3></div></a>
                    <div className="text-info text-center mt-2 pt-4"><h1 className="text-light">Total Wishlist</h1></div>
                    <div className="text-info text-center mt-2"><h4><button className="btn btn-light" style={{height: '50px', width: '50px', borderRadius: '50px', fontSize: '20px'}}>{this.state.wishlist.length}</button></h4></div>
                </div>
                </div>
                <div className="col-md-4 pt-5">
                <div className="card border-info bg-info mx-sm-1 p-3 shadow" style={{height: '200px', borderRadius: '10px'}}>
                    <a href="/admin/managewishlist">
                    <div className="card border-info shadow text-info p-3 my-card bg-light" style={{borderRadius: '7px'}}><h3 className="text-center text-uppercase">See Orders Success</h3></div></a>
                    <div className="text-info text-center mt-2 pt-4"><h1 className="text-light">Total Order Success</h1></div>
                    <div className="text-info text-center mt-2"><h1><button className="btn btn-light" style={{height: '50px', width: '50px', borderRadius: '50px', fontSize: '20px'}}>{this.state.ordersuccess.length}</button></h1></div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default HomeDashbord;

// .my-card
// {
//     position:absolute;
//     left:40%;
//     top:-20px;
//     border-radius:50%;
// }