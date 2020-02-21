import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CustomInput } from 'reactstrap';
// import Footer from './Footer';

class ConfirmOrder extends Component {

    state = {
        confirm: [],
        addConfirmImage: 'Select Image',
        getConfirm: [],
        activePage: 1,
        itemPerPage: 3
    }

    handlePageChange(pageNumb) {
        console.log(`active page is ${pageNumb}`);
        this.setState({activePage: pageNumb});
    }
    
    componentDidMount() {
        this.adminAddAction()
    }


    onAddFileImageChange = () => {
        if(document.getElementById("AddBrandImage").files[0] !== undefined) {
            this.setState({addConfirmImage: document.getElementById("AddBrandImage").files[0].name})
        }
        else {
            this.setState({addConfirmImage: 'Pilih Gambar'})
        }
    }

    onBtnConfirm = () => {
        if(document.getElementById("AddBrandImage").files[0] !== undefined ) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                invoice: this.refs.invoice.value,
                username: this.props.username,
            }

            if(document.getElementById('AddBrandImage')){
                formData.append('image', document.getElementById('AddBrandImage').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post("http://localhost:2002/confirm/confirmorder", formData, headers)
            .then((res) => {
                // alert("Konfirmasi Sukses, Silahkan Duduk Manis dan Barang Pesanan Anda Akan Segera Tiba..")
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Image harus diisi!')
        }
        alert("Payment Confirm Success!!! Please wait few minutes.")
        window.location = '/productsgridview'
    }

    adminAddAction = () => {
        if(this.props.username !== '' && this.props.myRole === 'MEMBER') {
            return(
                    <tr>
                        <td className="text-left" style={{ fontSize: '14px', }}>
                            <input type="text" size="8" placeholder="Your Invoice" 
                            ref="invoice" style={{ fontSize: "13px" }} 
                            className="form-control"/>
                        </td>
                        <td className="text-left" style={{ fontSize: '14px', }}>
                            <CustomInput type="file" id="AddBrandImage" name="AddBrandImage" label={this.state.addConfirmImage} onChange={this.onAddFileImageChange} />
                        </td>
                        <td colSpan="2"><center><button className="btn btn-success" style={{ fontSize: "12px" }}
                            onClick={() => this.onBtnConfirm()}>
                            <i className="fa fa-plus"></i> Add</button></center></td>
                    </tr>
            )
        }
    }
        
    render() {
        if (this.props.username !== '') {
            if(this.props.status === 'Verified'){
                return (
                        <div  style={{height: '700px'}}>
                            <div className="full-width-div card bg-light pb-5">
                                {/* <div className="table-responsive card shadow p-3 mb-5 bg-white rounded"> */}
                                <h2 className="section-heading text-uppercase text-center pt-5">Thank You</h2>
                                <h3 className="section-subheading text-muted text-center pb-5">Please Confirm Your Payment Below.</h3>
                                    <table align="center" className="col-md-5 table table-striped table-hover border shadow">
                                        <thead className="thead-light border">
                                            <tr>
                                                <th scope="col" colSpan="3" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Invoice</center></th>
                                                    {/* <th scope="col" className="font-weight-bold" style={{ fontSize: '16px', }}><center>Bukti Transfer</center></th>
                                                    <th></th> */}
                                            </tr>
                                        </thead>
                                            <tbody>
                                            {this.adminAddAction()}
                                            {/* <button className="btn btn-success btn-lg btn-block">Click</button> */}
                                        </tbody>
                                    </table>
                        </div>
                        </div>
                        )
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

export default connect(mapStateToProps)(ConfirmOrder);