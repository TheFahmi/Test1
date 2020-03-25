import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie'
import Pagination from 'react-js-pagination';
import { APIURL } from '../../supports/APiUrl';
import { CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Button, Table } from 'reactstrap';
const cookie = new Cookies()

const myCurrency = new Intl.NumberFormat('in-Rp', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
class ListPromo extends Component {

    state = {
        listPromo: [],
        selectedIdEdit: 0,
        searchListPromo: [],
        filterForm: '',
        value: '',

        activePage: 1,
        itemPerPage: 5,
        isModaladdOpen: false,
        isModaleditopen: false,
        indexedit: 0,
        indexdelete: -1,
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    componentDidMount() {
        this.showPromo();

        
    }

    showPromo = () => {
        axios.get(`${APIURL}/promo/getallpromo`)
            .then((res) => {
                console.log(res);
                this.setState({
                    listPromo: res.data,
                    searchListPromo: res.data,
                    selectedIdEdit: 0,
                    indexedit: 0
                });
            }).catch((err) => {
                console.log(err);
            })
    }


   

    onBtnAddClick = () => {

            // var headers = {
            //     headers:
            //         { 'Content-Type': 'multipart/form-data',
            //         Authorization: cookie.get('token') 
            //     }
            // }

            var data = {
                namapromo: this.refs.addname.value,
                jenis: this.refs.addpersen.value,
                
            }

           

            axios.post(`${APIURL}/promo/postpromo`, data )
                .then((res) => {
                    alert("Add Promo Success")
                    this.showPromo();
                    this.setState({ listProducts: res.data, isModaladdOpen: false })
                })
                .catch((err) => {
                    console.log(err)
                })
        
       
    }

    




    onBtnSaveClick = (id) => {
        // var headers = {
        //     headers:
        //         { 'Content-Type': 'multipart/form-data' }
        // }




        axios.put(`${APIURL}/promo/editpromo/`,{
            id,
            namapromo: this.refs.updatenama.value,
            jenis: this.refs.updatepersen.value,
        }).then((res) => {
                alert("Edit Promo Success")
                console.log(res)
                this.showPromo();
                this.setState({ isModaleditopen: false })
            })
            .catch((err) => {
                console.log(err)
            })
            // window.location = '/admin/managepromo'
    }
    toogleadd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }

    toggleedit = () => {
        this.setState({ isModaleditopen: !this.state.isModaleditopen })
    }

    onBtnDeleteClick = (id) => {
        if (window.confirm('Are you sure want to delete: ?')) {
            axios.delete(`${APIURL}/promo/deletepromo/`+id)
                .then((res) => {
                    console.log(res);
                    this.showPromo();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    
    onBtnSearchClick = () => {
        var nama = this.refs.searchbyname.value;

        var arrSearch = this.state.ListPromo.filter((item) => {
            return item.namapromo.toLowerCase().includes(nama.toLowerCase())
        })

        this.setState({ searchListPromo: arrSearch })
    }

    renderPromo = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListPromo.slice(indexOfFirstTodo, indexOfLastTodo);
        var iniListProduct = renderedProjects.map((val, index) => {

            // if(val.id === indexedit){

            return (
                <tr>
                    {/* <td>{index + 1}</td> */}
                    <td>{val.namapromo}</td>
                    <td>{val.jenis}</td>
                    <td>
                        <button className='btn btn-primary' onClick={() => this.setState({isModaleditopen: true, selectedIdEdit: val.id})}  >Edit</button>
                        <button className='btn btn-danger' onClick={() => this.onBtnDeleteClick(val.id)}>Delete</button>
                    </td>
                </tr>
            )
            // }

        })

        return iniListProduct
    }

    renderListPromo = () => {
        var indexOfLastTodo = this.state.activePage * this.state.itemPerPage;
        var indexOfFirstTodo = indexOfLastTodo - this.state.itemPerPage;
        var renderedProjects = this.state.searchListPromo.slice(indexOfFirstTodo, indexOfLastTodo);
        var listJSXPromo = renderedProjects.map((item) => {

            if (item.id === this.state.selectedIdEdit) {
                return (
                    <Modal isOpen={this.state.isModaleditopen} toggle={this.toggleedit}>
                        <ModalHeader toggle={this.toggleedit}>edit data {item.id}</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='updatenama' defaultValue={item.namapromo} placeholder='Nama Promo' className='form-control mt-2 ' />
                            <input type="number" ref='updatepersen' defaultValue={item.jenis} placeholder='Persen Potongan' className='form-control mt-2' />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.onBtnSaveClick(item.id)}>Save</Button>
                            <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>



                )
            }
            return true;

        })

        return listJSXPromo;
    }

    onEditClick = (index) => {
        this.setState({ indexedit: index.id, isModaleditopen: true })
    }

    render() {
        if (this.props.username !== "" && (this.props.myRole === "SUPERADMIN" || this.props.myRole === 'EDITOR')) {

            return (
            
                <div className='pt-5'>
                    <div className="col-lg-3 pb-5">
                        <form>
                            <input type="text" className="form-control" style={{ fontSize: "12px" }}
                                placeholder="Search by name"
                                ref="searchbyname" onKeyUp={this.onBtnSearchClick} />
                        </form>
                    </div>
                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.toogleadd}>
                        <ModalHeader toggle={this.toogleadd}>Add data</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='addname' placeholder='Nama Promo' className='form-control mt-2 '/>
                            <input type="number" ref='addpersen' placeholder='Persen Potongan' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onBtnAddClick}>Save</Button>
                            <Button color="secondary" onClick={this.toogleadd}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {
                    this.state.listPromo.length?
                    this.renderListPromo()
                    :
                    null
                    }

                    <button className='btn btn-primary' onClick={this.toogleadd}>Add data</button>
                    <Table striped>
                        <thead>
                            <tr>
                                {/* <th>No</th> */}
                                <th>Name Promo</th>
                                <th>Persen Potongan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderPromo()}
                        </tbody>
                    </Table>
                    <div className="mx-auto">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemPerPage}
                            totalItemsCount={this.state.searchListPromo.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>

                </div>
            );


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

export default connect(mapStateToProps)(ListPromo);