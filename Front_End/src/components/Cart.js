import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ConcessionListView extends Component {

    state = {
        listCart: [],
        selectedIdEdit: 0,
        activePage: 1,
        itemPerPage: 3
    }

    handlePageChange(pageNumb) {
        console.log(`active page is ${pageNumb}`);
        this.setState({activePage: pageNumb});
    }
    
    componentDidMount() {
        this.showCart();
    }

    onBtnCheckout = () => {
            window.location = '/checkout';
    }

    showCart = () => {
        axios.get("http://localhost:2002/cart/cart?username=" + this.props.username)
                .then((res) => {
                    console.log(res);
                    this.setState({ 
                        listCart: res.data,
                        selectedIdEdit: 0 
                    });
                }).catch((err) => {
                    console.log(err);
                })
    }

    totalPrice = () => {
        var total = 0;
        for(let i = 0; i < this.state.listCart.length; i++) {
            total += this.state.listCart[i].kuantiti * this.state.listCart[i].harga;
        }
        return total;
    }
    
    onBtnSaveClick = (name) => {
    var kuantiti = parseInt(this.refs.quantity.value);
    if (kuantiti <= 0) {
        window.alert('Quantity harus di isi!')
    } else {
            axios.put("http://localhost:2002/editcart/editcart/" + name.id, {
                name, kuantiti
            }).then((res) => {
                this.showCart();
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are you sure want to delete:?')) {
            axios.delete("http://localhost:2002/deletecart/deletecart/" + id)
                .then((res) => {
                    console.log(res);
                    this.showCart();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    onBtnCS = () => {
        return window.location = '/productsgridview';
    }

    btnCustom = () => {
        var btnCustom;
        if(!this.state.listCart.length) {
            btnCustom = <button className="btn btn-success" style={{ fontSize: "13px" }} onClick={ () => this.onBtnCS() }>Shop Again?</button>
        } else {
            btnCustom = <div>
                <button className="btn btn-info btn-lg btn-block" style={{ fontSize: "13px"}} onClick={() => this.onBtnCS()}>Buy other products?</button>
                <br />
                <button className="btn btn-success btn-lg btn-block" style={{ fontSize: "13px"}} onClick={() => this.onBtnCheckout()}>Pay</button>
            </div>
        }
        return btnCustom;
    }
  
    renderListCart = () => {
        var lastIndex = this.state.activePage * this.state.itemPerPage;
        var firstIndex = lastIndex - this.state.itemPerPage;
        var renderedProjects = this.state.listCart.slice(firstIndex, lastIndex);
        var listJSXCart = renderedProjects.map((item) => {

            if(item.id === this.state.selectedIdEdit) {
                return (
                    <tr>
                        {/* <td className="text-center" style={{fontSize: '14px', }}>{item.id}</td> */}
                        <td className="text-center" style={{fontSize: '14px', }}>{item.Nama_product}</td>
                        <td className="text-center" style={{fontSize: '14px', }}>{myCurrency.format(item.harga)}</td>
                        <td><center><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></center></td>
                        <td className="text-center" style={{fontSize: '14px', }}><input type="number" defaultValue={item.kuantiti}  size="4" 
                        ref="quantity" className="form-control" /></td>
                        <td className="text-center" style={{fontSize: '14px', }}>{myCurrency.format(item.harga * item.kuantiti)}</td>
                        <td>
                            <center>
                            <button className="btn btn-success" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                                onClick={() => this.onBtnSaveClick(item)}>
                                <i className="fa fa-save" style={{fontSize: '14px'}}></i>
                            </button>
                            &nbsp;
                            <button className="btn btn-warning" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                                onClick={() => this.setState( { selectedIdEdit: 0 } )}>
                                <i style={{fontSize: '14px'}} className="fa fa-times"></i>
                            </button>
                            </center>
                        </td>
                    </tr>
                )
            }

            return (
                <tr>
                    {/* <td className="text-center" style={{fontSize: '14px', }}>{item.id}</td> */}
                    <td className="text-center" style={{fontSize: '14px', }}>{item.Nama_product}</td>
                    <td className="text-center" style={{fontSize: '14px', }}>{myCurrency.format(item.harga)}</td>
                    <td><center><img src={`http://localhost:2002${item.image}`} alt={item.image} width={100} /></center></td>
                    <td className="text-center" style={{fontSize: '14px', }}>{item.kuantiti}</td>
                    <td className="text-center" style={{fontSize: '14px', }}>{myCurrency.format(item.harga * item.kuantiti)}</td>
                    <td>
                        <center>
                        <button className="btn btn-info" style={{borderRadius: '30px', height: '30px', width: '30px'}} 
                            onClick={ () => this.setState({ selectedIdEdit: item.id }) }>
                            <i className="fa fa-edit" style={{fontSize: '14px'}}></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={ () => this.onBtnDeleteClick(item.id, item.Nama_product) }>
                            <i className="fa fa-trash" style={{fontSize: '14px', }}></i>
                        </button>
                        </center>
                    </td>
                </tr>
            )

        })
        
        return listJSXCart;
    }
        
    render() {
        
        if(this.props.username !== '') {
            if(this.props.status === 'Verified'){
                if (this.state.listCart.length > 0) {
                return (
                    <div style={{height: "700px"}}>
                        <div className="full-width-div table-responsive card shadow col-md-12">
                            <h2 className="section-heading text-center text-uppercase" style={{ marginTop: '50px' }}>Hello, {this.props.username}</h2>
                            <h3 className="section-subheading text-muted text-center pb-5">Happy Shopping</h3>
                            <div className="row justify-content-center">
                                <table className="col-md-7 table table-striped table-hover border shadow">
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '16px', }}><center>Product</center></th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '16px', }}><center>Price</center></th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '16px', }}><center>Image</center></th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '16px', }}><center>Qty</center></th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '16px', }}><center>Total Price</center></th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{fontSize: '16px', }}><center>Options</center></th>
                                </tr>
                                </thead>
                                    <tbody>
                                        {this.renderListCart()}
                                    </tbody>
                                </table>
                                <div className="col-lg-3">
                                    <table className="table table-striped table-hover bordered shadow">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '16px', }}><center>Total Price</center></th>
                                            </tr>
                                        </thead>
                                        <tr>
                                            <td colSpan="8">
                                                <div className="text-center" style={{ fontSize: '14px', }}>{myCurrency.format(this.totalPrice())}</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="8">
                                                <div align="center">{this.btnCustom()}</div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div className="mx-auto">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.itemPerPage}
                                    totalItemsCount={this.state.listCart.length}
                                    pageRangeDisplayed={3}
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
                                <center><b>Upps, Your shopping cart is empty!!!</b><br/></center>
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
        status: state.auth.status
    }
}

export default connect(mapStateToProps)(ConcessionListView);