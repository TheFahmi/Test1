import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { convertdate } from '../actions';
import { CustomInput } from 'reactstrap';
import { APIURL } from '../supports/APiUrl';
import Cookies from 'universal-cookie'
const cookie = new Cookies()

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class History extends Component {

    state = {
        listOrders: [],
        listJoinOrders: [],
        listUserOrderDetails: [],
        activePage: 1,
        itemPerPage: 5,
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    componentDidMount() {
        this.showOrders();
        this.checkexpired();
        // this.onBtnConfirm();
    }

    showOrders = () => {
        axios.get(`${APIURL}/orders/daftarorder?username=` + this.props.username)
            .then((res) => {
                this.setState({ listOrders: res.data })
                console.log(res.data);
            }).catch((err) => {
                console.log(err)
            })


    }

    checkexpired = () => {
        axios.get(`${APIURL}/order/joindaftarorder`)
            .then((res) => {

                var expired = ''
                var kuantiti = 0
                var stock = 0
                var idproduct = ''
                var hasil = 0
                var idtrx = ''
                var invoice = ''
                res.data.forEach(element => {
                    idproduct = element.idprod
                    kuantiti = element.qty
                    stock = element.stok
                    expired = element.waktuexp
                    invoice = element.invoice
                    idtrx = element.idtrans


                    hasil = stock + kuantiti
                    var currentdate = new Date();

                    var month = new Array();
                    month[0] = "January";
                    month[1] = "February";
                    month[2] = "March";
                    month[3] = "April";
                    month[4] = "May";
                    month[5] = "June";
                    month[6] = "July";
                    month[7] = "August";
                    month[8] = "September";
                    month[9] = "October";
                    month[10] = "November";
                    month[11] = "December";



                    var waktuakhir = `${currentdate.getDate()}-${month[(currentdate.getMonth())]}-${currentdate.getFullYear()} ${currentdate.getHours()}:${currentdate.getMinutes()}`

                    if (waktuakhir === expired) {
                        axios.put(`${APIURL}/order/tambahStock`, {

                            id: idproduct,
                            stok: hasil
                        }).then((res) => {
                            console.log(res)
                        }).catch((err) => {
                            console.log(err);
                        })

                        // axios.put(`${APIURL}/confirm/editstatusexpired/`, {
                        //     id: idtrx,
                        //     status: "EXPIRED"
                        // }).then((res) => {
                        //     console.log(res)
                        // }).catch((err) => {
                        //     console.log(err);
                        // })

                    }

                })

                this.setState({ listJoinOrders: res.data, Invoice: invoice })
                console.log(res.data);
            }).catch((err) => {
                console.log(err)
            })
    }

    // deleteTrx = (id) => {
    //     axios.delete('http://localhost:2002/trx/deletetrx/' + id)
    //         .then((res) => {
    //             console.log(res);
    //             this.showOrders();
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    // }

    adminAddAction = (id) => {
        if (this.props.username !== '' && this.props.myRole === 'MEMBER') {
            return (
                <tr>
                    {/* <td className="text-left" style={{ fontSize: '14px', }}>
                        <input type="text" size="8" placeholder="Your Invoice"
                            ref="invoice" style={{ fontSize: "13px" }}
                            className="form-control" />
                    </td> */}


                </tr>
            )
        }
    }



    userOrderDetails = (id) => {
        axios.get(`${APIURL}/orderdetail/orderdetail?idtrx=` + id)
            .then((res) => {

                this.setState({ listUserOrderDetails: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    onAddFileImageChange = () => {
        if (document.getElementById("AddBrandImage").files[0] !== undefined) {
            this.setState({ addConfirmImage: document.getElementById("AddBrandImage").files[0].name })
        }
        else {
            this.setState({ addConfirmImage: 'Pilih Gambar' })
        }
    }

    onBtnConfirm = (id) => {

        if (document.getElementById("AddBrandImage").files[0] !== undefined) {
            for (let i = 0; i < this.state.listOrders.length; i++) {
                var formData = new FormData()
                var headers = {
                    headers:
                        { 'Content-Type': 'multipart/form-data',
                        Authorization: cookie.get('token') }
                }

                var data = {
                    invoice: this.state.listOrders[i].invoice,
                    username: this.props.username,
                }

            }

            if (document.getElementById('AddBrandImage')) {
                formData.append('image', document.getElementById('AddBrandImage').files[0])
            }
            formData.append('data', JSON.stringify(data))



            axios.post(`${APIURL}/confirm/confirmorder`, formData, headers)
                .then((res) => {
                    console.log(res);


                })
                .catch((err) => {
                    console.log(err)
                })

            axios.put(`${APIURL}/confirm/editstatus/`, {
                id,
                status: "pending"
            }).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err);
            })



        }
        else {
            alert('Image harus diisi!')

        }
        alert("Payment Confirm Success!!! Please wait few minutes.")
        window.location = '/products'
    }

    onChangeStatus = (id) => {

    }

    renderListOrders = () => {

        var currentdate = new Date();

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";



        var minutes = currentdate.getMinutes();
        
        minutes = minutes < 10 ? '0' + minutes : minutes+1;

        console.log(minutes);

        var hours = currentdate.getHours();

        hours = minutes > 59? '00' + hours : hours



        var waktuakhir = `${currentdate.getDate()}-${month[(currentdate.getMonth())]}-${currentdate.getFullYear()} ${currentdate.getHours()}:${minutes}`
        console.log(waktuakhir)
        if (this.props.myRole === 'MEMBER') {
            var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
            var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
            var sortedListOrders = this.state.listOrders.slice(indexOfFirstTodo, indexOfLastTodo);
            var listJSXOrders = sortedListOrders.map((item) => {
                return (
                    <tr>
                        {/* <td className="text-center" style={{fontSize: '12px', }}>{item.id}</td> */}
                        {/* <td style={{fontSize: '14px', }}>{item.username}</td> */}
                        <td style={{ fontSize: '14px', }}>{item.invoice}</td>
                        <td style={{ fontSize: '14px', }}>{this.props.convertdate(item.date)}</td>
                        <td style={{ fontSize: '14px', }}>{item.totalquantity}</td>
                        <td style={{ fontSize: '14px', }}>{myCurrency.format(item.totalprice)}</td>
                        <td style={{ fontSize: '14px', }}>{item.status}</td>
                        {
                            waktuakhir >= item.waktuexp ?
                                <td style={{ fontSize: '14px' }}>***</td>
                                :
                                <td style={{ fontSize: '14px', }}>{item.waktuexp}</td>




                        }

                        <td>
                            <button className="btn btn-info" style={{ borderRadius: '30px', height: '30px', width: '30px' }} title="see detail" onClick={() => this.userOrderDetails(item.id)}><i className="fa fa-info fa-md" style={{ fontSize: '14px', }}></i></button>

                        </td>
                        <td>
                            {
                                waktuakhir >= item.waktuexp ?
                                    null
                                    :
                                    <div>
                                        <td className="text-left" style={{ fontSize: '14px', }}>
                                            <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.addConfirmImage} onChange={this.onAddFileImageChange} />
                                        </td>
                                        <td colSpan="2"><center><button className="btn btn-success" style={{ fontSize: "7px" }} onClick={() => this.onBtnConfirm(item.id)}>
                                            <i className="fa fa-plus"></i> Add</button></center>
                                        </td>
                                    </div>
                                // this.adminAddAction(item.id) 

                            }


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
                    <td style={{ fontSize: '14px', }}>{item.namaproduk}</td>
                    <td style={{ fontSize: '14px', }}>{myCurrency.format(item.hargaproduk)}</td>
                    <td style={{ fontSize: '14px', }}>Qty: {item.kuantiti}</td>
                    <td style={{ fontSize: '14px', }}><img src={`http://localhost:2002${item.image}`} alt={item.image} style={{ width: '100px' }} />{item.gambar}</td>
                </tr>
            )

        })

        return listJSXDetailOrders;
    }

    render() {

        if (this.props.username !== '') {
            if (this.props.status === 'Verified') {
                if (this.state.listOrders.length > 0) {
                    return (
                        <article className="card-body mx-auto" style={{ height: "700px", marginTop: "100px" }}>
                            <h2 className="section-heading text-uppercase text-center">History</h2>
                            <div className="row justify-content-center">

                                <table align="center" className="table table-striped table-hover bordered shadow col-lg-8  mt-5">
                                    <thead className="thead-dark">
                                        <tr>
                                            {/* <th scope="col" className="font-weight-bold text-uppercase" ><center>ID Transaksi</center></th> */}
                                            {/* <th scope="col" className="font-weight-bold" style={{fontSize: '15px'}}>Username</th> */}
                                            <th scope="col" className="font-weight-bold" style={{ fontSize: '15px' }}>Invoice</th>
                                            <th scope="col" className="font-weight-bold" style={{ fontSize: '15px' }}>Transaction Date</th>
                                            <th scope="col" className="font-weight-bold" style={{ fontSize: '15px' }}>Total Qty</th>
                                            <th scope="col" className="font-weight-bold" style={{ fontSize: '15px' }}>Total Price</th>
                                            <th scope="col" className="font-weight-bold" style={{ fontSize: '15px' }}>Status</th>
                                            <th scope="col" className="font-weight-bold" style={{ fontSize: '15px' }}>Sisa Waktu Bayar</th>
                                            <th scope="col" className="font-weight-bold" colSpan="2" style={{ fontSize: '15px' }}>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderListOrders()}
                                        {this.onChangeStatus()}
                                    </tbody>
                                </table>
                                <br />
                                <table align="center" className="col-md-6 table table-striped table-hover border shadow">
                                    <thead className="thead-light">
                                        <tr className="table table-bordered table-dark text-center text-dark">
                                            {/* <th scope="col" className="font-weight-bold text-uppercase" >Id</th> */}
                                            <th scope="col" className="font-weight-bold text-uppercase" >Nama</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" >Harga</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" >Kuantiti</th>
                                            <th scope="col" className="font-weight-bold text-uppercase" >Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderListDetailOrders()}
                                    </tbody>
                                </table>

                            </div>
                            <div className=" row justify-content-center">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.itemPerPage}
                                    totalItemsCount={this.state.listOrders.length}
                                    pageRangeDisplayed={5}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            </div>
                        </article>


                    )
                } else {
                    return (
                        <div style={{ height: '600px' }}>
                            <div className="d-flex justify-content-center" style={{ marginTop: '130px' }}>
                                <div className="alert alert-warning col-md-4 mt-5 border shadow-lg" style={{ fontSize: "20px" }}>
                                    <center><b>Your cart history is empty!!!</b><br /></center>
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

export default connect(mapStateToProps, { convertdate })(History);