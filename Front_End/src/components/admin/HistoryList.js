import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { convertdate } from '../../actions';
import Pagination from 'react-js-pagination';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class HistoryList extends Component {

    state = { 
        listOrders: [],
        searchOrders: [],
        listUserOrderDetails: [],
        activePage: 1,
        itemPerPage: 5
     }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    componentDidMount() {
        if(this.props.myRole === "SUPERADMIN" || this.props.myRole === 'ADMIN PAYMENT') {
            this.showOrdersAdmin();
        } else {
            this.showOrders();
        }
    }

    showOrders = () => {
        axios.get('http://localhost:2002/orders/daftarorder?username=' + this.props.username)
            .then((res) => {
                this.setState({
                    listOrders: res.data,
                    searchOrders: res.data
                })
                console.log(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }

    showOrdersAdmin = () => {
        axios.get('http://localhost:2002/trx/trxlist')
                .then((res) => {
                    console.log(res);
                    this.setState({ 
                        listOrders: res.data,
                        searchOrders: res.data
                    });
                }).catch((err) => {
                    console.log(err);
                })
    }

    adminDeleteTrx = (id) => {
        axios.delete('http://localhost:2002/trx/deletetrx/' + id)
            .then((res) => {
                console.log(res);
                this.showOrdersAdmin();
            }).catch((err) => {
                console.log(err);
            })
    }

    deleteTrx = (id) => {
        axios.delete('http://localhost:2002/trx/deletetrx/' + id)
            .then((res) => {
                console.log(res);
                this.showOrders();
            }).catch((err) => {
                console.log(err);
            })
    }

    userOrderDetails = (id) => {
        axios.get('http://localhost:2002/orderdetail/orderdetail?idtrx=' + id)
            .then((res) => {
                this.setState({ listUserOrderDetails: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }
  
    renderListOrders = () => {
        if (this.props.myRole === 'MEMBER' || this.props.myRole === 'ADMIN PAYMENT') {
            var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
            var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
            var sortedListOrders = this.state.listOrders.slice(indexOfFirstTodo, indexOfLastTodo);
            var listJSXOrders = sortedListOrders.map((item) => {
                return (
                    <tr>
                        {/* <td style={{fontSize: '14px', }}>{item.id}</td> */}
                        <td style={{fontSize: '14px', }}>{item.username}</td>
                        <td style={{fontSize: '14px', }}>{this.props.convertdate(item.date)}</td>
                        <td style={{fontSize: '14px', }}>{item.totalquantity}</td>
                        <td style={{fontSize: '14px', }}>{myCurrency.format(item.totalprice)}</td>
                        <td style={{fontSize: '14px' }}>{item.status}</td>
                        <td>
                            <button className="btn btn-success" title="see detail" style={{borderRadius: '30px', height: '30px', width: '30px'}} onClick={() => this.userOrderDetails(item.id)}><i className="fa fa-info fa-md" style={{fontSize: '14px', }}></i></button>
                        </td>
                        <td>
                            <button className="btn btn-danger" title="delete" style={{borderRadius: '30px', height: '30px', width: '30px'}} onClick={() => this.deleteTrx(item.id)}><i style={{fontSize: '14px'}} className="fa fa-trash"></i></button>
                        </td>
                    </tr>
                )

            })
        
            return listJSXOrders;

        } else {

            indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
            indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
            sortedListOrders = this.state.searchOrders.slice(indexOfFirstTodo, indexOfLastTodo);
            listJSXOrders = sortedListOrders.map((item) => {
                return (
                    <tr>
                        {/* <td className="text-center" style={{fontSize: '14px', }}>{item.id}</td> */}
                        <td style={{fontSize: '14px', }}>{item.username}</td>
                        <td style={{fontSize: '14px', }}>{this.props.convertdate(item.date)}</td>
                        <td style={{fontSize: '14px', }}>{item.totalquantity}</td>
                        <td style={{ fontSize: '14px', }}>{myCurrency.format(item.totalprice)}</td>
                        <td style={{fontSize: '14px', }}>{item.status}</td>
                        <td>
                            <button className="btn btn-success" title="see detail" style={{borderRadius: '30px', height: '30px', width: '30px'}} onClick={() => this.userOrderDetails(item.id)}><i className="fa fa-info" style={{fontSize: '14px', }}></i></button>
                        </td>
                        <td>
                            <button className="btn btn-danger" title="delete" style={{borderRadius: '30px', height: '30px', width: '30px'}} onClick={() => this.adminDeleteTrx(item.id)}><i style={{fontSize: '14px'}} className="fa fa-trash"></i></button>
                        </td>
                    </tr>
                )

            })
        
            return listJSXOrders;
        }
    }
    

    renderListDetailOrders = () => {
        var listJSXDetailOrders = this.state.listUserOrderDetails.map((item) => {

            return (
                <tr>   
                    {/* <td className="text-center" style={{fontSize:s '14px', }}>{item.iddetailorder}</td> */}
                    <td className="text-center" style={{fontSize: '14px', }}>{item.namaproduk}</td>
                    <td className="text-center" style={{ fontSize: '14px', }}>{myCurrency.format(item.hargaproduk)}</td>
                    <td className="text-center" style={{fontSize: '14px', }}>Qty: {item.kuantiti}</td>
                    <td className="text-center" style={{fontSize: '14px', }}><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100}/>{item.gambar}</td>
                </tr>
            )

        })
        
        return listJSXDetailOrders;
    }
        
    render() {
        
        if(this.props.username !== "") {
            
            return(
                <div style={{ fontSize: "13px" }} >
                    <div className="table-responsive col-lg-12">
                        <table className="table table-striped table-hover table-border shadow">
                            <thead className="thead-dark">
                            <tr>
                                {/* <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}><center>ID Transaksi</center></th> */}
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Username</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Transaction Date</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Total Qty</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Total Price</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Status</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }} colSpan="2">Options</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderListOrders()}
                            </tbody>
                        </table>
                        <br />
                        {/* <h1 className="text-center text-uppercase">Detail Transaction</h1> */}
                        <br />
                        <table className="table table-striped table-hover table-border shadow">
                        <thead className="thead-dark">
                            {/* <tr> */}
                                {/* <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Id</th> */}
                                {/* <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Product Name</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Price</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Qty</th>
                                <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '14px', }}>Image</th>
                            </tr> */}
                            </thead>
                            <tbody>
                                {this.renderListDetailOrders()}
                            </tbody>
                        </table>
                        <div className="mx-auto">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemPerPage}
                                totalItemsCount={this.state.searchOrders.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }

}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        myRole: state.auth.role
    }
}

export default connect(mapStateToProps, {convertdate})(HistoryList);