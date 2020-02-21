import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { convertdate } from '../actions';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class History extends Component {

    state = { 
        listOrders: [],
        listUserOrderDetails: [],
        activePage: 1,
        itemPerPage: 5
     }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    componentDidMount() {
            this.showOrders();
    }

    showOrders = () => {
        axios.get('http://localhost:2002/orders/daftarorder?username=' + this.props.username)
            .then((res) => {
                this.setState({ listOrders: res.data })
                console.log(res.data);
        }).catch((err) => {
            console.log(err)
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
        if (this.props.myRole === 'MEMBER') {
            var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
            var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
            var sortedListOrders = this.state.listOrders.slice(indexOfFirstTodo, indexOfLastTodo);
            var listJSXOrders = sortedListOrders.map((item) => {
                return (
                    <tr>
                        {/* <td className="text-center" style={{fontSize: '12px', }}>{item.id}</td> */}
                        <td style={{fontSize: '14px', }}>{item.username}</td>
                        <td style={{fontSize: '14px', }}>{this.props.convertdate(item.date)}</td>
                        <td style={{fontSize: '14px', }}>{item.totalquantity}</td>
                        <td style={{fontSize: '14px', }}>{myCurrency.format(item.totalprice)}</td>
                        <td style={{fontSize: '14px', }}>{item.status}</td>
                        <td>
                            <button className="btn btn-info" style={{borderRadius: '30px', height: '30px', width: '30px'}} title="see detail" onClick={() => this.userOrderDetails(item.id)}><i className="fa fa-info fa-md" style={{fontSize: '14px', }}></i></button>
                        </td>
                        <td>
                            <button className="btn btn-danger" style={{borderRadius: '30px', height: '30px', width: '30px'}} title="delete" onClick={() => this.deleteTrx(item.id)}><i style={{fontSize: '14px', }} className="fa fa-trash fa-md"></i></button>                            
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
                    {/* <td className="text-center" style={{fontSize: '12px', }}>{item.iddetailorder}</td> */}
                    <td style={{fontSize: '14px', }}>{item.namaproduk}</td>
                    <td style={{fontSize: '14px', }}>{myCurrency.format(item.hargaproduk)}</td>
                    <td style={{fontSize: '14px', }}>Qty: {item.kuantiti}</td>
                    <td style={{fontSize: '14px', }}><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100}/>{item.gambar}</td>
                </tr>
            )

        })
        
        return listJSXDetailOrders;
    }
        
    render() {
        
        if(this.props.username !== '') {
            if(this.props.status === 'Verified'){
                if(this.state.listOrders.length > 0){
                    return (
                        <div style={{height: "700px"}}>
                        <div className="full-width-div card bg-0" >
                                <h2 className="text-center section-heading font-weight-bold text-uppercase pb-5" style={{marginTop: '50px'}}>Your Transaction History</h2>
                                <table align="center" className="col-md-6 table table-striped table-hover border shadow">
                                    <thead className="thead-light">
                                        <tr>
                                            {/* <th scope="col" className="font-weight-bold text-uppercase" ><center>ID Transaksi</center></th> */}
                                            <th scope="col" className="font-weight-bold" style={{fontSize: '15px'}}>Username</th>
                                            <th scope="col" className="font-weight-bold" style={{fontSize: '15px'}}>Transaction Date</th>
                                            <th scope="col" className="font-weight-bold" style={{fontSize: '15px'}}>Total Qty</th>
                                            <th scope="col" className="font-weight-bold" style={{fontSize: '15px'}}>Total Price</th>
                                            <th scope="col" className="font-weight-bold" style={{fontSize: '15px'}}>Status</th>
                                            <th scope="col" className="font-weight-bold"  colSpan="2" style={{fontSize: '15px'}}>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderListOrders()}
                                    </tbody>
                                </table>
                                <br/>
                                <table align="center" className="col-md-6 table table-striped table-hover border shadow">
                                    <thead className="thead-light">
                                        {/* <tr className="table table-bordered table-dark text-center text-dark">
                                            <th scope="col" className="font-weight-bold text-uppercase" >Id</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" >Nama</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" >Harga</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" >Kuantiti</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" >Image</th>
                                        </tr> */}
                                    </thead>
                                    <tbody>
                                        {this.renderListDetailOrders()}
                                    </tbody>
                                </table>
                            <div className="mx-auto" >
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemPerPage}
                                totalItemsCount={this.state.listOrders.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                                />
                            </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div  style={{height: '239px'}}>
                        <div className="d-flex justify-content-center" style={{marginTop: '130px'}}>
                            <div className="alert alert-warning col-md-4 mt-5 border shadow-lg" style={{ fontSize: "20px" }}>
                                <center><b>Your cart history is empty!!!</b><br/></center>
                            </div>
                            </div>  
                        </div>    
                    )
                }
            } else {
                return (
                    <Redirect to="/waitingverification" />
                )
            }
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
        myRole: state.auth.role,
        status: state.auth.status,
    }
}

export default connect(mapStateToProps, {convertdate})(History);