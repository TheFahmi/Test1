import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { convertToIDR, convertdate } from '../../actions';
import Pagination from 'react-js-pagination';
import { APIURL } from '../../supports/APiUrl';
import {  Modal, ModalBody, ModalFooter, ModalHeader, Button,  } from 'reactstrap';
// var locales = ['ban', 'id-u-co-pinyin', 'de-ID'];
// var options = { localeMatcher: 'lookup' };
// const date = new Intl.DateTimeFormat.supportedLocalesOf(locales, options).join(', ');
const rupiah = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
class ListConfirm extends Component {

    state = {   
        listConfirm: [],
        selectedIdEdit: 0,
        listAlamat: [],
        isModalDetailOpen: false,
        searchList: [],
                activePage: 1,
                itemPerPage: 5
                
            }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    componentDidMount() {
        this.showListConfirm()
    }

    showListConfirm = () => {
    axios.get(`${APIURL}/confirm/getconfirm`)
            .then((res) => {
                console.log(res);
                this.setState({ 
                    listConfirm: res.data,
                    searchList: res.data,
                    selectedIdEdit: 0 
                });
                console.log(this.state.listConfirm[0].email)
            }).catch((err) => {
                console.log(err);
            })
    }

    adminConfirm = (id) => {
        for(let i = 0; i < this.state.listConfirm.length; i++) {
            // this.state.listConfirm[i]
            const status = this.refs.editStatus.value
            const email = this.state.listConfirm[i].email
            const invoice = this.state.listConfirm[i].invoice
            axios.put(`${APIURL}/confirm/editadmin/${id}`, {
                status, invoice, email
            }).then((res) => {
                this.showListConfirm()
            }).catch((err) => {
                console.log(err);
            })
        }         
       
            
    }

    

