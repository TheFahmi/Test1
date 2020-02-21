import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class CheckOut extends Component {

    state = {
        cartList: [],
        selectedIdEdit: 0,
        totalPrice: 0,
        totalQty: 0
    }

    componentDidMount() {
        this.getCartList();
    }

    getCartList = () => {
        axios.get("http://localhost:2002/cart/cart?username=" + this.props.username)
        .then((res) => {
            var harga = 0;
            var kuantiti = 0;
            res.data.forEach(element => {
                harga += (element.kuantiti * element.harga);
                kuantiti += element.kuantiti;
            });
            this.setState({ cartList: res.data, selectedIdEdit: 0, totalPrice: harga, totalQty: kuantiti })
            console.log(this.state.cartList)
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnPayment = () => {
                var currentdate = new Date();
                var date = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate() 
                // + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                var invoice = `${currentdate.getFullYear()}${(currentdate.getMonth() + 1)}${currentdate.getDate()}${currentdate.getHours()}${currentdate.getMinutes()}${currentdate.getSeconds()}`;

                axios.post('http://localhost:2002/listorder/listorder', {
                    username: this.props.username,
                    date,
                    totalprice: this.state.totalPrice,
                    totalquantity: this.state.totalQty,
                    status: "Pending",
                    invoice,
                    email: this.props.email
                        
                }).then((res) => {
                    console.log(res.data.insertId)
                    for(let i = 0; i < this.state.cartList.length; i++) {
                        axios.post('http://localhost:2002/order/detailorder', {
                            idtrx: res.data.insertId,
                            idproduct: this.state.cartList[i].idproduct,
                            qty: this.state.cartList[i].kuantiti,
                        }).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.log(err);
                        })
                        axios.delete(`http://localhost:2002/deletecart/deletecart/${this.state.cartList[i].id}`)
                            .then((res) => {
                                console.log(res);
                                console.log(this.state.cartList[0].id)
                                this.getCartList();
                            }).catch((err) => {
                                console.log(err);
                            })
                    }
                    alert('Checkout Success Please Confirm Payment!')
                    window.location = "/confirmorder"
                       
                }).catch((err) => {
                    console.log(err);
                })

    }
  
    renderListCart = () => {
        
        var listJSXCart = this.state.cartList.map((item) => {

            return (
                <tr>
                    {/* <td className="text-center" style={{ fontSize: '14px', }}>{item.id}</td> */}
                    <td className="font-weight-bold" style={{ fontSize: '14px', }}>{item.Nama_product}</td>
                    <td style={{ fontSize: '14px', }}>{myCurrency.format(item.harga)}</td>
                    <td style={{ fontSize: '14px', }}>Quantity : {item.kuantiti}</td>
                    {/* <td className="text-center" style={{ fontSize: '14px', }}>{myCurrency.format(item.harga * item.kuantiti)}</td> */}
                </tr>
            )

        })
        
        return listJSXCart;
    }
        
    render() {
        
        if(this.props.username !== "") {
            
            return(
                <div style={{height: '700px'}}>
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase pt-5">Checkout</h2>
                        <br/>
                    </div>
                        <br/>
                    <div className="full-width-div table-responsive card bg-white" style={{ height: '700px', marginTop: '-10px' }}>
                    <h2 className="section-heading text-uppercase text-center pt-5">Checkout</h2>
                            <table align="center" className="col-md-4 table table-striped table-hover bordered shadow mt-5">
                                <thead className="thead-light">
                                    {/* <tr>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>ID</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Produk</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Harga</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Kuantiti</center></th>
                                        <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Total Harga</center></th>
                                    </tr> */}
                                </thead>
                                <tbody>
                                        {this.renderListCart()}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4">
                                            <div className="text-center">
                                            <h1>TOTAL PRICE : {myCurrency.format(this.state.totalPrice)}</h1>
                                                <Button color="primary" size="lg" block style={{ fontSize: "14px" }}
                                                    onClick={ () => this.onBtnPayment() }>
                                                &nbsp; Pay
                                                </Button>
                                            </div>
                                        </td>
                                        {/* <td colSpan="4" className="text-center">
                                            <h1>Total Price : {myCurrency.format(this.state.totalPrice)}</h1>
                                        </td> */}
                                    </tr>
                                </tfoot>
                            </table>
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
        email: state.auth.email,
        myRole: state.auth.role,
        id : state.auth.id
    }
}

export default connect(mapStateToProps)(CheckOut);