    userAlamat = () => {
        for(let i = 0; i < this.state.listConfirm.length; i++) {
        axios.get(`${APIURL}/confirm/getalamat?username=`+ this.state.listConfirm[i].nama)
            .then((res) => {
                // console.log(id);
                this.setState({listAlamat: res.data, isModalDetailOpen: true })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    toogleadd = (id) => {
        console.log(id)
        this.setState({ currentId: id, isModalDetailOpen: !this.state.isModalDetailOpen })
    }

    renderIsiModal = () => {
        var listJSXDetailAlamat = this.state.listAlamat.map((item,id) => {
            return(

                <tr key={id}>
                    {/* <td className="text-center" style={{fontSize: '12px', }}>{}</td> */}
                    <td style={{ fontSize: '14px', }}>{item.alamat}</td>
                    <td style={{ fontSize: '14px', }}>{item.phone}</td>
                </tr>
            )
        })
        return listJSXDetailAlamat;
    }

    renderAlamatUser = () => {
        return (
            <Modal isOpen={this.state.isModalDetailOpen} thistoggle={this.toogleadd} size="lg" style={{ maxWidth: "950px", width: '100%' }}>
                <ModalHeader toggle={this.toogleadd}>Detail Data</ModalHeader>
                <ModalBody>
                    <table align="center" className="col-md-6 table table-striped table-hover border shadow" style={{ width: "900px" }}>
                        <thead className="thead-light">
                            <tr className="table table-bordered table-dark text-center text-dark">
                                {/* <th scope="col" className="font-weight-bold text-uppercase" >Id</th> */}
                                <th scope="col" className="font-weight-bold text-uppercase" >Alamat</th>
                                <th scope="col" className="font-weight-bold text-uppercase col-xs-2" >Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderIsiModal()}
                        </tbody>
                    </table>
                    <br />

                </ModalBody>
                <ModalFooter>
                    <div >
                        {/* <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.listOrders.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        /> */}
                    </div>
                    <Button color="secondary" onClick={this.toogleadd}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

    onBtnDeleteClick = (idConfirm) => {
        if(window.confirm('Are you sure want to delete?')) {
            axios.delete(`${APIURL}/confirm/deleteorderbyadmin/` + idConfirm)
                .then((res) => {
                    console.log(res);
                    this.showListConfirm();
                    this.setState({
                        selectedIdEdit: 0 
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    // onBtnSearchClick = () => {
    //     var user = this.refs.nama.value;

    //     var arrSearch = this.state.listConfirm.filter((item) => {
    //         return item.user.toLowerCase().includes(user.toLowerCase())
    //     })

    //     this.setState({ searchList: arrSearch })
    // }
  
    renderListCategory = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchList.slice(indexOfFirstTodo, indexOfLastTodo);
        // console.log(this.state.listConfirm.id)
        var listJSXCategory = renderedProjects.map((item) => {

        if (item.id === this.state.selectedIdEdit) {
            return (
                <tr>
                    {/* <td style={{ fontSize: '14px', }}>{item.id}</td>
                    <td style={{ fontSize: '14px', }}>{item.idConfirm}</td> */}
                    <td style={{ fontSize: '14px', }}>{item.nama}</td>
                    <td style={{ fontSize: '14px', }}>{item.email}</td>
                    <td style={{ fontSize: '14px', }}><img src={`${APIURL}${item.image}`} alt={item.image} width={100}/></td>
                    <td style={{ fontSize: '14px', }}>{item.invoice}</td>
                    <td style={{ fontSize: '14px', }}>{this.props.convertdate(item.date)}</td>
                    <td style={{ fontSize: '14px', }}>{item.totalquantity}</td>
                    <td style={{ fontSize: '14px', }}>{rupiah.format(item.subtotal)}</td>
                    <td style={{ fontSize: '14px', }}>
                        <select ref="editStatus">
                            <option>Pending</option>
                            <option>sent</option>
                        </select>
                    </td>
                    <td style={{ fontSize: '14px', }}>
                    
                        <button className="btn btn-success" title="save" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.adminConfirm(item.id)}>
                            <i className="fa fa-save" style={{fontSize: '14px'}}></i>
                        </button>
                        &nbsp;
                        <button title="confirm" className="btn btn-dark" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.setState({ selectedIdEdit: 0 })}>
                            <i style={{fontSize: '14px'}} className="fa fa-times"></i>
                        </button>
                    </td>
                </tr>
            )
        }

        if(this.props.myRole === "SUPERADMIN" || this.props.myRole === 'ADMIN PAYMENT') {
            return (
                <tr>
                    {/* <td className="text-center" style={{ fontSize: '14px', }}>{item.id}</td>
                    <td className="text-center" style={{ fontSize: '14px', }}>{item.idConfirm}</td> */}
                    <td style={{ fontSize: '14px', }}>{item.nama}</td>
                    <td style={{ fontSize: '14px', }}>{item.email}</td>
                    <td style={{ fontSize: '14px', }}><img src={`${APIURL}${item.image}`} alt={item.image} style={{width:'100px'}}/></td>
                    <td style={{ fontSize: '14px', }}>{item.invoice}</td>
                    <td style={{ fontSize: '14px', }}>{this.props.convertdate(item.date)}</td>
                    <td style={{ fontSize: '14px', }}>{item.totalquantity}</td>
                    <td style={{ fontSize: '14px', }}>{rupiah.format(item.subtotal)}</td>
                    <td style={{ fontSize: '14px', }}>{item.status}</td>
                    <td>
                    <button className="btn btn-info" style={{ borderRadius: '30px', height: '30px', width: '30px' }} title="see alamat" 
                        onClick={() => this.userAlamat(item.id)}>
                        <i className="fa fa-info fa-md" style={{ fontSize: '14px', }}></i>
                    </button>
                        <button className="btn btn-info" title="confirm" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.setState({ selectedIdEdit: item.id })}>
                            <i className="fa fa-check" style={{fontSize: '14px'}}></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger" title="delete" style={{borderRadius: '30px', height: '30px', width: '30px'}}
                            onClick={() => this.onBtnDeleteClick(item.idConfirm)}>
                            <i className="fa fa-trash" style={{fontSize: '14px', }}></i>
                        </button>
                    </td>
                </tr>
            )
        } 

        return true;

        })
        
        return listJSXCategory;
    }
        
    render() {
        
        if((this.props.myRole === "SUPERADMIN" || this.props.myRole === 'ADMIN PAYMENT') && this.props.username !== "" )  {            
            return(
                <div style={{ fontSize: "13px" }} className="">
                    <br/>
                    <div className="row justify-content-center">
                    {/* <div className="col-lg-3">
                        <form id="searchForm" style={{ paddingBottom: '17px', }}>
                            <input type="text" className="form-control" style={{ fontSize: "12px", paddingBottom: '10px', }} 
                            placeholder="cari berdasarkan invoice"
                            ref="nama" onKeyUp={ this.onBtnSearchClick} />
                        </form>
                    </div>
                    <div className="col-lg-3">
                        <form id="searchForm" style={{ paddingBottom: '17px', }}>
                            <input type="text" className="form-control" style={{ fontSize: "12px", paddingBottom: '10px', }} 
                            placeholder="cari berdasarkan nama"
                            ref="invoice" onKeyUp={ this.onBtnSearchClick} />
                        </form>
                    </div> */}
                    </div>
                    <div className="table-responsive col-lg-12">
                        <table className="table table-striped table-hover bordered shadow">
                            <thead className="thead-dark">
                                <tr>
                                    {/* <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>ID</center></th>
                                    <th scope="col" className="font-weight-bold" style={{ fontSize: '14px', }}><center>ID Konfirmasi</center></th> */}
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>User</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Email</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Transfer Payment</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Invoice</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Date Trx</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Total Qty</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Total Price</th>
                                    <th scope="col" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Status</th>
                                    <th colSpan="2" className="font-weight-bold text-uppercase" style={{ fontSize: '14px', }}>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderListCategory()}
                            </tbody>
                        </table>
                        {this.renderAlamatUser()}
                        <div className="mx-auto">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemPerPage}
                                totalItemsCount={this.state.searchList.length}
                                pageRangeDisplayed={2}
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
    return { username: state.auth.username, myRole: state.auth.role }
}

export default connect(mapStateToProps, {convertToIDR, convertdate})(ListConfirm);